import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Instagram, Gift, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import heroImage from "@/assets/hero-people.jpg";

export function HeroSection() {
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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSuccess(true);
    toast.success("100 likes enviados com sucesso!");
  };

  return (
    <section className="relative min-h-screen bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary-foreground)) 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 pt-28 pb-20 md:pt-36">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Content - Pushed to the right */}
          <div className="text-center lg:text-left lg:pl-8 xl:pl-16 animate-slide-up order-1">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
              <span className="text-sm font-medium text-primary-foreground">
                +50.000 clientes satisfeitos
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Impulsione Suas{" "}
              <span className="relative inline-block">
                Redes Sociais
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 6" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>{" "}
              Agora
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg mx-auto lg:mx-0">
              Seguidores, curtidas e visualizações reais para Instagram, TikTok e YouTube. 
              Entrega rápida e pagamento via PIX.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild variant="hero" size="xl">
                <Link to="/servicos" className="group">
                  Comprar Serviços
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/sobre">
                  Saiba Mais
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-10">
              <div>
                <p className="text-3xl font-display font-bold text-primary-foreground">50K+</p>
                <p className="text-sm text-primary-foreground/70">Clientes</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary-foreground">1M+</p>
                <p className="text-sm text-primary-foreground/70">Serviços</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary-foreground">24/7</p>
                <p className="text-sm text-primary-foreground/70">Suporte</p>
              </div>
            </div>
          </div>

          {/* Image + Trust Block */}
          <div className="relative animate-fade-in order-2" style={{ animationDelay: '0.2s' }}>
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Pessoas felizes usando redes sociais"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-foreground text-sm">+1.500 likes</p>
                    <p className="text-xs text-muted-foreground">Acabou de receber</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Block - Clean version below image */}
            <div className="mt-6 bg-background/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-5 h-5 text-primary" />
                <span className="font-display font-semibold text-foreground">
                  Teste grátis: <span className="text-primary">100 likes</span>
                </span>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="Link do seu perfil"
                      value={profileLink}
                      onChange={(e) => setProfileLink(e.target.value)}
                      className="pl-10 h-10 text-sm bg-card"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="Link da postagem"
                      value={postLink}
                      onChange={(e) => setPostLink(e.target.value)}
                      className="pl-10 h-10 text-sm bg-card"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="cta"
                    className="w-full h-10"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Receber 100 Likes Grátis"
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Sem cadastro • Sem pagamento • Entrega instantânea
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="font-semibold text-foreground text-sm">Likes enviados!</p>
                  <p className="text-xs text-muted-foreground">Aguarde até 5 minutos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path
            d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
