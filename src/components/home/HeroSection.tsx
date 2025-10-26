import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-person.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6TTYgMnYySDJ2LTJINHYYBDY+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-secondary/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Crescimento Garantido</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight">
              Cresça seu perfil com <span className="text-secondary underline decoration-secondary/30 decoration-4">velocidade</span> e segurança
            </h1>
            
            <p className="text-lg md:text-xl text-secondary/80 max-w-xl">
              Planos flexíveis, entrega rápida e suporte humano — do jeitinho que você precisa para alcançar seus objetivos.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">100% Seguro</p>
                  <p className="text-xs text-secondary/60">SSL & Criptografia</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">★★★★★ 4.9/5</p>
                  <p className="text-xs text-secondary/60">+15.000 avaliações</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">Entrega Rápida</p>
                  <p className="text-xs text-secondary/60">Resultados em horas</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/planos">
                <Button size="xl" variant="hero" className="group">
                  Começar Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/planos">
                <Button size="xl" variant="hero-outline">
                  Ver Planos
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-secondary/60">
              <span className="font-bold text-secondary">+50.000 clientes</span> já transformaram seus perfis com a gente 🚀
            </p>
          </div>

          {/* Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-glow-xl">
              <img 
                src={heroImage} 
                alt="Pessoa feliz usando smartphone para crescer nas redes sociais" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-glow-lg border border-border animate-fade-in hidden md:block">
              <p className="text-3xl font-bold text-primary">+10K</p>
              <p className="text-sm text-muted-foreground">Seguidores hoje</p>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-card p-4 rounded-xl shadow-glow-lg border border-border animate-fade-in hidden md:block">
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Satisfação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
