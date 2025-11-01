import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

type CreatePaymentRequest = {
  transaction_amount?: number;
  description?: string;
  payer?: {
    email?: string;
    first_name?: string;
    last_name?: string;
  };
  metadata?: Record<string, unknown>;
};

type MercadoPagoError = {
  message?: string;
  error?: string;
  status?: number;
  cause?: Array<{ code?: string | number; description?: string }>;
};

const MERCADO_PAGO_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments";

export async function POST(request: NextRequest) {
  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "MP_ACCESS_TOKEN não configurado no servidor." },
      { status: 500 },
    );
  }

  let payload: CreatePaymentRequest;

  try {
    payload = (await request.json()) as CreatePaymentRequest;
  } catch (error) {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { transaction_amount, description, payer, metadata } = payload;

  if (!transaction_amount || !description || !payer?.email) {
    return NextResponse.json(
      { error: "Os campos transaction_amount, description e payer.email são obrigatórios." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(MERCADO_PAGO_PAYMENTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        transaction_amount,
        description,
        payment_method_id: "pix",
        payer,
        metadata,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const mpError = data as MercadoPagoError;
      const details = mpError?.cause?.map((item) => item?.description).filter(Boolean).join("; ");

      return NextResponse.json(
        {
          error: mpError?.message ?? mpError?.error ?? "Falha ao criar pagamento no Mercado Pago.",
          details,
        },
        { status: response.status },
      );
    }

    const transactionData = data?.point_of_interaction?.transaction_data;

    return NextResponse.json(
      {
        id: data?.id,
        status: data?.status,
        amount: data?.transaction_amount,
        qr_code: transactionData?.qr_code,
        qr_code_base64: transactionData?.qr_code_base64,
        ticket_url: transactionData?.ticket_url,
        raw: data,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro ao criar pagamento PIX", error);

    return NextResponse.json(
      { error: "Erro inesperado ao comunicar com o Mercado Pago." },
      { status: 500 },
    );
  }
}
