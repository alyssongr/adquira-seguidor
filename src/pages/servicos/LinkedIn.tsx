import { useState } from "react";
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

const LinkedIn = () => {
  const [connectionsQty, setConnectionsQty] = useState("");
  const [followersQty, setFollowersQty] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  const connectionsTotal = Number(connectionsQty) * PRICES.connections;
  const followersTotal = Number(followersQty) * PRICES.followers;

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

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* LinkedIn Conexões */}
            <Card className="border-2 hover:border-[#0A66C2] transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#0A66C2] rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  Conexões Profissionais
                </CardTitle>
                <CardDescription>
                  Amplie sua rede com conexões relevantes e reais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin-profile">URL do perfil</Label>
                  <Input
                    id="linkedin-profile"
                    placeholder="https://linkedin.com/in/seuperfil"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin-connections">Quantidade de conexões</Label>
                  <Input
                    id="linkedin-connections"
                    type="number"
                    placeholder="500"
                    value={connectionsQty}
                    onChange={(e) => setConnectionsQty(e.target.value)}
                  />
                </div>

                {connectionsQty && Number(connectionsQty) > 0 && (
                  <div className="p-4 bg-[#0A66C2]/10 rounded-lg border-2 border-[#0A66C2]/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-[#0A66C2] dark:text-sky-400">
                        R$ {connectionsTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {connectionsQty} conexões × R$ {PRICES.connections.toFixed(2)}
                    </div>
                  </div>
                )}

                <Button className="w-full" variant="hero" size="lg">
                  Comprar Agora
                </Button>
              </CardContent>
            </Card>

            {/* LinkedIn Seguidores */}
            <Card className="border-2 hover:border-sky-500 transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-sky-600 to-blue-500 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  Seguidores da Página
                </CardTitle>
                <CardDescription>
                  Impulsione a presença da sua empresa com seguidores qualificados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin-page">URL da página</Label>
                  <Input
                    id="linkedin-page"
                    placeholder="https://linkedin.com/company/suaempresa"
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin-followers">Quantidade de seguidores</Label>
                  <Input
                    id="linkedin-followers"
                    type="number"
                    placeholder="1000"
                    value={followersQty}
                    onChange={(e) => setFollowersQty(e.target.value)}
                  />
                </div>

                {followersQty && Number(followersQty) > 0 && (
                  <div className="p-4 bg-sky-500/10 rounded-lg border-2 border-sky-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                        R$ {followersTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {followersQty} seguidores × R$ {PRICES.followers.toFixed(2)}
                    </div>
                  </div>
                )}

                <Button className="w-full" variant="hero" size="lg">
                  Comprar Agora
                </Button>
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
