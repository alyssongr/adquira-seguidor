import { useState } from "react";
import { Instagram as InstagramIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PRICES = {
  seguidores: 0.10,
  curtidas: 0.05,
};

const Instagram = () => {
  const [seguidoresQty, setSeguidoresQty] = useState("");
  const [curtidasQty, setCurtidasQty] = useState("");
  const [accountName, setAccountName] = useState("");
  const [postUrl, setPostUrl] = useState("");

  const seguidoresTotal = Number(seguidoresQty) * PRICES.seguidores;
  const curtidasTotal = Number(curtidasQty) * PRICES.curtidas;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <Header />
      <WhatsAppFloat />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 rounded-2xl flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Instagram
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Impulsione seu perfil no Instagram com seguidores e curtidas reais
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Instagram Seguidores */}
            <Card className="border-2 hover:border-purple-500 transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <InstagramIcon className="w-6 h-6 text-white" />
                  </div>
                  Instagram Seguidores
                </CardTitle>
                <CardDescription>
                  Aumente sua base de seguidores com perfis reais e engajados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="account-name">Nome da conta Instagram</Label>
                  <Input
                    id="account-name"
                    placeholder="@seuinstagram"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seguidores-qty">Quantidade de seguidores</Label>
                  <Input
                    id="seguidores-qty"
                    type="number"
                    placeholder="1000"
                    value={seguidoresQty}
                    onChange={(e) => setSeguidoresQty(e.target.value)}
                  />
                </div>

                {seguidoresQty && Number(seguidoresQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border-2 border-purple-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
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

            {/* Instagram Curtidas */}
            <Card className="border-2 hover:border-pink-500 transition-all hover:shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-tr from-pink-600 to-orange-500 rounded-lg flex items-center justify-center">
                    <InstagramIcon className="w-6 h-6 text-white" />
                  </div>
                  Instagram Curtidas
                </CardTitle>
                <CardDescription>
                  Mais curtidas para destacar suas publicações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="post-url">URL da postagem</Label>
                  <Input
                    id="post-url"
                    placeholder="https://instagram.com/p/..."
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="curtidas-qty">Quantidade de curtidas</Label>
                  <Input
                    id="curtidas-qty"
                    type="number"
                    placeholder="500"
                    value={curtidasQty}
                    onChange={(e) => setCurtidasQty(e.target.value)}
                  />
                </div>

                {curtidasQty && Number(curtidasQty) > 0 && (
                  <div className="p-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-lg border-2 border-pink-500/20 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
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

export default Instagram;
