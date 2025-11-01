import { useState } from "react";
import { Youtube } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PRICES = {
  inscritos: 0.15,
  curtidas: 0.08,
  visualizacoes: 0.03,
};

const YouTube = () => {
  const [inscritosQty, setInscritosQty] = useState("");
  const [curtidasQty, setCurtidasQty] = useState("");
  const [visualizacoesQty, setVisualizacoesQty] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const inscritosTotal = Number(inscritosQty) * PRICES.inscritos;
  const curtidasTotal = Number(curtidasQty) * PRICES.curtidas;
  const visualizacoesTotal = Number(visualizacoesQty) * PRICES.visualizacoes;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-red-900/20 dark:to-orange-900/20">
      <Header />
      <WhatsAppFloat />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-red-600 to-red-500 rounded-2xl flex items-center justify-center">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                YouTube
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cresça seu canal no YouTube com inscritos, curtidas e visualizações reais
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* YouTube Inscritos */}
            <Card className="border-2 hover:border-red-500 transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  YouTube Inscritos
                </CardTitle>
                <CardDescription>
                  Aumente sua base de inscritos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube-channel">URL do canal</Label>
                  <Input
                    id="youtube-channel"
                    placeholder="https://youtube.com/@seucanal"
                    value={channelUrl}
                    onChange={(e) => setChannelUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="youtube-inscritos">Quantidade de inscritos</Label>
                  <Input
                    id="youtube-inscritos"
                    type="number"
                    placeholder="1000"
                    value={inscritosQty}
                    onChange={(e) => setInscritosQty(e.target.value)}
                  />
                </div>

                {inscritosQty && Number(inscritosQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border-2 border-red-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                        R$ {inscritosTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {inscritosQty} inscritos × R$ {PRICES.inscritos.toFixed(2)}
                    </div>
                  </div>
                )}

                <Button className="w-full" variant="hero" size="lg">
                  Comprar Agora
                </Button>
              </CardContent>
            </Card>

            {/* YouTube Curtidas */}
            <Card className="border-2 hover:border-orange-500 transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-yellow-500 rounded-lg flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  YouTube Curtidas
                </CardTitle>
                <CardDescription>
                  Mais likes para seus vídeos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube-video">URL do vídeo</Label>
                  <Input
                    id="youtube-video"
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="youtube-curtidas">Quantidade de curtidas</Label>
                  <Input
                    id="youtube-curtidas"
                    type="number"
                    placeholder="500"
                    value={curtidasQty}
                    onChange={(e) => setCurtidasQty(e.target.value)}
                  />
                </div>

                {curtidasQty && Number(curtidasQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg border-2 border-orange-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
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

            {/* YouTube Visualizações */}
            <Card className="border-2 hover:border-yellow-500 transition-all hover:shadow-glow md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-yellow-600 to-orange-500 rounded-lg flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  YouTube Visualizações
                </CardTitle>
                <CardDescription>
                  Impulsione suas visualizações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube-video-views">URL do vídeo</Label>
                  <Input
                    id="youtube-video-views"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="youtube-views">Quantidade de visualizações</Label>
                  <Input
                    id="youtube-views"
                    type="number"
                    placeholder="10000"
                    value={visualizacoesQty}
                    onChange={(e) => setVisualizacoesQty(e.target.value)}
                  />
                </div>

                {visualizacoesQty && Number(visualizacoesQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border-2 border-yellow-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
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

export default YouTube;
