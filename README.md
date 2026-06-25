# Meli Ads Proxy

Proxy CORS para a API de Product Ads do Mercado Livre.

## Deploy no Railway

1. Fork ou clone este repo
2. Acesse [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Selecione este repositório
4. Railway detecta Node.js automaticamente e faz o deploy

## Uso

Todas as chamadas para `api.mercadolibre.com` passam pelo proxy:

```
GET https://seu-proxy.railway.app/meli/advertising/advertisers?product_id=PADS
Headers:
  x-meli-token: SEU_ACCESS_TOKEN
  x-api-version: 2
```
