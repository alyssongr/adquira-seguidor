import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import heroImage from "@/assets/hero-people.jpg";

export function HeroSection() {
  const [postLink, setPostLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postLink) {
      toast.error("Cole o link da sua postagem");
      return;
    }

    if (!postLink.includes("instagram.com")) {
      toast.error("Por favor, insira um link válido do Instagram");
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
          {/* Content */}
          <div className="text-left animate-slide-up order-1">
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

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg">
              Seguidores, curtidas e visualizações reais para Instagram, TikTok e YouTube. 
              Entrega rápida e pagamento via PIX.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
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
            <div className="flex flex-wrap justify-start gap-8 mt-10">
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

            {/* Instagram Test Block - Animated */}
            <div className="mt-6 relative group">
              {/* Animated glow background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 animate-pulse-slow" />
              
              <div className="relative bg-background rounded-2xl p-5 shadow-xl border border-white/10">
                {/* Header with Instagram branding */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Instagram gradient icon */}
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center animate-pulse">
                        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      {/* Sparkle animation */}
                      <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-bounce" />
                    </div>
                    <div>
                      <span className="font-display font-bold text-foreground block">
                        Teste Grátis
                      </span>
                      <span className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 font-semibold">
                        100 likes no Instagram
                      </span>
                    </div>
                  </div>
                  
                  {/* Animated rocket */}
                  <div className="relative">
                    <div className="text-2xl animate-bounce" style={{ animationDuration: '1s' }}>
                      🚀
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-t from-orange-500 to-transparent rounded-full blur-sm animate-pulse" />
                  </div>
                </div>

                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      {/* Instagram gradient border effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 rounded-lg opacity-50 blur-[2px]" />
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                          </svg>
                        </div>
                        <Input
                          type="url"
                          placeholder="Cole o link da postagem do Instagram"
                          value={postLink}
                          onChange={(e) => setPostLink(e.target.value)}
                          className="pl-11 h-11 text-sm bg-card border-0"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    
                    {/* Glowing CTA button */}
                    <div className="relative group/btn">
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 rounded-lg opacity-70 blur group-hover/btn:opacity-100 transition-opacity animate-pulse" />
                      <Button
                        type="submit"
                        className="relative w-full h-11 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 hover:from-pink-600 hover:via-purple-600 hover:to-orange-500 text-white font-bold border-0 shadow-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Heart className="w-4 h-4 animate-pulse" fill="currentColor" />
                            Receber 100 Likes Grátis
                            <Sparkles className="w-4 h-4 animate-pulse" />
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Sem cadastro • Entrega em segundos
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-4 animate-scale-in">
                    <div className="relative inline-block">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 animate-bounce" />
                    </div>
                    <p className="font-bold text-foreground">Likes enviados! 🎉</p>
                    <p className="text-xs text-muted-foreground">Chegam em até 5 minutos</p>
                  </div>
                )}
              </div>
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
