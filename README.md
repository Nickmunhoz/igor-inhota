# Site — Igor Inhota · Nutricionista

Landing page (one-page) profissional. HTML/CSS/JS puro, sem build, pronta para deploy na Vercel.

## Como visualizar
Dê **duplo clique** em `index.html` — abre direto no navegador. Não precisa instalar nada.

## Onde colocar as fotos
Salve as 3 fotos enviadas na pasta `assets/img/` com **exatamente** estes nomes:

| Arquivo | Foto | Onde aparece |
|---------|------|--------------|
| `igor-hero.png`  | Braços cruzados (camisa preta)   | Hero (topo) |
| `igor-sobre.png` | Jaleco branco (sorrindo)         | Seção Sobre |
| `igor-cta.png`   | Braços cruzados (mesma do Hero)  | CTA final |

> **Otimização (WebP) — recomendado antes de publicar:** os PNGs têm ~1,2 MB cada.
> 1. Acesse https://squoosh.app, abra cada foto, escolha **WebP** (qualidade ~80) e baixe.
> 2. Salve como `igor-hero.webp`, `igor-sobre.webp`, `igor-cta.webp` em `assets/img/`.
> 3. Troque cada `<img src="...png">` pelo bloco `<picture>` (ou me avise que eu troco):
>
> ```html
> <picture>
>   <source srcset="assets/img/igor-hero.webp" type="image/webp" />
>   <img src="assets/img/igor-hero.png" alt="..." width="560" height="700" />
> </picture>
> ```

## Estrutura
```
site-igor-inhota/
├── index.html                  ← página principal
├── politica-de-privacidade.html  ← página legal (LGPD)
├── assets/
│   ├── css/styles.css          ← estilos + paleta (design tokens no topo)
│   ├── js/main.js              ← interações
│   └── img/                    ← fotos aqui
└── README.md
```

## Paleta (definida em `styles.css` → `:root`)
- Verde Vitalidade `#2D5A37`
- Branco Linho `#F9F9F6`
- Areia Quartzo `#E2DCD3`
- Cinza Grafite `#2B2D2F`
- Ouro Damasco `#D4A373`

## Dados do profissional
Igor Inhota · CRN 81663 · WhatsApp +55 17 98807-3255 · Barretos-SP

## Itens marcados com `TODO` / "placeholder"
Textos, números e depoimentos são **placeholders realistas** — procure por `TODO`
no HTML para substituir pelo conteúdo real antes de publicar.
