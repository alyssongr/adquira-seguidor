import { MessageCircle, Mail, BookOpen, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "Como funciona a entrega dos seguidores?",
    answer: "A entrega é gradual e natural, simulando crescimento orgânico. Isso protege sua conta de qualquer problema. O prazo varia conforme o plano escolhido, mas geralmente inicia em poucas horas.",
  },
  {
    question: "Preciso fornecer minha senha?",
    answer: "Nunca! Você só precisa informar seu @ de usuário (nome de perfil). Jamais pedimos senha ou qualquer dado de acesso à sua conta.",
  },
  {
    question: "Os seguidores são reais?",
    answer: "Sim! Trabalhamos apenas com perfis reais e ativos. Não utilizamos bots ou contas fake. Isso garante engajamento autêntico e protege sua conta.",
  },
  {
    question: "Como funciona a reposição?",
    answer: "Se houver qualquer queda de seguidores durante o período de garantia do seu plano, repomos automaticamente sem custo adicional.",
  },
  {
    question: "Posso cancelar meu plano a qualquer momento?",
    answer: "Sim! Não temos fidelidade. Você pode cancelar quando quiser através do painel de controle ou entrando em contato com nosso suporte.",
  },
  {
    question: "Quais formas de pagamento aceitam?",
    answer: "Aceitamos PIX (confirmação instantânea) e cartão de crédito em até 12x. Todos os pagamentos são processados de forma segura e criptografada.",
  },
  {
    question: "Minha conta pode ser banida?",
    answer: "Não! Nosso método de entrega gradual simula crescimento natural, respeitando todas as diretrizes das plataformas. Nunca tivemos casos de banimento.",
  },
  {
    question: "Como acompanho meu pedido?",
    answer: "Você tem acesso a um painel de controle completo onde pode acompanhar em tempo real a entrega dos seus pedidos e o status de cada serviço.",
  },
  {
    question: "Posso comprar para várias contas?",
    answer: "Sim! Você pode gerenciar múltiplas contas através do mesmo painel. Ideal para agências e gestores de redes sociais.",
  },
  {
    question: "Há garantia de satisfação?",
    answer: "Sim! Oferecemos 7 dias de garantia. Se não estiver satisfeito, devolvemos seu dinheiro sem perguntas.",
  },
  {
    question: "Como funciona o suporte?",
    answer: "Temos suporte via WhatsApp (prioritário), e-mail e chat no site. Nossos planos profissionais e enterprise têm suporte prioritário com resposta em minutos.",
  },
  {
    question: "Quanto tempo demora para ver resultados?",
    answer: "Os primeiros resultados aparecem em poucas horas após a confirmação do pagamento. A entrega completa varia de acordo com o plano escolhido.",
  },
  {
    question: "Posso fazer upgrade do meu plano?",
    answer: "Sim! Você pode fazer upgrade a qualquer momento e pagar apenas a diferença proporcional ao período restante.",
  },
  {
    question: "Vocês trabalham com todas as redes sociais?",
    answer: "Sim! Atendemos Instagram, TikTok, YouTube, Twitter (X), Facebook e outras plataformas. Consulte-nos sobre redes específicas.",
  },
  {
    question: "É seguro para minha conta comercial?",
    answer: "Totalmente seguro! Muitos de nossos clientes são empresas e marcas. Respeitamos todas as políticas comerciais das plataformas.",
  },
];

const Suporte = () => {
  const whatsappNumber = "5511987654321";
  const whatsappMessage = "Olá! Preciso de ajuda com os serviços da Adquira Seguidor.";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Central de Ajuda
            </h1>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Tire suas dúvidas ou fale com nosso time de suporte
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-12 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="hover-lift border-2 hover:border-primary transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-4">Resposta em minutos</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="w-full">Abrir Chat</Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="hover-lift border-2 hover:border-primary transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">E-mail</h3>
                  <p className="text-sm text-muted-foreground mb-4">Resposta em até 24h</p>
                  <a href="mailto:suporte@adquiraseguidor.com.br">
                    <Button size="sm" variant="outline" className="w-full">Enviar E-mail</Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="hover-lift border-2 hover:border-primary transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-bold mb-2">Base de Conhecimento</h3>
                  <p className="text-sm text-muted-foreground mb-4">Guias e tutoriais</p>
                  <Button size="sm" variant="outline" className="w-full">Ver Artigos</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
              <p className="text-muted-foreground">
                Encontre respostas rápidas para as dúvidas mais comuns
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border-2 border-border rounded-lg px-6 hover:border-primary transition-colors"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center bg-card p-8 rounded-2xl border-2 border-border">
              <h3 className="text-xl font-bold mb-2">Não encontrou sua resposta?</h3>
              <p className="text-muted-foreground mb-6">
                Nossa equipe está pronta para ajudar você!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Falar no WhatsApp
                  </Button>
                </a>
                <a href="/contato">
                  <Button size="lg" variant="outline">
                    <Mail className="w-5 h-5 mr-2" />
                    Enviar E-mail
                  </Button>
                </a>
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

export default Suporte;
