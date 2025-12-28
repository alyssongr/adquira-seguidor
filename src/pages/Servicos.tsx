import { useState } from "react";
import {
  Instagram,
  Youtube,
  ShoppingCart,
  TrendingUp,
  Users,
  Heart,
  Eye,
  MessageCircle,
  Clock,
  Play,
  Zap,
  Star,
} from "lucide-react";
import { Layout } from "@/components/Layout";
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
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
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

const Servicos = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = services.filter(
    (service) => service.platform === selectedPlatform
  );

  return (
    <Layout>
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
              Escolha a plataforma e o serviço que você precisa. 
              Pagamento via PIX com entrega instantânea.
            </p>
          </div>

          {/* Platform Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? "border-primary bg-primary/10 shadow-[0_0_30px_hsl(45,93%,58%,0.2)]"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white`}
                >
                  <platform.icon />
                </div>
                <span
                  className={`font-display font-semibold text-lg ${
                    selectedPlatform === platform.id
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {platform.name}
                </span>
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(45,93%,58%,0.1)] card-glow"
              >
                {/* Service Icon */}
                {(() => {
                  const ServiceIcon = getServiceIcon(service.id);
                  const platform = platformById[service.platform];
                  return (
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4`}>
                      <ServiceIcon className="w-6 h-6 text-white" />
                    </div>
                  );
                })()}

                {/* Service Info */}
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Stats */}
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

                {/* CTA Button */}
                <Button
                  variant="cta"
                  className="w-full"
                  onClick={() => setSelectedService(service)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Comprar
                </Button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Nenhum serviço disponível
              </h3>
              <p className="text-muted-foreground">
                Serviços para esta plataforma estarão disponíveis em breve.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Purchase Modal */}
      {selectedService && (
        <PurchaseModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </Layout>
  );
};

export default Servicos;
