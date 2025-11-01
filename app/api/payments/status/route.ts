import { NextRequest, NextResponse } from "next/server";

const MERCADO_PAGO_PAYMENTS_URL = "https://api.mercadopago.com/v1/payments";

export async function GET(request: NextRequest) {
  const accessToken = process.env.MP_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "MP_ACCESS_TOKEN não configurado no servidor." },
      { status: 500 },
    );
  }

  const paymentId = request.nextUrl.searchParams.get("id");

  if (!paymentId) {
    return NextResponse.json({ error: "Parâmetro 'id' é obrigatório." }, { status: 400 });
  }

  try {
    const response = await fetch(`${MERCADO_PAGO_PAYMENTS_URL}/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.message ?? data?.error ?? "Falha ao consultar status do pagamento.",
          details: data?.cause,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(
      {
        id: data?.id,
        status: data?.status,
        detail: data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(`Erro ao consultar pagamento ${paymentId}`, error);

    return NextResponse.json(
      { error: "Erro inesperado ao consultar o status do pagamento." },
      { status: 500 },
    );
  }
}
