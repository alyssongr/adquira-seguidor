import { useState } from "react";
import { X, ArrowRight, Link as LinkIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentModal } from "./PaymentModal";
import { createPortal } from "react-dom";
import { toast } from "sonner";

const urlSchema = z
  .string()
  .trim()
  .min(1, "Por favor, insira o link da rede social")
  .max(2048, "Link muito longo")
  .url("Cole um link válido (deve começar com https://)");

interface Service {
  id: string;
  name: string;
  pricePerUnit?: number;
  minQuantity?: number;
  maxQuantity?: number;
  packageOptions?: {
    quantity: number;
    price: number;
    packageId: string;
  }[];
}

interface PurchaseModalProps {
  service: Service;
  onClose: () => void;
}

interface PixResponse {
  qrCodeBase64: string;
  qrCodeCopyPaste: string;
  paymentId?: string;
}

export function PurchaseModal({ service, onClose }: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(
    service.packageOptions?.[0]?.quantity ?? service.minQuantity ?? 0
  );
  const [link, setLink] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pixData, setPixData] = useState<PixResponse | null>(null);

  const selectedPackage = service.packageOptions?.find((pkg) => pkg.quantity === quantity);

  const totalPrice = selectedPackage ? selectedPackage.price : quantity * (service.pricePerUnit ?? 0);

  const packageBaseUnitPrice = service.packageOptions
    ? service.packageOptions[0].price / service.packageOptions[0].quantity
    : null;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatQuantity = (value: number) => value.toLocaleString("pt-BR");

  const handleQuantityChange = (value: number) => {
    if (service.packageOptions) {
      if (service.packageOptions.some((pkg) => pkg.quantity === value)) {
        setQuantity(value);
      }
      return;
    }

    const minQuantity = service.minQuantity ?? 0;
    const maxQuantity = service.maxQuantity ?? value;
    const newValue = Math.max(minQuantity, Math.min(maxQuantity, value));
    setQuantity(newValue);
  };

  const handleContinue = async () => {
    const parsed = urlSchema.safeParse(link);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Link inválido");
      return;
    }
    
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://kdm-internet-n8n.tvlueg.easypanel.host/webhook/venda-ebook-pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: link.trim(),
          packageId: selectedPackage?.packageId ?? null,
          servico: service.name,
          valor: totalPrice,
          serviceId: service.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar PIX");
      }

      const responseData = await response.json();
      
      // Response comes as array, get first element
      const data = Array.isArray(responseData) ? responseData[0] : responseData;
      
      if (!data?.qrCodeBase64) {
        throw new Error("Resposta inválida do servidor");
      }

      setPixData({
        qrCodeBase64: data.qrCodeBase64,
        qrCodeCopyPaste: data.qrCodeCopyPaste || data.qrCodeBase64, // fallback if null
        paymentId: data.paymentId || data.pagamentoId || data.id || data.externalReference,
      });
      setShowPayment(true);
    } catch (err) {
      console.error("Erro ao processar pagamento:", err);
      toast.error("Erro ao gerar PIX. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showPayment && pixData) {
    return (
      <PaymentModal
        service={service}
        quantity={quantity}
        link={link}
        totalPrice={totalPrice}
        qrCodeBase64={pixData.qrCodeBase64}
        qrCodeCopyPaste={pixData.qrCodeCopyPaste}
        onClose={onClose}
        onBack={() => setShowPayment(false)}
        paymentId={pixData.paymentId}
      />
    );
  }

  const modalContent = (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />

      {/* Modal */}
      <div 
        className="relative w-full h-[100dvh] sm:h-auto sm:max-w-lg bg-card border-0 sm:border border-border rounded-none sm:rounded-3xl shadow-2xl overflow-y-auto"
        style={{ animation: 'scaleIn 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-xl font-bold text-foreground">
            Configurar Pedido
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Selected Service */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Serviço selecionado</p>
            <p className="font-display font-semibold text-foreground">{service.name}</p>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Quantidade
            </label>

            {service.packageOptions ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.packageOptions.map((pkg, index) => {
                  const isActive = quantity === pkg.quantity;
                  const unitPrice = pkg.price / pkg.quantity;
                  const discountPercent = packageBaseUnitPrice
                    ? Math.max(0, Math.round((1 - unitPrice / packageBaseUnitPrice) * 100))
                    : 0;

                  return (
                    <button
                      key={pkg.packageId}
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleQuantityChange(pkg.quantity)}
                      className={`relative rounded-xl border p-3 text-left transition-all disabled:opacity-60 ${
                        isActive
                          ? "border-primary bg-primary/10 shadow-[0_0_24px_hsl(45,93%,58%,0.15)]"
                          : "border-border bg-secondary/40 hover:border-primary/40"
                      }`}
                    >
                      {discountPercent > 0 && index > 0 && (
                        <span className="absolute -top-2 right-2 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                          -{discountPercent}% OFF
                        </span>
                      )}
                      <p className="font-semibold text-foreground">{formatQuantity(pkg.quantity)}</p>
                      <p className="text-sm font-bold text-primary">R$ {formatCurrency(pkg.price)}</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || service.minQuantity || 0)}
                  className="text-center text-lg font-semibold"
                  min={service.minQuantity}
                  max={service.maxQuantity}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Mínimo: {service.minQuantity?.toLocaleString("pt-BR")} | Máximo: {service.maxQuantity?.toLocaleString("pt-BR")}
                </p>
              </>
            )}
          </div>

          {/* Link Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Link da Rede Social
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="url"
                placeholder="Cole o link do seu perfil ou postagem"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setError("");
                }}
                className={`pl-12 ${error ? "border-destructive" : ""}`}
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-xs text-destructive mt-2">{error}</p>
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Quantidade</span>
              <span className="font-medium text-foreground">{formatQuantity(quantity)}</span>
            </div>

            {selectedPackage ? (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Valor selecionado</span>
                <span className="font-medium text-foreground">R$ {formatCurrency(selectedPackage.price)}</span>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Preço unitário</span>
                <span className="font-medium text-foreground">
                  R$ {service.pricePerUnit !== undefined ? formatCurrency(service.pricePerUnit) : "--"}
                </span>
              </div>
            )}

            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-primary">
                  R$ {formatCurrency(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            variant="cta"
            size="xl"
            className="w-full"
            onClick={handleContinue}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Gerando PIX...
              </>
            ) : (
              <>
                Continuar para Pagamento
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
