import { Zap, Shield, CreditCard, Headphones, TrendingUp, Clock } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Entrega Rápida",
    description: "Processamento automático. Seus serviços começam a ser entregues em minutos.",
  },
  {
    icon: CreditCard,
    title: "Pagamento via PIX",
    description: "Pague instantaneamente com PIX. Aprovação em segundos, sem esperar.",
  },
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Métodos seguros e discretos. Seu perfil está sempre protegido conosco.",
  },
  {
    icon: Headphones,
    title: "Suporte 24/7",
    description: "Equipe sempre pronta para ajudar você em qualquer dúvida ou problema.",
  },
  {
    icon: TrendingUp,
    title: "Engajamento Real",
    description: "Curtidas, seguidores e visualizações de perfis reais e ativos.",
  },
  {
    icon: Clock,
    title: "Disponível 24h",
    description: "Compre a qualquer hora. Sistema 100% automatizado e sempre online.",
  },
];

export function Benefits() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Por que nos escolher
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Benefícios Exclusivos
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Oferecemos a melhor experiência para impulsionar suas redes sociais
            com qualidade e segurança.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(45,93%,58%,0.1)] card-glow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
