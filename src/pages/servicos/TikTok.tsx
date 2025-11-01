import { useState } from "react";
import { Music } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PRICES = {
  seguidores: 0.12,
  curtidas: 0.06,
  visualizacoes: 0.02,
};

const TikTok = () => {
  const [seguidoresQty, setSeguidoresQty] = useState("");
  const [curtidasQty, setCurtidasQty] = useState("");
  const [visualizacoesQty, setVisualizacoesQty] = useState("");
  const [accountName, setAccountName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const seguidoresTotal = Number(seguidoresQty) * PRICES.seguidores;
  const curtidasTotal = Number(curtidasQty) * PRICES.curtidas;
  const visualizacoesTotal = Number(visualizacoesQty) * PRICES.visualizacoes;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 via-teal-50 to-pink-50 dark:from-gray-900 dark:via-cyan-900/20 dark:to-pink-900/20">
      <Header />
      <WhatsAppFloat />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 via-teal-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-pink-600 bg-clip-text text-transparent">
                TikTok
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Faça seus vídeos viralizarem no TikTok com seguidores, curtidas e visualizações
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* TikTok Seguidores */}
            <Card className="border-2 hover:border-cyan-500 transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  TikTok Seguidores
                </CardTitle>
                <CardDescription>
                  Ganhe mais seguidores e destaque
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tiktok-account">Nome da conta TikTok</Label>
                  <Input
                    id="tiktok-account"
                    placeholder="@seutiktok"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tiktok-seguidores">Quantidade de seguidores</Label>
                  <Input
                    id="tiktok-seguidores"
                    type="number"
                    placeholder="1000"
                    value={seguidoresQty}
                    onChange={(e) => setSeguidoresQty(e.target.value)}
                  />
                </div>

                {seguidoresQty && Number(seguidoresQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-lg border-2 border-cyan-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                        R$ {seguidoresTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {seguidoresQty} seguidores × R$ {PRICES.seguidores.toFixed(2)}
                    </div>
                  </div>
                )}

                <Button className="w-full" variant="hero" size="lg">
                  Comprar Agora
                </Button>
              </CardContent>
            </Card>

            {/* TikTok Curtidas */}
            <Card className="border-2 hover:border-teal-500 transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-teal-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  TikTok Curtidas
                </CardTitle>
                <CardDescription>
                  Aumente o engajamento dos seus vídeos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tiktok-video">URL do vídeo</Label>
                  <Input
                    id="tiktok-video"
                    placeholder="https://tiktok.com/@..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tiktok-curtidas">Quantidade de curtidas</Label>
                  <Input
                    id="tiktok-curtidas"
                    type="number"
                    placeholder="500"
                    value={curtidasQty}
                    onChange={(e) => setCurtidasQty(e.target.value)}
                  />
                </div>

                {curtidasQty && Number(curtidasQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-teal-500/10 to-pink-500/10 rounded-lg border-2 border-teal-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                        R$ {curtidasTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {curtidasQty} curtidas × R$ {PRICES.curtidas.toFixed(2)}
                    </div>
                  </div>
                )}

                <Button className="w-full" variant="hero" size="lg">
                  Comprar Agora
                </Button>
              </CardContent>
            </Card>

            {/* TikTok Visualizações */}
            <Card className="border-2 hover:border-pink-500 transition-all hover:shadow-glow md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-pink-600 to-orange-500 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  TikTok Visualizações
                </CardTitle>
                <CardDescription>
                  Impulsione o alcance dos seus vídeos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tiktok-video-views">URL do vídeo</Label>
                  <Input
                    id="tiktok-video-views"
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tiktok-views">Quantidade de visualizações</Label>
                  <Input
                    id="tiktok-views"
                    type="number"
                    placeholder="5000"
                    value={visualizacoesQty}
                    onChange={(e) => setVisualizacoesQty(e.target.value)}
                  />
                </div>

                {visualizacoesQty && Number(visualizacoesQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-lg border-2 border-pink-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                        R$ {visualizacoesTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {visualizacoesQty} visualizações × R$ {PRICES.visualizacoes.toFixed(2)}
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

export default TikTok;
