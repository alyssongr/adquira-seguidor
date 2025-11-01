import { useMemo, useState } from "react";
import { Facebook as FacebookIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PRICES = {
  seguidores: 0.09,
  curtidas: 0.04,
  visualizacoes: 0.025,
};

const SERVICES = [
  {
    id: "seguidores",
    name: "Seguidores Autênticos",
    description: "Aumente seus seguidores na página com perfis relevantes",
    gradient: "from-blue-600 to-indigo-600",
    accentBorder: "border-blue-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(59,130,246,0.45)]",
    summaryGradient: "from-blue-500/10 to-indigo-500/10",
    summaryBorder: "border-blue-500/20",
    priceText: "text-blue-600 dark:text-blue-400",
    unitLabel: "seguidores",
    icon: FacebookIcon,
    inputs: [
      {
        id: "pageUrl",
        label: "URL da página",
        placeholder: "https://facebook.com/suapagina",
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
    name: "Curtidas Engajadas",
    description: "Potencialize o alcance das suas publicações",
    gradient: "from-indigo-600 to-purple-600",
    accentBorder: "border-indigo-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(99,102,241,0.45)]",
    summaryGradient: "from-indigo-500/10 to-purple-500/10",
    summaryBorder: "border-indigo-500/20",
    priceText: "text-indigo-600 dark:text-indigo-400",
    unitLabel: "curtidas",
    icon: FacebookIcon,
    inputs: [
      {
        id: "postUrl",
        label: "URL da publicação",
        placeholder: "https://facebook.com/...",
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
    name: "Visualizações Rápidas",
    description: "Mais visualizações para vídeos, Reels e transmissões",
    gradient: "from-purple-600 to-blue-500",
    accentBorder: "border-purple-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(168,85,247,0.45)]",
    summaryGradient: "from-purple-500/10 to-blue-500/10",
    summaryBorder: "border-purple-500/20",
    priceText: "text-purple-600 dark:text-purple-400",
    unitLabel: "visualizações",
    icon: FacebookIcon,
    inputs: [
      {
        id: "contentUrl",
        label: "URL do vídeo",
        placeholder: "https://facebook.com/watch/...",
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

const Facebook = () => {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <Header />
      <WhatsAppFloat />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <FacebookIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Facebook
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fortaleça sua presença no Facebook com seguidores e curtidas
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-2 border-border/40 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Escolha o tipo de serviço</CardTitle>
                <CardDescription>
                  Organize sua campanha selecionando o serviço ideal para sua página
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {SERVICES.map((serviceOption) => {
                    const OptionIcon = serviceOption.icon;
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
                          <OptionIcon className="h-6 w-6" />
                        </span>
                        <div className="space-y-1">
                          <span className="text-lg font-semibold">{serviceOption.name}</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {serviceOption.description}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                          <span>
                            R$ {PRICES[serviceOption.id as keyof typeof PRICES].toFixed(2)} por {serviceOption.unitLabel}
                          </span>
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
                        type={field.type ?? "text"}
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
                    Todas as estratégias passam por validação manual para manter a segurança da sua página.
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

export default Facebook;
