import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Instagram, Send, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSuccess(true);
    toast.success("Mensagem enviada com sucesso!");
  };

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Fale Conosco
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Entre em Contato
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tem alguma dúvida ou precisa de ajuda? 
              Nossa equipe está pronta para atender você.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-3xl p-8">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nome
                    </label>
                    <Input
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      E-mail
                    </label>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Mensagem
                    </label>
                    <Textarea
                      placeholder="Como podemos ajudar?"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      disabled={isLoading}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="cta"
                    size="xl"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Recebemos sua mensagem e responderemos em breve.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                  >
                    Enviar Nova Mensagem
                  </Button>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Canais de Atendimento
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-green-500 transition-colors">
                        WhatsApp
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Resposta rápida em horário comercial
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/adquiraseguidor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-pink-500/10 rounded-xl border border-pink-500/20 hover:bg-pink-500/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <Instagram className="w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-pink-500 transition-colors">
                        Instagram
                      </p>
                      <p className="text-sm text-muted-foreground">
                        @adquiraseguidor
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:contato@adquiraseguidor.com"
                    className="flex items-center gap-4 p-4 bg-primary/10 rounded-xl border border-primary/20 hover:bg-primary/20 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        E-mail
                      </p>
                      <p className="text-sm text-muted-foreground">
                        contato@adquiraseguidor.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Horário de Atendimento
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Segunda a Sexta</span>
                    <span className="text-foreground font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sábado</span>
                    <span className="text-foreground font-medium">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domingo</span>
                    <span className="text-muted-foreground">Fechado</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * Os pedidos são processados automaticamente 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contato;
