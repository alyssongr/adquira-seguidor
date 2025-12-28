import { useState } from "react";
import { Gift, Instagram, Sparkles, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function TrustBlock() {
  const [profileLink, setProfileLink] = useState("");
  const [postLink, setPostLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileLink || !postLink) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (!profileLink.includes("instagram.com") || !postLink.includes("instagram.com")) {
      toast.error("Por favor, insira links válidos do Instagram");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSuccess(true);
    toast.success("100 likes enviados com sucesso! Aguarde alguns minutos.");
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Gift className="w-7 h-7 text-primary" />
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">100% Grátis</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Teste Agora: <span className="text-primary">100 Likes Grátis</span>
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Prove que nosso serviço funciona. Sem cadastro, sem pagamento.
                  Receba 100 curtidas reais em segundos.
                </p>
              </div>

              {/* Form */}
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="Link do seu perfil (ex: instagram.com/seuperfil)"
                      value={profileLink}
                      onChange={(e) => setProfileLink(e.target.value)}
                      className="pl-12 h-14 text-base"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="Link da postagem que receberá os likes"
                      value={postLink}
                      onChange={(e) => setPostLink(e.target.value)}
                      className="pl-12 h-14 text-base"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="cta"
                    size="xl"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando likes...
                      </>
                    ) : (
                      <>
                        <Gift className="w-5 h-5" />
                        Receber 100 Likes Grátis
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8 animate-scale-in">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Likes Enviados!
                  </h3>
                  <p className="text-muted-foreground">
                    Seus 100 likes chegarão em até 5 minutos. 
                    Gostou? Confira nossos serviços completos!
                  </p>
                  <Button asChild variant="cta" size="lg" className="mt-6">
                    <a href="/servicos">Ver Todos os Serviços</a>
                  </Button>
                </div>
              )}

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Sem cadastro
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Sem pagamento
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Entrega instantânea
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
