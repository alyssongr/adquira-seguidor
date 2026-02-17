import { useState, useEffect } from "react";
import { X, ArrowLeft, Copy, Check, Clock } from "lucide-react";
import { toast } from "sonner";
import { createPortal } from "react-dom";

interface Service {
  id: string;
  name: string;
}

interface PaymentModalProps {
  service: Service;
  quantity: number;
  link: string;
  totalPrice: number;
  qrCodeBase64: string;
  qrCodeCopyPaste: string;
  onClose: () => void;
  onBack: () => void;
  paymentId?: string;
}

export function PaymentModal({
  service,
  quantity,
  link,
  totalPrice,
  qrCodeBase64,
  qrCodeCopyPaste,
  onClose,
  onBack,
  paymentId,
}: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "approved">("pending");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error("Tempo expirado! Gere um novo PIX.");
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };



  useEffect(() => {
    if (paymentStatus === "approved") return;

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("https://kdm-internet-n8n.tvlueg.easypanel.host/webhook/notificacao-mp-ebook-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId,
            qrCodeCopyPaste,
            serviceId: service.id,
            servico: service.name,
            url: link,
          }),
        });

        if (!response.ok) return;

        const responseData = await response.json();
        const payload = Array.isArray(responseData) ? responseData[0] : responseData;

        const statusText = String(
          payload?.status ||
            payload?.paymentStatus ||
            payload?.situacao ||
            payload?.mensagem ||
            ""
        ).toLowerCase();

        const isApproved =
          statusText.includes("approved") ||
          statusText.includes("aprovado") ||
          payload?.approved === true ||
          payload?.pago === true;

        if (isApproved) {
          setPaymentStatus("approved");
          toast.success("Pagamento aprovado com sucesso!");
        }
      } catch (error) {
        // Silencioso para não incomodar o usuário com erros temporários do webhook
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [paymentStatus, paymentId, qrCodeCopyPaste, service.id, service.name, link]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeCopyPaste);
      setCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error("Erro ao copiar código");
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative w-full h-[100dvh] sm:h-auto sm:max-w-lg bg-card border-0 sm:border border-border rounded-none sm:rounded-3xl shadow-2xl overflow-hidden sm:max-h-[90vh] overflow-y-auto"
        style={{ animation: 'scaleIn 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-display text-xl font-bold text-foreground">
              Pagamento via PIX
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Expira em</span>
            <span className={`font-mono font-bold ${timeLeft < 60 ? "text-destructive" : "text-primary"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* QR Code from Base64 */}
          <div className="flex flex-col items-center">
            <div className="w-56 h-56 bg-white rounded-2xl p-3 mb-4 shadow-lg">
              <img 
                src={qrCodeBase64.startsWith('data:') ? qrCodeBase64 : `data:image/png;base64,${qrCodeBase64}`}
                alt="QR Code PIX"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Escaneie o QR Code com o app do seu banco
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* PIX Code */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              PIX Copia e Cola
            </label>
            <div className="relative">
              <div className="bg-secondary rounded-xl p-4 pr-14 font-mono text-xs text-muted-foreground break-all max-h-24 overflow-y-auto">
                {qrCodeCopyPaste}
              </div>
              <button
                onClick={handleCopy}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  copied
                    ? "bg-green-500/20 text-green-500"
                    : "bg-primary/20 text-primary hover:bg-primary/30"
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Serviço</span>
              <span className="text-foreground font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantidade</span>
              <span className="text-foreground font-medium">{quantity.toLocaleString()}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-display text-xl font-bold text-primary">
                  R$ {totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className={`flex items-center justify-center gap-3 p-4 rounded-xl border ${
            paymentStatus === "approved"
              ? "bg-green-500/10 border-green-500/30"
              : "bg-primary/10 border-primary/20"
          }`}>
            <div
              className={`w-3 h-3 rounded-full ${
                paymentStatus === "approved" ? "bg-green-500" : "bg-primary animate-pulse"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                paymentStatus === "approved" ? "text-green-600" : "text-primary"
              }`}
            >
              {paymentStatus === "approved" ? "Pagamento aprovado!" : "Aguardando pagamento..."}
            </span>
          </div>

          {/* Info */}
          <p className="text-xs text-center text-muted-foreground">
            Após o pagamento, seu pedido será processado automaticamente. 
            Fechar esta janela cancela a cobrança atual.
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
