import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Instagram,
  Rocket,
  Sparkles,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-people.jpg";

const instagramUrlSchema = z
  .string()
  .trim()
  .min(1, "Cole o link do Instagram")
  .max(2048, "Link muito longo")
  .url("Cole um link válido")
  .refine((url) => url.includes("instagram.com"), {
    message: "Esse link precisa ser do Instagram",
  });

export function HeroSection() {
  const [instagramLink, setInstagramLink] = useState("");
  const [freeLikeError, setFreeLikeError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFreeLikes = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = instagramUrlSchema.safeParse(instagramLink);
    if (!parsed.success) {
      setFreeLikeError(parsed.error.issues[0]?.message ?? "Link inválido");
      return;
    }

    setFreeLikeError("");
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setInstagramLink("");
    }, 3000);
  };

  return (
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
              <span className="text-sm font-medium text-primary-foreground">#1 em Redes Sociais</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Impulsione Suas
              <br />
              <span className="relative">
                Redes Sociais
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
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
              Conquiste mais seguidores, curtidas e engajamento real. Resultados rápidos e seguros para Instagram,
              TikTok e YouTube.
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

          {/* Right Content - Image + Free test */}
          <div className="relative">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-primary-foreground/20">
                <img
                  src={heroImage}
                  alt="Pessoas felizes usando redes sociais no celular"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-primary-foreground rounded-2xl p-4 shadow-xl animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,hsl(var(--social-instagram-1)),hsl(var(--social-instagram-2)))] flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Novos Seguidores</p>
                    <p className="font-bold text-foreground">+1,234</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 bg-primary-foreground rounded-2xl p-4 shadow-xl animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center">
                    <span className="text-primary-foreground text-lg">❤️</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Curtidas Hoje</p>
                    <p className="font-bold text-foreground">+5,678</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Likes (clean, below image) */}
            <div className="mt-8">
              <div className="relative overflow-hidden rounded-3xl bg-background/90 backdrop-blur border border-primary-foreground/15 shadow-[0_20px_60px_-30px_hsl(0,0%,0%,0.6)] p-6 card-glow animate-glow">
                {/* pulse dot */}
                <div className="absolute left-6 top-6 w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />

                {/* rocket */}
                <Rocket className="absolute right-6 top-5 w-5 h-5 text-primary animate-rocket-fly" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-[linear-gradient(135deg,hsl(var(--social-instagram-1)),hsl(var(--social-instagram-2)))] flex items-center justify-center shadow-[0_10px_30px_-15px_hsl(var(--social-instagram-1)/0.6)]">
                        <Instagram className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground">Teste grátis (Instagram)</p>
                        <h2 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
                          Ganhe 100 likes na sua postagem
                        </h2>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Chamativo
                    </div>
                  </div>

                  {!isSubmitted ? (
                    <form onSubmit={handleFreeLikes} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Link da postagem do Instagram
                        </label>
                        <Input
                          type="url"
                          inputMode="url"
                          placeholder="https://www.instagram.com/p/..."
                          value={instagramLink}
                          onChange={(e) => {
                            setInstagramLink(e.target.value);
                            setFreeLikeError("");
                          }}
                          required
                          className={freeLikeError ? "border-destructive" : ""}
                        />
                        {freeLikeError && <p className="text-xs text-destructive mt-2">{freeLikeError}</p>}
                      </div>

                      <Button
                        type="submit"
                        variant="cta"
                        size="lg"
                        className="w-full relative overflow-hidden before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent,hsl(var(--primary-foreground)/0.35),transparent)] before:content-[''] before:animate-shimmer before:pointer-events-none"
                      >
                        Receber 100 Likes Grátis
                      </Button>

                      <p className="text-xs text-muted-foreground">
                        Essencial: 1 uso por perfil • Postagem deve estar pública
                      </p>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-[0_0_30px_hsl(45,93%,58%,0.35)]">
                        <CheckCircle className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">
                        Solicitação enviada!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Seus likes serão entregues em alguns minutos.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
