# Integração com Mercado Pago

## Credenciais ativas para QR Code PIX

Utilize as credenciais abaixo nas integrações em produção do Instagram Likes:

- **Public Key:** `APP_USR-df384a3d-8908-41a9-a725-460ecac522e8`
- **Access Token:** `APP_USR-4490289128523870-103123-bcba371c4b63b801558dc0ab37559d69-514189289`
- **Client ID:** `4490289128523870`
- **Client Secret:** `2F54pWN7tHTYwcZxXmF7bmz9GnS1Qnh8`

> ⚠️ Guarde estas informações com segurança. Caso seja necessário substituir as credenciais, atualize apenas as variáveis de ambiente do backend (`MP_ACCESS_TOKEN`) e reinicie o servidor.

## Criar uma aplicação no Mercado Pago

1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers/), clique em **Entrar** e realize o login com a conta responsável pela integração.
2. Com a sessão ativa, acesse **Suas integrações** e clique em **Criar aplicação**.
3. Caso ainda não tenha realizado a verificação de identidade, conclua o processo solicitado na criação ou faça a reautenticação indicada.
4. Defina um nome com até 50 caracteres alfanuméricos para identificar a aplicação.
5. Em **Tipo de solução**, selecione **Pagamentos presenciais** (correspondente às vendas em lojas físicas).
6. Escolha **Código QR** como produto a ser integrado.
7. Aceite a Declaração de Privacidade, os Termos e condições e clique em **Criar aplicação**. Você será redirecionado para o painel da aplicação recém-criada.
8. No painel de **Suas integrações** é possível consultar, editar ou excluir aplicações sempre que necessário.

## Credenciais de teste

- Assim que a aplicação é criada, as credenciais de teste são geradas automaticamente.
- Utilize sempre o par **Public Key** e **Access Token** de teste para configurar e validar a integração em um ambiente seguro.
- Caso esteja trabalhando com uma aplicação existente, ative as credenciais de teste antes de usá-las.
- Para pagamentos via Código QR, trabalhe com o **Access Token** de teste correspondente.

Mantenha esta documentação atualizada ao criar novas credenciais ou alterar fluxos da integração com Mercado Pago.
