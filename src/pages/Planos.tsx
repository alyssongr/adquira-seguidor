import { Check, Zap, Star, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Básico",
    icon: Zap,
    price: "R$ 49",
    period: "/mês",
    description: "Perfeito para quem está começando",
    features: [
      "1.000 seguidores/mês",
      "500 curtidas/mês",
      "Entrega em até 7 dias",
      "Suporte por e-mail",
      "Painel de controle",
    ],
    popular: false,
  },
  {
    name: "Profissional",
    icon: Star,
    price: "R$ 99",
    period: "/mês",
    description: "Ideal para influenciadores",
    features: [
      "5.000 seguidores/mês",
      "2.500 curtidas/mês",
      "500 comentários/mês",
      "Entrega em até 3 dias",
      "Suporte prioritário WhatsApp",
      "Reposição garantida",
      "Analytics detalhado",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Crown,
    price: "R$ 249",
    period: "/mês",
    description: "Para agências e marcas",
    features: [
      "15.000 seguidores/mês",
      "7.500 curtidas/mês",
      "2.000 comentários/mês",
      "5.000 visualizações/mês",
      "Entrega em 24h",
      "Gerente de conta dedicado",
      "Suporte 24/7 prioritário",
      "Reposição vitalícia",
      "API de integração",
      "Relatórios customizados",
    ],
    popular: false,
  },
];

const Planos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Planos e Preços
            </h1>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Escolha o plano ideal para o seu crescimento nas redes sociais
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={plan.name}
                  className={`relative hover-lift ${
                    plan.popular
                      ? "border-2 border-primary shadow-glow-lg"
                      : "border-2 hover:border-primary"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Mais Popular
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                      plan.popular ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <plan.icon className={`w-8 h-8 ${plan.popular ? "text-primary" : "text-foreground"}`} />
                    </div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full"
                      size="lg"
                    >
                      Assinar Agora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trust Section */}
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center space-y-4 bg-card p-8 rounded-2xl shadow-glow-md border border-border">
                <h3 className="text-2xl font-bold">Garantia de Satisfação</h3>
                <p className="text-muted-foreground max-w-lg">
                  Se você não estiver satisfeito nos primeiros 7 dias, devolvemos seu dinheiro sem perguntas.
                </p>
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Badge variant="outline" className="px-4 py-2">✓ Pagamento Seguro</Badge>
                  <Badge variant="outline" className="px-4 py-2">✓ PIX ou Cartão</Badge>
                  <Badge variant="outline" className="px-4 py-2">✓ Sem Fidelidade</Badge>
                  <Badge variant="outline" className="px-4 py-2">✓ Cancele Quando Quiser</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Posso trocar de plano?",
                  a: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.",
                },
                {
                  q: "Os seguidores são reais?",
                  a: "Sim, trabalhamos apenas com perfis reais e ativos para garantir engajamento orgânico.",
                },
                {
                  q: "Preciso fornecer minha senha?",
                  a: "Nunca! Você só precisa informar seu @ de usuário. Jamais pedimos senha.",
                },
                {
                  q: "Como funciona a reposição?",
                  a: "Se houver qualquer queda de seguidores, repomos automaticamente conforme seu plano.",
                },
              ].map((faq, index) => (
                <details key={index} className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors">
                  <summary className="font-medium cursor-pointer">{faq.q}</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Planos;
