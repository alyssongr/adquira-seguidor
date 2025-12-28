import { Layout } from "@/components/Layout";
import { Target, Users, Zap, Shield, Award, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Missão",
    description: "Democratizar o crescimento nas redes sociais, oferecendo serviços acessíveis e de qualidade para criadores de conteúdo e empresas.",
  },
  {
    icon: Users,
    title: "Foco no Cliente",
    description: "Cada cliente é único. Nos dedicamos a entender suas necessidades e entregar resultados que superem expectativas.",
  },
  {
    icon: Zap,
    title: "Inovação",
    description: "Utilizamos tecnologia de ponta para garantir entregas rápidas, seguras e eficientes em todas as plataformas.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "A segurança do seu perfil é nossa prioridade. Utilizamos métodos seguros e discretos em todos os serviços.",
  },
];

const stats = [
  { value: "50.000+", label: "Clientes Satisfeitos" },
  { value: "1M+", label: "Serviços Entregues" },
  { value: "99.9%", label: "Taxa de Satisfação" },
  { value: "24/7", label: "Suporte Disponível" },
];

const Sobre = () => {
  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Sobre Nós
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Impulsionando o Sucesso nas <span className="text-primary">Redes Sociais</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Desde 2020, a Adquira Seguidor ajuda criadores de conteúdo, influenciadores 
                e empresas a alcançarem seus objetivos nas redes sociais. Com mais de 50.000 
                clientes satisfeitos, somos referência em qualidade e confiança.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Nossos Valores
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                O Que Nos Define
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(45,93%,58%,0.1)]"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                  Por Que Nos Escolher
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Diferenciais Adquira Seguidor
                </h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      Qualidade Garantida
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Trabalhamos apenas com perfis reais e ativos, garantindo engajamento 
                      genuíno e duradouro para seu perfil.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      Crescimento Sustentável
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Nossos serviços são projetados para crescimento gradual e orgânico, 
                      mantendo a integridade do seu perfil.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      Tecnologia Avançada
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Sistema 100% automatizado que processa pedidos 24 horas por dia, 
                      7 dias por semana, garantindo entregas rápidas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Sobre;
