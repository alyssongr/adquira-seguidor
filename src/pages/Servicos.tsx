import { useMemo, useState } from "react";
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
  pricePerUnit: number;
  minQuantity: number;
  maxQuantity: number;
}

const services: Service[] = [
  // Instagram
  {
    id: "5571",
    platform: "instagram",
    name: "Seguidores Instagram",
    description: "Aumente seu número de seguidores com perfis reais e ativos.",
    pricePerUnit: 0.05,
    minQuantity: 100,
    maxQuantity: 50000,
  },
  {
    id: "8952",
    platform: "instagram",
    name: "Curtidas Instagram",
    description: "Curtidas para suas fotos e vídeos. Aumenta o engajamento.",
    pricePerUnit: 0.02,
    minQuantity: 50,
    maxQuantity: 10000,
  },
  {
    id: "7320",
    platform: "instagram",
    name: "Visualizações Reels",
    description: "Impulsione seus Reels com visualizações reais.",
    pricePerUnit: 0.01,
    minQuantity: 100,
    maxQuantity: 100000,
  },

  // TikTok
  {
    id: "9390",
    platform: "tiktok",
    name: "Seguidores TikTok",
    description: "Seguidores reais para seu perfil TikTok.",
    pricePerUnit: 0.04,
    minQuantity: 100,
    maxQuantity: 50000,
  },
  {
    id: "9225",
    platform: "tiktok",
    name: "Curtidas TikTok",
    description: "Curtidas para seus vídeos do TikTok.",
    pricePerUnit: 0.02,
    minQuantity: 50,
    maxQuantity: 20000,
  },
  {
    id: "9444",
    platform: "tiktok",
    name: "Visualizações TikTok",
    description: "Aumente as visualizações dos seus vídeos.",
    pricePerUnit: 0.005,
    minQuantity: 500,
    maxQuantity: 500000,
  },

  // YouTube (IDs serão definidos posteriormente)
  {
    id: "yt-subscribers",
    platform: "youtube",
    name: "Inscritos YouTube",
    description: "Aumente seus inscritos com qualidade e segurança.",
    pricePerUnit: 0.1,
    minQuantity: 50,
    maxQuantity: 10000,
  },
  {
    id: "yt-views",
    platform: "youtube",
    name: "Visualizações YouTube",
    description: "Visualizações reais para seus vídeos.",
    pricePerUnit: 0.02,
    minQuantity: 100,
    maxQuantity: 100000,
  },
  {
    id: "yt-likes",
    platform: "youtube",
    name: "Likes YouTube",
    description: "Curtidas para aumentar o engajamento dos vídeos.",
    pricePerUnit: 0.04,
    minQuantity: 50,
    maxQuantity: 10000,
  },
];

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
    color: "from-[hsl(var(--social-instagram-1))] to-[hsl(var(--social-instagram-2))]",
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
    case "5571": // Instagram Followers
    case "9390": // TikTok Followers
    case "yt-subscribers":
      return Users;
    case "8952": // Instagram Likes
    case "9225": // TikTok Likes
    case "yt-likes":
      return Heart;
    case "7320": // Instagram Views
    case "9444": // TikTok Views
    case "yt-views":
      return Eye;
    default:
      return ShoppingCart;
  }
};

const Servicos = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const visibleServices = useMemo(
    () => services.filter((service) => service.platform === selectedPlatform),
    [selectedPlatform]
  );

  const platformMeta = platformById[selectedPlatform];

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <header className="text-center mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Catálogo Completo
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nossos Serviços
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Escolha a plataforma e veja todos os serviços disponíveis.
            </p>
          </header>

          {/* Platform Selector */}
          <nav aria-label="Selecionar plataforma" className="flex flex-wrap justify-center gap-4 mb-12">
            {platforms.map((platform) => {
              const isActive = selectedPlatform === platform.id;
              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-[0_0_30px_hsl(45,93%,58%,0.2)]"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-foreground`}
                  >
                    <platform.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`font-display font-semibold text-lg ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {platform.name}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Services (only selected platform) */}
          <main>
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${platformMeta.color} flex items-center justify-center text-foreground shadow-lg`}
                >
                  <platformMeta.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm uppercase text-primary font-semibold tracking-wide">
                    {platformMeta.name}
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    Serviços para {platformMeta.name}
                  </h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleServices.map((service) => {
                  const ServiceIcon = getServiceIcon(service.id);

                  return (
                    <article
                      key={service.id}
                      className="group bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(45,93%,58%,0.1)] card-glow relative overflow-hidden"
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary))_0,transparent_35%),radial-gradient(circle_at_80%_0,hsl(var(--foreground))_0,transparent_35%)]"
                      />

                      <div className="relative">
                        {/* mini "logo" + ícone do serviço */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${platformMeta.color} flex items-center justify-center text-foreground shadow-md`}
                            >
                              <platformMeta.icon className="w-6 h-6" />
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                              <ServiceIcon className="w-6 h-6 text-primary" />
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-[11px] text-muted-foreground">a partir de</p>
                            <p className="font-display text-lg font-bold text-primary">
                              R$ {service.pricePerUnit.toFixed(2)}
                            </p>
                            <p className="text-[11px] text-muted-foreground">por unidade</p>
                          </div>
                        </div>

                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                          {service.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>

                        <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                          <span>Mín: {service.minQuantity.toLocaleString()}</span>
                          <span>Máx: {service.maxQuantity.toLocaleString()}</span>
                        </div>

                        <Button
                          variant="cta"
                          className="w-full mt-6"
                          onClick={() => setSelectedService(service)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Comprar
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Purchase Modal */}
      {selectedService && (
        <PurchaseModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </Layout>
  );
};

export default Servicos;
