import { useMemo, useState } from "react";
import { Instagram as InstagramIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PRICES = {
  seguidores: 0.1,
  curtidas: 0.05,
  visualizacoes: 0.03,
};

const SERVICES = [
  {
    id: "seguidores",
    name: "Seguidores Reais",
    description: "Aumente sua base de seguidores com perfis reais e engajados",
    gradient: "from-purple-600 via-pink-600 to-orange-500",
    accentBorder: "border-purple-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(168,85,247,0.45)]",
    summaryGradient: "from-purple-500/10 to-pink-500/10",
    summaryBorder: "border-purple-500/20",
    priceText: "text-purple-600 dark:text-purple-400",
    unitLabel: "seguidores",
    icon: InstagramIcon,
    inputs: [
      {
        id: "account",
        label: "Nome da conta Instagram",
        placeholder: "@seuinstagram",
        type: "text",
      },
      {
        id: "quantity",
        label: "Quantidade de seguidores",
        placeholder: "1000",
        type: "number",
        isQuantity: true,
      },
    ],
  },
  {
    id: "curtidas",
    name: "Curtidas Premium",
    description: "Mais curtidas para destacar suas publicações",
    gradient: "from-pink-600 to-orange-500",
    accentBorder: "border-pink-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(236,72,153,0.45)]",
    summaryGradient: "from-pink-500/10 to-orange-500/10",
    summaryBorder: "border-pink-500/20",
    priceText: "text-pink-600 dark:text-pink-400",
    unitLabel: "curtidas",
    icon: InstagramIcon,
    inputs: [
      {
        id: "postUrl",
        label: "URL da publicação",
        placeholder: "https://instagram.com/p/...",
        type: "text",
      },
      {
        id: "quantity",
        label: "Quantidade de curtidas",
        placeholder: "500",
        type: "number",
        isQuantity: true,
      },
    ],
  },
  {
    id: "visualizacoes",
    name: "Visualizações Turbo",
    description: "Impulsione a entrega de Reels e Stories com visualizações reais",
    gradient: "from-orange-500 to-purple-500",
    accentBorder: "border-orange-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(249,115,22,0.45)]",
    summaryGradient: "from-orange-500/10 to-purple-500/10",
    summaryBorder: "border-orange-500/20",
    priceText: "text-orange-600 dark:text-orange-400",
    unitLabel: "visualizações",
    icon: InstagramIcon,
    inputs: [
      {
        id: "contentUrl",
        label: "URL do conteúdo",
        placeholder: "https://instagram.com/reel/...",
        type: "text",
      },
      {
        id: "quantity",
        label: "Quantidade de visualizações",
        placeholder: "5000",
        type: "number",
        isQuantity: true,
      },
    ],
  },
];

type ServiceField = (typeof SERVICES)[number]["inputs"][number];

const Instagram = () => {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [formData, setFormData] = useState(() =>
    SERVICES.reduce<Record<string, Record<string, string>>>((acc, service) => {
      acc[service.id] = service.inputs.reduce<Record<string, string>>((fields, field) => {
        fields[field.id] = "";
        return fields;
      }, {});
      return acc;
    }, {}),
  );

  const service = useMemo(() => SERVICES.find((item) => item.id === selectedService) ?? SERVICES[0], [selectedService]);
  const ActiveIcon = service.icon;

  const handleChange = (serviceId: string, field: ServiceField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field.id]: value,
      },
    }));
  };

  const quantityField = service.inputs.find((input) => input.isQuantity);
  const quantityValue = quantityField ? Number(formData[service.id][quantityField.id] || 0) : 0;
  const total = quantityField ? quantityValue * PRICES[service.id as keyof typeof PRICES] : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <Header />
      <WhatsAppFloat />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 rounded-2xl flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Instagram
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Impulsione seu perfil no Instagram com seguidores e curtidas reais
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-2 border-border/40 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Escolha o tipo de serviço</CardTitle>
                <CardDescription>
                  Selecione abaixo o formato ideal para sua estratégia no Instagram
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {SERVICES.map((serviceOption) => {
                    const Icon = serviceOption.icon;
                    const isSelected = serviceOption.id === service.id;

                    return (
                      <button
                        key={serviceOption.id}
                        type="button"
                        onClick={() => setSelectedService(serviceOption.id)}
                        className={`group relative flex h-full flex-col gap-3 rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                          isSelected
                            ? `${serviceOption.accentBorder} ${serviceOption.accentShadow} bg-background`
                            : "border-transparent bg-muted/40 hover:border-border/60 hover:bg-muted/60 hover:shadow-lg"
                        }`}
                      >
                        <span
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${serviceOption.gradient} text-white shadow-lg shadow-black/10`}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <div className="space-y-1">
                          <span className="text-lg font-semibold">{serviceOption.name}</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {serviceOption.description}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                          <span>R$ {PRICES[serviceOption.id as keyof typeof PRICES].toFixed(2)} por {serviceOption.unitLabel}</span>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                              isSelected
                                ? `${serviceOption.accentBorder} bg-background`
                                : "border-border/80 bg-background/60"
                            }`}
                          >
                            Selecionar
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-2 bg-background/90 backdrop-blur-sm transition-all duration-200 ${service.accentBorder} ${service.accentShadow}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${service.gradient} text-white shadow-lg shadow-black/10`}
                  >
                    <ActiveIcon className="h-6 w-6" />
                  </span>
                  {service.name}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {service.inputs.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={`${service.id}-${field.id}`}>{field.label}</Label>
                      <Input
                        id={`${service.id}-${field.id}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[service.id][field.id]}
                        onChange={(event) => handleChange(service.id, field, event.target.value)}
                      />
                    </div>
                  ))}
                </div>

                {quantityField && quantityValue > 0 && (
                  <div
                    className={`rounded-xl border-2 bg-gradient-to-r p-5 animate-fade-in ${service.summaryGradient} ${service.summaryBorder}`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold">Total estimado</span>
                      <span className={`text-3xl font-bold ${service.priceText}`}>R$ {total.toFixed(2)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {quantityValue} {service.unitLabel} × R$ {PRICES[service.id as keyof typeof PRICES].toFixed(2)}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Todas as entregas são auditadas para garantir qualidade e segurança para sua conta.
                  </p>
                  <Button className="w-full sm:w-auto" variant="hero" size="lg">
                    Comprar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Instagram;
