import { useMemo, useState } from "react";
import { Linkedin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PRICES = {
  connections: 0.35,
  followers: 0.28,
};

const SERVICES = [
  {
    id: "connections",
    name: "Conexões Profissionais",
    description: "Amplie sua rede com conexões relevantes e reais",
    gradient: "from-[#0A66C2] via-sky-600 to-blue-500",
    accentBorder: "border-[#0A66C2]",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(10,102,194,0.45)]",
    summaryGradient: "from-[#0A66C2]/10 to-sky-500/10",
    summaryBorder: "border-[#0A66C2]/20",
    priceText: "text-[#0A66C2] dark:text-sky-400",
    unitLabel: "conexões",
    icon: Linkedin,
    inputs: [
      {
        id: "profileUrl",
        label: "URL do perfil",
        placeholder: "https://linkedin.com/in/seuperfil",
        type: "text",
      },
      {
        id: "quantity",
        label: "Quantidade de conexões",
        placeholder: "500",
        type: "number",
        isQuantity: true,
      },
    ],
  },
  {
    id: "followers",
    name: "Seguidores da Página",
    description: "Impulsione a presença da sua empresa com seguidores qualificados",
    gradient: "from-sky-600 to-blue-500",
    accentBorder: "border-sky-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(56,189,248,0.45)]",
    summaryGradient: "from-sky-500/10 to-blue-500/10",
    summaryBorder: "border-sky-500/20",
    priceText: "text-sky-600 dark:text-sky-400",
    unitLabel: "seguidores",
    icon: Linkedin,
    inputs: [
      {
        id: "pageUrl",
        label: "URL da página",
        placeholder: "https://linkedin.com/company/suaempresa",
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
];

type ServiceField = (typeof SERVICES)[number]["inputs"][number];

const LinkedIn = () => {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-sky-950/20 dark:to-blue-950/20">
      <Header />
      <WhatsAppFloat />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-[#0A66C2] rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/30">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0A66C2] via-sky-600 to-blue-500 bg-clip-text text-transparent">
                LinkedIn
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Construa autoridade profissional com conexões qualificadas e seguidores engajados no LinkedIn
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-2 border-border/40 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Escolha o tipo de serviço</CardTitle>
                <CardDescription>
                  Foque no objetivo principal selecionando o serviço perfeito para você
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
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
                    Atuamos com segmentação inteligente para entregar conexões e seguidores alinhados ao seu nicho.
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

export default LinkedIn;
