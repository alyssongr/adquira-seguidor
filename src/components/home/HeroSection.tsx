import { useMemo, useRef, useState } from "react";
import type { RefObject } from "react";
import {
  Instagram,
  Youtube,
  ShoppingCart,
  Users,
  Heart,
  Eye,
  MessageCircle,
  Clock,
  Play,
  Zap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PurchaseModal } from "@/components/services/PurchaseModal";

type Platform = "instagram" | "tiktok" | "youtube";

interface Service {
  id: string;
  platform: Platform;
  name: string;
  description: string;
  tags: string[];
  pricePerUnit: number;
  minQuantity: number;
  maxQuantity: number;
}

const services: Service[] = [
  // Instagram
  {
    id: "ig-followers",
    platform: "instagram",
    name: "Seguidores Instagram",
    description: "Aumente seu número de seguidores com perfis reais e ativos.",
    tags: ["Mais vendido", "Entrega rápida"],
    pricePerUnit: 0.05,
    minQuantity: 100,
    maxQuantity: 50000,
  },
  {
    id: "ig-likes",
    platform: "instagram",
    name: "Curtidas Instagram",
    description: "Curtidas para suas fotos e vídeos. Aumenta o engajamento.",
    tags: ["Popular", "Instantâneo"],
    pricePerUnit: 0.02,
    minQuantity: 50,
    maxQuantity: 10000,
  },
  {
    id: "ig-views",
    platform: "instagram",
    name: "Visualizações Reels",
    description: "Impulsione seus Reels com visualizações reais.",
    tags: ["Rápido"],
    pricePerUnit: 0.01,
    minQuantity: 100,
    maxQuantity: 100000,
  },
  {
    id: "ig-story-views",
    platform: "instagram",
    name: "Visualizações Stories",
    description: "Mais visualizações para seus Stories.",
    tags: ["Novo"],
    pricePerUnit: 0.01,
    minQuantity: 100,
    maxQuantity: 50000,
  },
  {
    id: "ig-comments",
    platform: "instagram",
    name: "Comentários Instagram",
    description: "Comentários personalizados para suas postagens.",
    tags: ["Premium"],
    pricePerUnit: 0.5,
    minQuantity: 10,
    maxQuantity: 500,
  },
  // TikTok
  {
    id: "tt-followers",
    platform: "tiktok",
    name: "Seguidores TikTok",
    description: "Seguidores reais para seu perfil TikTok.",
    tags: ["Mais vendido", "Seguro"],
    pricePerUnit: 0.04,
    minQuantity: 100,
    maxQuantity: 50000,
  },
  {
    id: "tt-likes",
    platform: "tiktok",
    name: "Curtidas TikTok",
    description: "Curtidas para seus vídeos do TikTok.",
    tags: ["Popular"],
    pricePerUnit: 0.02,
    minQuantity: 50,
    maxQuantity: 20000,
  },
  {
    id: "tt-views",
    platform: "tiktok",
    name: "Visualizações TikTok",
    description: "Aumente as visualizações dos seus vídeos.",
    tags: ["Rápido"],
    pricePerUnit: 0.005,
    minQuantity: 500,
    maxQuantity: 500000,
  },
  {
    id: "tt-shares",
    platform: "tiktok",
    name: "Compartilhamentos TikTok",
    description: "Mais compartilhamentos para viralizar seus vídeos.",
    tags: ["Novo"],
    pricePerUnit: 0.08,
    minQuantity: 50,
    maxQuantity: 5000,
  },
  // YouTube
  {
    id: "yt-subscribers",
    platform: "youtube",
    name: "Inscritos YouTube",
    description: "Aumente seus inscritos com qualidade e segurança.",
    tags: ["Mais vendido", "Premium"],
    pricePerUnit: 0.1,
    minQuantity: 50,
    maxQuantity: 10000,
  },
  {
    id: "yt-views",
    platform: "youtube",
    name: "Visualizações YouTube",
    description: "Visualizações reais para seus vídeos.",
    tags: ["Popular"],
    pricePerUnit: 0.02,
    minQuantity: 100,
    maxQuantity: 100000,
  },
  {
    id: "yt-likes",
    platform: "youtube",
    name: "Likes YouTube",
    description: "Curtidas para aumentar o engajamento dos vídeos.",
    tags: ["Rápido"],
    pricePerUnit: 0.04,
    minQuantity: 50,
    maxQuantity: 10000,
  },
  {
    id: "yt-watch",
    platform: "youtube",
    name: "Watch Time YouTube",
    description: "Horas de visualização para monetização.",
    tags: ["Premium", "Monetização"],
    pricePerUnit: 2.0,
    minQuantity: 10,
    maxQuantity: 4000,
  },
];

