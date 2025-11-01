import { randomUUID } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

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

function parseRequestBody(body: unknown): CreatePaymentRequest | null {
  if (!body) {
    return null;
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body) as CreatePaymentRequest;
    } catch (error) {
      return null;
    }
  }

  if (Buffer.isBuffer(body)) {
    try {
      return JSON.parse(body.toString("utf-8")) as CreatePaymentRequest;
    } catch (error) {
      return null;
    }
  }

  return body as CreatePaymentRequest;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Método não permitido." });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    return response
      .status(500)
      .json({ error: "MP_ACCESS_TOKEN não configurado no servidor." });
  }

  const payload = parseRequestBody(request.body);

  if (!payload) {
    return response.status(400).json({ error: "JSON inválido." });
  }

  const { transaction_amount, description, payer, metadata } = payload;

  if (!transaction_amount || !description || !payer?.email) {
    return response.status(400).json({
      error: "Os campos transaction_amount, description e payer.email são obrigatórios.",
    });
  }

  try {
    const mpResponse = await fetch(MERCADO_PAGO_PAYMENTS_URL, {
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

    const data = (await mpResponse.json()) as Record<string, unknown> & {
      status?: string;
      id?: string | number;
      transaction_amount?: number;
      point_of_interaction?: {
        transaction_data?: {
          qr_code?: string;
          qr_code_base64?: string;
          ticket_url?: string;
        };
      };
    };

    if (!mpResponse.ok) {
      const mpError = data as unknown as MercadoPagoError;
      const details = mpError?.cause
        ?.map((item) => item?.description)
        .filter(Boolean)
        .join("; ");

      return response.status(mpResponse.status).json({
        error:
          mpError?.message ??
          mpError?.error ??
          "Falha ao criar pagamento no Mercado Pago.",
        details,
      });
    }

    const transactionData = data?.point_of_interaction?.transaction_data;

    return response.status(201).json({
      id: data?.id,
      status: data?.status,
      amount: data?.transaction_amount,
      qr_code: transactionData?.qr_code,
      qr_code_base64: transactionData?.qr_code_base64,
      ticket_url: transactionData?.ticket_url,
      raw: data,
    });
  } catch (error) {
    console.error("Erro ao criar pagamento PIX", error);

    return response
      .status(500)
      .json({ error: "Erro inesperado ao comunicar com o Mercado Pago." });
  }
}
