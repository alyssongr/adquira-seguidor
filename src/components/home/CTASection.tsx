import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6TTYgMnYySDJ2LTJINHYYBDY+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Oferta Especial</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-secondary">
            Pronto para transformar seu perfil?
          </h2>

          <p className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto">
            Comece agora e veja resultados reais em poucas horas. Milhares de clientes já confiam em nossos serviços.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/planos">
              <Button size="xl" variant="hero" className="group">
                Começar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contato">
              <Button size="xl" variant="hero-outline">
                Falar com Suporte
              </Button>
            </Link>
          </div>

          <div className="pt-8 border-t border-secondary/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-secondary mb-1">+50K</p>
                <p className="text-sm text-secondary/70">Clientes Satisfeitos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary mb-1">24/7</p>
                <p className="text-sm text-secondary/70">Suporte Disponível</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary mb-1">98%</p>
                <p className="text-sm text-secondary/70">Taxa de Satisfação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