// ✅ TikTok icon aceitando className (pra não quebrar)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-5 h-5"}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const platforms = [
  {
    id: "instagram" as Platform,
    name: "Instagram",
    icon: Instagram,
    color: "from-pink-500 to-purple-600",
  },
  {
    id: "tiktok" as Platform,
    name: "TikTok",
    icon: TikTokIcon,
    color: "from-cyan-400 to-pink-500",
  },
  {
    id: "youtube" as Platform,
    name: "YouTube",
    icon: Youtube,
    color: "from-red-500 to-red-600",
  },
];

const platformById = {
  instagram: platforms[0],
  tiktok: platforms[1],
  youtube: platforms[2],
} as const;

const getServiceIcon = (serviceId: string) => {
  switch (serviceId) {
    case "ig-followers":
    case "tt-followers":
    case "yt-subscribers":
      return Users;
    case "ig-likes":
    case "tt-likes":
    case "yt-likes":
      return Heart;
    case "ig-views":
    case "ig-story-views":
    case "tt-views":
    case "yt-views":
      return Eye;
    case "ig-comments":
      return MessageCircle;
    case "tt-shares":
      return Play;
    case "yt-watch":
      return Clock;
    default:
      return ShoppingCart;
  }
};

const serviceVisuals: Record<
  Service["id"],
  { gradient: string; accent: string; emoji: string }
> = {
  "ig-followers": {
    gradient: "from-pink-500/80 via-purple-500/70 to-orange-400/70",
    accent: "bg-pink-500/15",
    emoji: "👥",
  },
  "ig-likes": {
    gradient: "from-pink-500/80 via-rose-500/70 to-orange-400/70",
    accent: "bg-rose-500/15",
    emoji: "❤️",
  },
  "ig-views": {
    gradient: "from-purple-500/80 via-indigo-500/70 to-blue-500/70",
    accent: "bg-indigo-500/15",
    emoji: "🎬",
  },
  "ig-story-views": {
    gradient: "from-amber-400/80 via-orange-500/70 to-pink-500/70",
    accent: "bg-amber-500/15",
    emoji: "📱",
  },
  "ig-comments": {
    gradient: "from-purple-500/80 via-pink-500/70 to-rose-500/70",
    accent: "bg-purple-500/15",
    emoji: "💬",
  },
  "tt-followers": {
    gradient: "from-cyan-400/80 via-pink-500/70 to-purple-500/70",
    accent: "bg-cyan-500/15",
    emoji: "🚀",
  },
  "tt-likes": {
    gradient: "from-fuchsia-500/80 via-cyan-400/70 to-rose-500/70",
    accent: "bg-fuchsia-500/15",
    emoji: "👍",
  },
  "tt-views": {
    gradient: "from-sky-400/80 via-cyan-400/70 to-blue-500/70",
    accent: "bg-sky-500/15",
    emoji: "👁️",
  },
  "tt-shares": {
    gradient: "from-emerald-400/80 via-cyan-400/70 to-blue-500/70",
    accent: "bg-emerald-500/15",
    emoji: "📢",
  },
  "yt-subscribers": {
    gradient: "from-red-500/80 via-rose-500/70 to-orange-500/70",
    accent: "bg-red-500/15",
    emoji: "🎯",
  },
  "yt-views": {
    gradient: "from-orange-500/80 via-amber-500/70 to-red-500/70",
    accent: "bg-orange-500/15",
    emoji: "▶️",
  },
  "yt-likes": {
    gradient: "from-rose-500/80 via-red-500/70 to-orange-500/70",
    accent: "bg-rose-500/15",
    emoji: "⭐",
  },
  "yt-watch": {
    gradient: "from-amber-500/80 via-orange-500/70 to-red-500/70",
    accent: "bg-amber-500/15",
    emoji: "⏱️",
  },
};

