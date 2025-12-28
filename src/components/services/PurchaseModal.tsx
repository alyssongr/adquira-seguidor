import { useState } from "react";
import { X, Minus, Plus, ArrowRight, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentModal } from "./PaymentModal";
import { createPortal } from "react-dom";

interface Service {
  id: string;
  name: string;
  pricePerUnit: number;
  minQuantity: number;
  maxQuantity: number;
}

interface PurchaseModalProps {
  service: Service;
  onClose: () => void;
}

export function PurchaseModal({ service, onClose }: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(service.minQuantity);
  const [link, setLink] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = quantity * service.pricePerUnit;

  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(service.minQuantity, Math.min(service.maxQuantity, value));
    setQuantity(newValue);
  };

  const handleContinue = () => {
    if (!link.trim()) {
      setError("Por favor, insira o link da rede social");
      return;
    }
    setError("");
    setShowPayment(true);
  };

  if (showPayment) {
    return (
      <PaymentModal
        service={service}
        quantity={quantity}
        link={link}
        totalPrice={totalPrice}
        onClose={onClose}
        onBack={() => setShowPayment(false)}
      />
    );
  }

  const modalContent = (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
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
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(quantity - 100)}
                className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || service.minQuantity)}
                className="text-center text-lg font-semibold flex-1"
                min={service.minQuantity}
                max={service.maxQuantity}
              />
              <button
                onClick={() => handleQuantityChange(quantity + 100)}
                className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Mínimo: {service.minQuantity.toLocaleString()} | Máximo: {service.maxQuantity.toLocaleString()}
            </p>
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
              <span className="font-medium text-foreground">{quantity.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Preço unitário</span>
              <span className="font-medium text-foreground">
                R$ {service.pricePerUnit.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-display text-2xl font-bold text-primary">
                  R$ {totalPrice.toFixed(2)}
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
          >
            Continuar para Pagamento
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
