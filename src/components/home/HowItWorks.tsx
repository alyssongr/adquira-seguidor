import { UserPlus, CreditCard, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Escolha o Serviço",
    description: "Selecione a plataforma e o tipo de serviço que você precisa.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Faça o Pagamento",
    description: "Pague de forma rápida e segura via PIX. Sem burocracia.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Receba em Minutos",
    description: "Seu pedido é processado automaticamente e entregue rapidamente.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Aproveite os Resultados",
    description: "Veja seu perfil crescer com engajamento real e de qualidade.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Simples e Rápido
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Em apenas 4 passos simples, você impulsiona suas redes sociais 
            e alcança mais pessoas.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(45,93%,58%,0.1)] card-glow h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-4xl font-display font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {step.step}
                  </span>
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