export const HeroSection = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const sectionRefs: Record<Platform, RefObject<HTMLDivElement>> = {
    instagram: useRef<HTMLDivElement>(null),
    tiktok: useRef<HTMLDivElement>(null),
    youtube: useRef<HTMLDivElement>(null),
  };

  const groupedServices = useMemo(
    () =>
      platforms.map((platform) => ({
        ...platform,
        services: services.filter((service) => service.platform === platform.id),
      })),
    []
  );

  const handlePlatformClick = (platformId: Platform) => {
    setSelectedPlatform(platformId);
    const section = sectionRefs[platformId].current;
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Catálogo Completo
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nossos Serviços
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Escolha a plataforma e o serviço que você precisa. Pagamento via PIX com entrega instantânea.
            </p>
          </div>

          {/* Platform Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformClick(platform.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? "border-primary bg-primary/10 shadow-[0_0_30px_hsl(45,93%,58%,0.2)]"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white`}>
                  <platform.icon className="w-5 h-5" />
                </div>
                <span className={`font-display font-semibold text-lg ${selectedPlatform === platform.id ? "text-primary" : "text-foreground"}`}>
                  {platform.name}
                </span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="space-y-12">
            {groupedServices.map((platform) => (
              <section
                key={platform.id}
                ref={sectionRefs[platform.id]}
                className={`space-y-6 rounded-3xl border border-border/60 p-6 lg:p-8 transition-all ${
                  selectedPlatform === platform.id
                    ? "bg-primary/5 ring-2 ring-primary/30 shadow-[0_10px_60px_-25px_hsl(45,93%,58%)]"
                    : "bg-card/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white shadow-lg`}>
                    <platform.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm uppercase text-primary font-semibold tracking-wide">
                      {platform.name}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      Serviços para {platform.name}
                    </h2>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platform.services.map((service) => {
                    const ServiceIcon = getServiceIcon(service.id);
                    const platformColors = platformById[service.platform];
                    const visual = serviceVisuals[service.id];

                    return (
                      <div
                        key={service.id}
                        className="group bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(45,93%,58%,0.1)] card-glow relative overflow-hidden"
                      >
                        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary))_0,transparent_30%),radial-gradient(circle_at_80%_0,hsl(var(--foreground))_0,transparent_30%)]" />

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platformColors.color} flex items-center justify-center shadow-md`}>
                              <platformColors.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${visual?.accent ?? "bg-primary/15"}`}>
                              {visual?.emoji ?? "✨"}
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                              <ServiceIcon className="w-5 h-5 text-primary" />
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {platformColors.name}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                          {service.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        {/* linha separadora + stats (opcional) */}
                        <div className="h-px bg-border mb-4" />
                        <div className="flex items-center gap-4 mb-6 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-primary" />
                            <span>Entrega rápida</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-primary" />
                            <span>4.9/5</span>
                          </div>
                        </div>

                        <Button variant="cta" className="w-full" onClick={() => setSelectedService(service)}>
                          <ShoppingCart className="w-4 h-4" />
                          Comprar
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {selectedService && (
        <PurchaseModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </>
  );
};

export default HeroSection;
