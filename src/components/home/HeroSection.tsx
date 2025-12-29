import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Gift, Instagram, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-people.jpg";

export function HeroSection() {
  const [profileLink, setProfileLink] = useState("");
  const [postLink, setPostLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFreeLikes = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileLink && postLink) {
      setIsSubmitted(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setProfileLink("");
        setPostLink("");
      }, 3000);
    }
  };

  return (
    <>
      {/* Hero Section - Yellow Background */}
      <section className="relative min-h-screen bg-primary overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 pt-32 pb-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left lg:pl-8 xl:pl-16">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">
                  #1 em Redes Sociais
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Impulsione Suas
                <br />
                <span className="relative">
                  Redes Sociais
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 8C50 2 150 2 298 8"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="text-primary-foreground/40"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Conquiste mais seguidores, curtidas e engajamento real. 
                Resultados rápidos e seguros para Instagram, TikTok e YouTube.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild variant="hero" size="xl">
                  <Link to="/servicos" className="group">
                    Comprar Serviços
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="xl"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link to="/sobre">Saiba Mais</Link>
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  <span className="text-sm text-primary-foreground/80">100% Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary-foreground" />
                  <span className="text-sm text-primary-foreground/80">Entrega Rápida</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-primary-foreground/20">
                  <img
                    src={heroImage}
                    alt="Pessoas felizes usando redes sociais no celular"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-primary-foreground rounded-2xl p-4 shadow-xl animate-fade-in z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Novos Seguidores</p>
                    <p className="font-bold text-foreground">+1,234</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-primary-foreground rounded-2xl p-4 shadow-xl animate-fade-in z-20" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">❤️</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Curtidas Hoje</p>
                    <p className="font-bold text-foreground">+5,678</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Likes Section */}
      <section className="py-16 bg-gradient-to-b from-background to-card/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border-2 border-primary/30 rounded-3xl p-8 shadow-[0_0_50px_hsl(45,93%,58%,0.15)] relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Gift className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    100 Likes Grátis!
                  </h2>
                </div>

                <p className="text-center text-muted-foreground mb-6">
                  Teste agora gratuitamente: receba <strong className="text-primary">100 likes reais</strong> no seu Instagram
                </p>

                {!isSubmitted ? (
                  <form onSubmit={handleFreeLikes} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Link do seu perfil do Instagram
                      </label>
                      <Input
                        type="url"
                        placeholder="https://instagram.com/seuperfil"
                        value={profileLink}
                        onChange={(e) => setProfileLink(e.target.value)}
                        required
                        className="bg-background border-border"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Link da postagem para receber likes
                      </label>
                      <Input
                        type="url"
                        placeholder="https://instagram.com/p/..."
                        value={postLink}
                        onChange={(e) => setPostLink(e.target.value)}
                        required
                        className="bg-background border-border"
                      />
                    </div>

                    <Button type="submit" variant="cta" size="lg" className="w-full">
                      <Gift className="w-5 h-5" />
                      Receber 100 Likes Grátis
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      Solicitação Enviada!
                    </h3>
                    <p className="text-muted-foreground">
                      Seus 100 likes serão entregues em até 10 minutos.
                    </p>
                  </div>
                )}

                <p className="text-xs text-center text-muted-foreground mt-4">
                  ⚡ Limitado a 1 uso por perfil. Perfil deve ser público.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
