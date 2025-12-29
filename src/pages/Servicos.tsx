import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { PurchaseModal } from "@/components/services/PurchaseModal";
import {
  Platform,
  platformById,
  platforms,
  Service,
  services,
  serviceVisuals,
  getServiceIcon,
} from "@/lib/services";

const Servicos = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("instagram");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const groupedServices = useMemo(
    () =>
      platforms.map((platform) => ({
        ...platform,
        services: services.filter((service) => service.platform === platform.id),
      })),
    []
  );

  const visiblePlatforms = useMemo(
    () => groupedServices.filter((platform) => platform.id === selectedPlatform),
    [groupedServices, selectedPlatform]
  );

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-left mb-12 max-w-3xl">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Catálogo Completo
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nossos Serviços
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Escolha a plataforma e o serviço que você precisa.
              Pagamento via PIX com entrega instantânea.
            </p>
          </div>

          {/* Platform Selector */}
          <div className="flex flex-wrap gap-4 mb-12">
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
          <div className="space-y-12">
            {visiblePlatforms.map((platform) => (
              <section
                key={platform.id}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white shadow-lg`}>
                    <platform.icon />
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
                  {platform.services.map((service) => (
                    <div
                      key={service.id}
                      className="group bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(45,93%,58%,0.1)] card-glow relative overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary))_0,transparent_30%),radial-gradient(circle_at_80%_0,hsl(var(--foreground))_0,transparent_30%)]" />

                      {/* Service Icon */}
                      {(() => {
                        const ServiceIcon = getServiceIcon(service.id);
                        const platformColors = platformById[service.platform];
                        const visual = serviceVisuals[service.id];
                        return (
                          <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platformColors.color} flex items-center justify-center shadow-md`}>
                                <platformColors.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${visual?.gradient ?? "from-primary/60 to-primary/40"} flex items-center justify-center shadow-md text-xl`}>
                                {visual?.emoji ?? "✨"}
                              </div>
                              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                                <ServiceIcon className="w-6 h-6 text-primary" />
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground">
                              Serviços para {platformColors.name}
                            </span>
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

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          A partir de{" "}
                          <span className="font-semibold text-foreground">
                            R$ {service.pricePerUnit.toFixed(2)} / unid.
                          </span>
                        </div>
                        {/* CTA Button */}
                        <Button
                          variant="cta"
                          className="ml-4"
                          onClick={() => setSelectedService(service)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Comprar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
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
