import { useState } from "react";
import { Facebook as FacebookIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PRICES = {
  seguidores: 0.09,
  curtidas: 0.04,
};

const Facebook = () => {
  const [seguidoresQty, setSeguidoresQty] = useState("");
  const [curtidasQty, setCurtidasQty] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [postUrl, setPostUrl] = useState("");

  const seguidoresTotal = Number(seguidoresQty) * PRICES.seguidores;
  const curtidasTotal = Number(curtidasQty) * PRICES.curtidas;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <Header />
      <WhatsAppFloat />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <FacebookIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Facebook
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fortaleça sua presença no Facebook com seguidores e curtidas
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Facebook Seguidores */}
            <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <FacebookIcon className="w-6 h-6 text-white" />
                  </div>
                  Facebook Seguidores
                </CardTitle>
                <CardDescription>
                  Aumente seus seguidores na sua página
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook-page">URL da página</Label>
                  <Input
                    id="facebook-page"
                    placeholder="https://facebook.com/suapagina"
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facebook-seguidores">Quantidade de seguidores</Label>
                  <Input
                    id="facebook-seguidores"
                    type="number"
                    placeholder="1000"
                    value={seguidoresQty}
                    onChange={(e) => setSeguidoresQty(e.target.value)}
                  />
                </div>

                {seguidoresQty && Number(seguidoresQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border-2 border-blue-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
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

            {/* Facebook Curtidas */}
            <Card className="border-2 hover:border-indigo-500 transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FacebookIcon className="w-6 h-6 text-white" />
                  </div>
                  Facebook Curtidas
                </CardTitle>
                <CardDescription>
                  Mais curtidas para suas publicações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook-post">URL da publicação</Label>
                  <Input
                    id="facebook-post"
                    placeholder="https://facebook.com/..."
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="facebook-curtidas">Quantidade de curtidas</Label>
                  <Input
                    id="facebook-curtidas"
                    type="number"
                    placeholder="500"
                    value={curtidasQty}
                    onChange={(e) => setCurtidasQty(e.target.value)}
                  />
                </div>

                {curtidasQty && Number(curtidasQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border-2 border-indigo-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Facebook;
