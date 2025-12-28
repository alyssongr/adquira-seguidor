import { useState, useEffect } from "react";
import { X, ArrowLeft, Copy, Check, Clock, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  onClose: () => void;
  onBack: () => void;
}

export function PaymentModal({
  service,
  quantity,
  link,
  totalPrice,
  onClose,
  onBack,
}: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes

  // Simulated PIX code
  const pixCode = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2, 15)}5204000053039865802BR5925ADQUIRA SEGUIDOR LTDA6009SAO PAULO62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast.error("Erro ao copiar código");
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
        style={{ animation: 'scaleIn 0.3s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
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

          {/* QR Code Placeholder */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-foreground rounded-2xl p-3 mb-4">
              <div className="w-full h-full bg-background rounded-lg flex items-center justify-center">
                <QrCode className="w-32 h-32 text-foreground" />
              </div>
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
                {pixCode}
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
          <div className="flex items-center justify-center gap-3 p-4 bg-primary/10 rounded-xl border border-primary/20">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Aguardando pagamento...
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
