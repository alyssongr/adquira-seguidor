import { CheckCircle2, User, CreditCard, Rocket } from "lucide-react";

const steps = [
  {
    icon: CheckCircle2,
    title: "1. Escolha seu plano",
    description: "Selecione o serviço e a quantidade que você precisa",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: User,
    title: "2. Informe seu @perfil",
    description: "Digite apenas seu nome de usuário, sem senha necessária",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: CreditCard,
    title: "3. Pague com segurança",
    description: "PIX instantâneo ou cartão de crédito em até 12x",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Rocket,
    title: "4. Receba gradualmente",
    description: "Entrega natural e segura, como crescimento orgânico",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como Funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Processo simples e rápido para você começar a crescer agora mesmo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-center">
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-md hover-scale`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent -z-10"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="font-medium">Sem senha do seu perfil • 100% Seguro • Suporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
