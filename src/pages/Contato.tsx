import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    setFormData({ name: "", email: "", whatsapp: "", message: "" });
  };

  const whatsappNumber = "5511987654321";
  const whatsappMessage = "Olá! Gostaria de conversar sobre os serviços da Adquira Seguidor.";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Estamos aqui para ajudar! Escolha a melhor forma de falar conosco
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Fale Conosco</h2>
                  <p className="text-muted-foreground mb-8">
                    Nossa equipe está pronta para atender você. Escolha o canal que preferir!
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="hover-lift border-2 hover:border-primary transition-all">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-2">WhatsApp (Prioritário)</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Resposta rápida e atendimento humanizado
                        </p>
                        <a
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="default" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Abrir WhatsApp
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">E-mail</h3>
                        <a
                          href="mailto:contato@adquiraseguidor.com.br"
                          className="text-sm text-primary hover:underline"
                        >
                          contato@adquiraseguidor.com.br
                        </a>
                        <p className="text-xs text-muted-foreground mt-1">
                          Respondemos em até 24h
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Telefone</h3>
                        <p className="text-sm">(11) 98765-4321</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Seg-Sex: 9h às 18h
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover-lift">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Endereço</h3>
                        <p className="text-sm text-muted-foreground">
                          São Paulo, SP - Brasil
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-2">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nome Completo *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Seu nome"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          E-mail *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                          WhatsApp
                        </label>
                        <Input
                          id="whatsapp"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="(11) 98765-4321"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Mensagem *
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Digite sua mensagem..."
                          rows={5}
                          required
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="lgpd"
                          className="mt-1"
                          required
                        />
                        <label htmlFor="lgpd" className="text-xs text-muted-foreground">
                          Concordo com o tratamento dos meus dados conforme a{" "}
                          <a href="/lgpd" className="text-primary hover:underline">
                            Política de Privacidade (LGPD)
                          </a>
                        </label>
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                    </form>
                  </CardContent>
                </Card>
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

export default Contato;
