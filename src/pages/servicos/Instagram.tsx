import { useCallback, useEffect, useMemo, useState } from "react";
import { Instagram as InstagramIcon, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const MERCADO_PAGO_ACCESS_TOKEN = "APP_USR-4490289128523870-103123-bcba371c4b63b801558dc0ab37559d69-514189289";
const SMM_API_KEY = "7370bc15c4240eef061c03a6901741d8";
const SMM_LIKES_SERVICE_ID = "8952";

const PRICES = {
  seguidores: 0.1,
  curtidas: 0.05,
  visualizacoes: 0.03,
};

const SERVICES = [
  {
    id: "seguidores",
    name: "Seguidores Reais",
    description: "Aumente sua base de seguidores com perfis reais e engajados",
    gradient: "from-purple-600 via-pink-600 to-orange-500",
    accentBorder: "border-purple-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(168,85,247,0.45)]",
    summaryGradient: "from-purple-500/10 to-pink-500/10",
    summaryBorder: "border-purple-500/20",
    priceText: "text-purple-600 dark:text-purple-400",
    unitLabel: "seguidores",
    icon: InstagramIcon,
    inputs: [
      {
        id: "account",
        label: "Nome da conta Instagram",
        placeholder: "@seuinstagram",
        type: "text",
      },
      {
        id: "quantity",
        label: "Quantidade de seguidores",
        placeholder: "1000",
        type: "number",
        isQuantity: true,
      },
    ],
  },
  {
    id: "curtidas",
    name: "Curtidas Premium",
    description: "Mais curtidas para destacar suas publicações",
    gradient: "from-pink-600 to-orange-500",
    accentBorder: "border-pink-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(236,72,153,0.45)]",
    summaryGradient: "from-pink-500/10 to-orange-500/10",
    summaryBorder: "border-pink-500/20",
    priceText: "text-pink-600 dark:text-pink-400",
    unitLabel: "curtidas",
    icon: InstagramIcon,
    inputs: [
      {
        id: "postUrl",
        label: "URL da publicação",
        placeholder: "https://instagram.com/p/...",
        type: "text",
      },
      {
        id: "quantity",
        label: "Quantidade de curtidas",
        placeholder: "500",
        type: "number",
        isQuantity: true,
      },
    ],
  },
  {
    id: "visualizacoes",
    name: "Visualizações Turbo",
    description: "Impulsione a entrega de Reels e Stories com visualizações reais",
    gradient: "from-orange-500 to-purple-500",
    accentBorder: "border-orange-500",
    accentShadow: "shadow-[0_20px_45px_-12px_rgba(249,115,22,0.45)]",
    summaryGradient: "from-orange-500/10 to-purple-500/10",
    summaryBorder: "border-orange-500/20",
    priceText: "text-orange-600 dark:text-orange-400",
    unitLabel: "visualizações",
    icon: InstagramIcon,
    inputs: [
      {
        id: "contentUrl",
        label: "URL do conteúdo",
        placeholder: "https://instagram.com/reel/...",
        type: "text",
      },
      {
        id: "quantity",
        label: "Quantidade de visualizações",
        placeholder: "5000",
        type: "number",
        isQuantity: true,
      },
    ],
  },
];

type ServiceField = (typeof SERVICES)[number]["inputs"][number];

const Instagram = () => {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [formData, setFormData] = useState(() =>
    SERVICES.reduce<Record<string, Record<string, string>>>((acc, service) => {
      acc[service.id] = service.inputs.reduce<Record<string, string>>((fields, field) => {
        fields[field.id] = "";
        return fields;
      }, {});
      return acc;
    }, {}),
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<{
    id: string;
    qrCode: string;
    qrCodeBase64: string;
    amount: number;
  } | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "approved" | "failed" | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [orderRequested, setOrderRequested] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [purchaseContext, setPurchaseContext] = useState<{
    serviceId: string;
    link: string;
    quantity: number;
  } | null>(null);

  const service = useMemo(() => SERVICES.find((item) => item.id === selectedService) ?? SERVICES[0], [selectedService]);
  const ActiveIcon = service.icon;

  const handleChange = (serviceId: string, field: ServiceField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field.id]: value,
      },
    }));
  };

  const quantityField = service.inputs.find((input) => input.isQuantity);
  const quantityValue = quantityField ? Number(formData[service.id][quantityField.id] || 0) : 0;
  const total = quantityField ? quantityValue * PRICES[service.id as keyof typeof PRICES] : 0;
  const paymentStatusLabel =
    paymentStatus === "approved"
      ? "Pagamento aprovado"
      : paymentStatus === "failed"
        ? "Pagamento não aprovado"
        : "Aguardando pagamento PIX";
  const paymentStatusVariant =
    paymentStatus === "approved"
      ? "default"
      : paymentStatus === "failed"
        ? "destructive"
        : "secondary";

  const resetPaymentState = useCallback(() => {
    setPaymentInfo(null);
    setPaymentStatus(null);
    setPaymentId(null);
    setOrderRequested(false);
    setOrderId(null);
    setPurchaseContext(null);
    setCopyFeedback(null);
  }, []);

  const handlePurchase = async () => {
    if (service.id !== "curtidas") {
      setError("No momento, o pagamento está disponível apenas para o serviço de curtidas do Instagram.");
      return;
    }

    const postUrl = formData[service.id]?.postUrl?.trim();

    if (!postUrl) {
      setError("Informe a URL da publicação do Instagram.");
      return;
    }

    if (!quantityValue || quantityValue <= 0) {
      setError("Informe uma quantidade válida de curtidas.");
      return;
    }

    if (!Number.isFinite(total) || total <= 0) {
      setError("Não foi possível calcular o valor do pedido.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setCopyFeedback(null);
    setOrderRequested(false);
    setOrderId(null);

    try {
      const response = await fetch("https://api.mercadopago.com/v1/payments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction_amount: Number(total.toFixed(2)),
          description: `Compra de ${quantityValue} curtidas no Instagram`,
          payment_method_id: "pix",
          payer: {
            email: "cliente@example.com",
            first_name: "Cliente",
            last_name: "Instagram",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Não foi possível gerar o pagamento. Tente novamente em instantes.");
      }

      const data = await response.json();
      const transactionData = data?.point_of_interaction?.transaction_data;

      if (!transactionData?.qr_code || !transactionData?.qr_code_base64) {
        throw new Error("A resposta do Mercado Pago não contém as informações do PIX.");
      }

      setPaymentInfo({
        id: String(data.id),
        qrCode: transactionData.qr_code,
        qrCodeBase64: transactionData.qr_code_base64,
        amount: Number(data.transaction_amount ?? total),
      });
      setPaymentStatus("pending");
      setPaymentId(String(data.id));
      setPurchaseContext({
        serviceId: service.id,
        link: postUrl,
        quantity: quantityValue,
      });
    } catch (paymentError) {
      console.error(paymentError);
      setError(paymentError instanceof Error ? paymentError.message : "Erro inesperado ao gerar o PIX.");
      resetPaymentState();
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    setError(null);
    resetPaymentState();
  }, [resetPaymentState, selectedService]);

  useEffect(() => {
    if (!paymentId || paymentStatus !== "pending") {
      return;
    }

    const intervalId = window.setInterval(async () => {
      try {
        const statusResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
          },
        });

        if (!statusResponse.ok) {
          throw new Error("Não foi possível verificar o status do pagamento.");
        }

        const statusData = await statusResponse.json();
        const status = statusData?.status as string | undefined;

        if (!status) {
          return;
        }

        if (status === "approved") {
          clearInterval(intervalId);
          setPaymentStatus("approved");
        } else if (["rejected", "cancelled", "refunded", "charged_back"].includes(status)) {
          clearInterval(intervalId);
          setPaymentStatus("failed");
          setError("O pagamento não foi aprovado. Tente novamente ou escolha outro método.");
        }
      } catch (statusError) {
        console.error(statusError);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [paymentId, paymentStatus]);

  useEffect(() => {
    const submitOrder = async () => {
      if (!purchaseContext || paymentStatus !== "approved" || orderRequested) {
        return;
      }

      if (purchaseContext.serviceId !== "curtidas") {
        return;
      }

      setOrderRequested(true);

      try {
        const params = new URLSearchParams({
          key: SMM_API_KEY,
          action: "add",
          service: SMM_LIKES_SERVICE_ID,
          link: purchaseContext.link,
          quantity: String(purchaseContext.quantity),
        });

        const orderResponse = await fetch("https://smmcost.com/api/v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });

        if (!orderResponse.ok) {
          throw new Error("Não foi possível registrar seu pedido no painel de serviços.");
        }

        const orderData = await orderResponse.json();

        if (!orderData?.order) {
          throw new Error("O painel retornou uma resposta inesperada. Entre em contato com o suporte.");
        }

        setOrderId(String(orderData.order));
      } catch (orderError) {
        console.error(orderError);
        setError(orderError instanceof Error ? orderError.message : "Erro ao registrar o pedido no fornecedor.");
      }
    };

    submitOrder();
  }, [orderRequested, paymentStatus, purchaseContext]);

  const handleCopyPixCode = async () => {
    if (!paymentInfo?.qrCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(paymentInfo.qrCode);
      setCopyFeedback("Código PIX copiado!");
    } catch (copyError) {
      console.error(copyError);
      setCopyFeedback("Não foi possível copiar automaticamente. Copie manualmente o código abaixo.");
    }
  };

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

          <div className="max-w-5xl mx-auto space-y-8">
            <Card className="border-2 border-border/40 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Escolha o tipo de serviço</CardTitle>
                <CardDescription>
                  Selecione abaixo o formato ideal para sua estratégia no Instagram
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {SERVICES.map((serviceOption) => {
                    const Icon = serviceOption.icon;
                    const isSelected = serviceOption.id === service.id;

                    return (
                      <button
                        key={serviceOption.id}
                        type="button"
                        onClick={() => setSelectedService(serviceOption.id)}
                        className={`group relative flex h-full flex-col gap-3 rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                          isSelected
                            ? `${serviceOption.accentBorder} ${serviceOption.accentShadow} bg-background`
                            : "border-transparent bg-muted/40 hover:border-border/60 hover:bg-muted/60 hover:shadow-lg"
                        }`}
                      >
                        <span
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${serviceOption.gradient} text-white shadow-lg shadow-black/10`}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <div className="space-y-1">
                          <span className="text-lg font-semibold">{serviceOption.name}</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {serviceOption.description}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                          <span>R$ {PRICES[serviceOption.id as keyof typeof PRICES].toFixed(2)} por {serviceOption.unitLabel}</span>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                              isSelected
                                ? `${serviceOption.accentBorder} bg-background`
                                : "border-border/80 bg-background/60"
                            }`}
                          >
                            Selecionar
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-2 bg-background/90 backdrop-blur-sm transition-all duration-200 ${service.accentBorder} ${service.accentShadow}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${service.gradient} text-white shadow-lg shadow-black/10`}
                  >
                    <ActiveIcon className="h-6 w-6" />
                  </span>
                  {service.name}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {service.inputs.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={`${service.id}-${field.id}`}>{field.label}</Label>
                      <Input
                        id={`${service.id}-${field.id}`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[service.id][field.id]}
                        onChange={(event) => handleChange(service.id, field, event.target.value)}
                      />
                    </div>
                  ))}
                </div>

                {quantityField && quantityValue > 0 && (
                  <div
                    className={`rounded-xl border-2 bg-gradient-to-r p-5 animate-fade-in ${service.summaryGradient} ${service.summaryBorder}`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold">Total estimado</span>
                      <span className={`text-3xl font-bold ${service.priceText}`}>R$ {total.toFixed(2)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {quantityValue} {service.unitLabel} × R$ {PRICES[service.id as keyof typeof PRICES].toFixed(2)}
                    </p>
                  </div>
                )}

                {error && paymentStatus !== "approved" && (
                  <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
                    <AlertTitle>Ops! Algo deu errado</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Todas as entregas são auditadas para garantir qualidade e segurança para sua conta.
                  </p>
                  <Button
                    className="w-full sm:w-auto"
                    variant="hero"
                    size="lg"
                    onClick={handlePurchase}
                    disabled={isProcessing || !quantityValue || quantityValue <= 0}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Gerando pagamento...
                      </span>
                    ) : (
                      "Comprar Agora"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {paymentInfo && (
              <Card className="border-2 border-emerald-500/40 bg-background/95 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-2xl">Pagamento via PIX</CardTitle>
                    <Badge variant={paymentStatusVariant} className="px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                      {paymentStatusLabel}
                    </Badge>
                  </div>
                  <CardDescription>
                    Escaneie o QR Code ou copie o código abaixo para concluir o pagamento. Assim que o PIX for confirmado,
                    seu pedido será enviado automaticamente ao fornecedor.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-4 text-sm text-emerald-900 dark:text-emerald-100">
                        <p className="font-semibold">Valor: R$ {paymentInfo.amount.toFixed(2)}</p>
                        <p className="mt-1 break-all text-xs text-muted-foreground">
                          ID do pagamento: {paymentInfo.id}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pix-code">Código PIX copia e cola</Label>
                        <Textarea id="pix-code" value={paymentInfo.qrCode} readOnly className="h-40 text-sm" />
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <Button variant="secondary" onClick={handleCopyPixCode} className="w-full sm:w-auto">
                            Copiar código PIX
                          </Button>
                          {copyFeedback && <span className="text-sm text-muted-foreground">{copyFeedback}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="rounded-2xl border-2 border-emerald-500/30 bg-white p-4 shadow-md">
                        <img
                          src={`data:image/png;base64,${paymentInfo.qrCodeBase64}`}
                          alt="QR Code do pagamento PIX"
                          className="h-56 w-56 object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Abra o app do seu banco, escolha pagar com PIX QR Code e aponte a câmera para este código.
                      </p>
                    </div>
                  </div>

                  {paymentStatus === "approved" && (
                    <Alert className="border-emerald-500/40 bg-emerald-500/10">
                      <AlertTitle>Pagamento aprovado!</AlertTitle>
                      <AlertDescription>
                        {orderId
                          ? `Seu pedido foi enviado para processamento. Número do pedido: ${orderId}.`
                          : "Registrando seu pedido junto ao fornecedor. Isso pode levar alguns segundos."}
                      </AlertDescription>
                    </Alert>
                  )}

                  {paymentStatus === "approved" && !orderId && error && (
                    <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
                      <AlertTitle>Não conseguimos registrar o pedido automaticamente</AlertTitle>
                      <AlertDescription>
                        {error} Informe o suporte com o ID do pagamento e a URL da publicação para que possamos finalizar
                        manualmente.
                      </AlertDescription>
                    </Alert>
                  )}

                  {paymentStatus === "failed" && (
                    <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
                      <AlertTitle>Pagamento não aprovado</AlertTitle>
                      <AlertDescription>
                        O PIX não foi confirmado. Caso o valor tenha sido debitado, entre em contato com o suporte e informe o
                        ID do pagamento acima.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Instagram;
