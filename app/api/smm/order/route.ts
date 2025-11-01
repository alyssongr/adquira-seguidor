import { NextRequest, NextResponse } from "next/server";

type OrderRequest = {
  service?: string;
  link?: string;
  quantity?: number;
  runs?: number;
  interval?: number;
  comments?: string;
};

const DEFAULT_SMM_API_URL = "https://smmcost.com/api/v2";

export async function POST(request: NextRequest) {
  const apiKey = process.env.SMM_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "SMM_API_KEY não configurado no servidor." },
      { status: 500 },
    );
  }

  let payload: OrderRequest;

  try {
    payload = (await request.json()) as OrderRequest;
  } catch (error) {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { service, link, quantity, runs, interval, comments } = payload;

  if (!service || !link || !quantity) {
    return NextResponse.json(
      { error: "Os campos service, link e quantity são obrigatórios." },
      { status: 400 },
    );
  }

  const apiUrl = process.env.SMM_API_URL || DEFAULT_SMM_API_URL;

  try {
    const params = new URLSearchParams({
      key: apiKey,
      action: "add",
      service,
      link,
      quantity: String(quantity),
    });

    if (runs) {
      params.append("runs", String(runs));
    }

    if (interval) {
      params.append("interval", String(interval));
    }

    if (comments) {
      params.append("comments", comments);
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.error ?? "Falha ao registrar o pedido no fornecedor SMM.",
          detail: data,
        },
        { status: response.status },
      );
    }

    if (!data?.order && !data?.orders) {
      return NextResponse.json(
        {
          error: "O fornecedor retornou uma resposta inesperada.",
          detail: data,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        order: data?.order,
        orders: data?.orders,
        raw: data,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro ao criar pedido no painel SMM", error);

    return NextResponse.json(
      { error: "Erro inesperado ao comunicar com o painel SMM." },
      { status: 500 },
    );
  }
}
