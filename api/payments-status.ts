import type { VercelRequest, VercelResponse } from "@vercel/node";

const MERCADO_PAGO_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Método não permitido." });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    return response
      .status(500)
      .json({ error: "MP_ACCESS_TOKEN não configurado no servidor." });
  }

  const paymentId = request.query?.id;

  if (!paymentId || (Array.isArray(paymentId) && paymentId.length === 0)) {
    return response.status(400).json({ error: "Parâmetro 'id' é obrigatório." });
  }

  const normalizedPaymentId = Array.isArray(paymentId) ? paymentId[0] : paymentId;

  try {
    const mpResponse = await fetch(`${MERCADO_PAGO_PAYMENTS_URL}/${normalizedPaymentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await mpResponse.json();

    if (!mpResponse.ok) {
      return response.status(mpResponse.status).json({
        error:
          data?.message ?? data?.error ?? "Falha ao consultar status do pagamento.",
        details: data?.cause,
      });
    }

    return response.status(200).json({
      id: data?.id,
      status: data?.status,
      detail: data,
    });
  } catch (error) {
    console.error(`Erro ao consultar pagamento ${normalizedPaymentId}`, error);

    return response
      .status(500)
      .json({ error: "Erro inesperado ao consultar o status do pagamento." });
  }
}
