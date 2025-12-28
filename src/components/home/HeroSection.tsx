import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-people.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary-foreground)) 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
              <span className="text-sm font-medium text-primary-foreground">
                +50.000 clientes satisfeitos
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Impulsione Suas{" "}
              <span className="relative">
                Redes Sociais
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 6" stroke="hsl(var(--primary-foreground))" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>{" "}
              Agora
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Seguidores, curtidas e visualizações reais para Instagram, TikTok e YouTube. 
              Entrega rápida, pagamento via PIX e suporte 24h.
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
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
              <div>
                <p className="text-3xl font-display font-bold text-primary-foreground">50K+</p>
                <p className="text-sm text-primary-foreground/70">Clientes</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary-foreground">1M+</p>
                <p className="text-sm text-primary-foreground/70">Serviços Entregues</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-primary-foreground">24/7</p>
                <p className="text-sm text-primary-foreground/70">Suporte</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Pessoas felizes usando redes sociais"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-4 shadow-xl animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" fill="currentColor" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">+1.500 likes</p>
                  <p className="text-xs text-muted-foreground">Acabou de receber</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
