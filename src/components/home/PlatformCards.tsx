import { Link } from "react-router-dom";
import { Instagram, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    description: "Seguidores, curtidas, visualizações de stories e reels.",
    color: "from-pink-500 to-purple-600",
    services: ["Seguidores", "Curtidas", "Visualizações", "Comentários"],
  },
  {
    name: "TikTok",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    description: "Seguidores, curtidas, visualizações e compartilhamentos.",
    color: "from-cyan-400 to-pink-500",
    services: ["Seguidores", "Curtidas", "Visualizações", "Shares"],
  },
  {
    name: "YouTube",
    icon: Youtube,
    description: "Inscritos, visualizações, likes e horas de watch time.",
    color: "from-red-500 to-red-600",
    services: ["Inscritos", "Visualizações", "Likes", "Watch Time"],
  },
];

export function PlatformCards() {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Plataformas Suportadas
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Escolha Sua Rede Social
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Oferecemos serviços para as principais redes sociais. 
            Escolha a plataforma e impulsione seu perfil.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_hsl(45,93%,58%,0.15)] hover:-translate-y-2"
            >
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-br ${platform.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                  <platform.icon className="w-16 h-16" />
                </div>
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/20 blur-xl" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/10 blur-lg" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {platform.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {platform.description}
                </p>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {platform.services.map((service, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-secondary text-muted-foreground rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full group/btn">
                  <Link to="/servicos" className="flex items-center justify-center gap-2">
                    Ver Serviços
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
