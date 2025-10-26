import { CheckCircle2, User, CreditCard, Rocket, Shield, Clock, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent } from "@/components/ui/card";
import peopleHappy1 from "@/assets/people-happy-1.jpg";

const ComoFunciona = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Como Funciona
            </h1>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Processo simples, rápido e 100% seguro para crescer seu perfil
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
              {[
                {
                  icon: CheckCircle2,
                  title: "1. Escolha seu plano",
                  description: "Navegue pelos nossos serviços e selecione o plano que melhor atende suas necessidades de crescimento.",
                  color: "text-blue-500",
                  bgColor: "bg-blue-500/10",
                },
                {
                  icon: User,
                  title: "2. Informe seu @perfil",
                  description: "Digite apenas seu nome de usuário. Nunca pedimos senha ou informações sensíveis.",
                  color: "text-green-500",
                  bgColor: "bg-green-500/10",
                },
                {
                  icon: CreditCard,
                  title: "3. Pague com segurança",
                  description: "PIX instantâneo ou cartão de crédito em até 12x. Pagamento 100% seguro e criptografado.",
                  color: "text-purple-500",
                  bgColor: "bg-purple-500/10",
                },
                {
                  icon: Rocket,
                  title: "4. Receba gradualmente",
                  description: "Entrega natural e segura que simula crescimento orgânico, protegendo sua conta.",
                  color: "text-amber-500",
                  bgColor: "bg-amber-500/10",
                },
              ].map((step, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-md hover-scale`}>
                    <step.icon className={`w-10 h-10 ${step.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Image Section */}
            <div className="max-w-4xl mx-auto">
              <img
                src={peopleHappy1}
                alt="Pessoas felizes celebrando sucesso nas redes sociais"
                className="w-full rounded-2xl shadow-glow-lg"
              />
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Por Que Adquira Seguidor?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: "100% Seguro",
                  description: "Nunca pedimos sua senha. Todas as transações são criptografadas e seus dados protegidos.",
                },
                {
                  icon: Clock,
                  title: "Entrega Rápida",
                  description: "Resultados visíveis em poucas horas. Entrega gradual para parecer crescimento natural.",
                },
                {
                  icon: Heart,
                  title: "Perfis Reais",
                  description: "Trabalhamos apenas com contas reais e ativas para garantir engajamento autêntico.",
                },
                {
                  icon: CheckCircle2,
                  title: "Reposição Garantida",
                  description: "Caso haja qualquer queda, repomos automaticamente conforme as condições do seu plano.",
                },
                {
                  icon: User,
                  title: "Suporte Humanizado",
                  description: "Equipe disponível via WhatsApp, e-mail e chat. Respostas rápidas e soluções eficazes.",
                },
                {
                  icon: Rocket,
                  title: "Resultados Comprovados",
                  description: "Mais de 50.000 clientes satisfeitos. Taxa de satisfação de 98% em todas as nossas avaliações.",
                },
              ].map((item, index) => (
                <Card key={index} className="hover-lift border-2 hover:border-primary transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section Placeholder */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Veja Como é Fácil</h2>
              <p className="text-muted-foreground">
                Confira nosso vídeo tutorial e entenda todo o processo passo a passo
              </p>
            </div>
            <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center border-2 border-border">
              <div className="text-center">
                <Rocket className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Vídeo tutorial em breve</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ComoFunciona;
