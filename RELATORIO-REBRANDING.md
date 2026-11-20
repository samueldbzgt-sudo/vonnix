# Entrega do rebranding VONNIX

Atualização da oferta: aplicado o novo arquivo “Oferta Black Friday com Armazenamento Inteligente.png”. O cronômetro usa ciclos de três horas e reinicia automaticamente, conforme solicitado pelo proprietário. O título “Contagem regressiva” descreve esse funcionamento. Os detalhes e as verificações estão na seção 18.

Atualização dos selos solicitados pelo proprietário: incluídos “SITE OFICIAL · LOJA VERIFICADA” acima do título e “Mais de 3 mil vendidos” à direita da nota. Os selos usam a paleta VONNIX e foram conferidos nas oito larguras. Os textos ficam em brand.storeBadge e socialProof.sold, em js/vonnix-config.js. A comprovação comercial dessas alegações continua pendente antes da publicação; nenhum status de aprovação foi alterado por esta mudança visual.

Atualização dos checkouts: os links fornecidos pelo proprietário foram configurados para os kits de 15, 30 e 45 sacos. Os botões seguem o kit selecionado, incluindo a barra fixa. A validação dos destinos foi feita com as requisições externas bloqueadas, sem acessar o provedor de pagamento ou realizar transações. Os detalhes estão na seção 17.

Atualização de rastreio: a página passou a ter busca por código ou e-mail, seleção de pedidos, status, progresso e histórico, com identidade VONNIX e uma API própria. O menu, o rodapé e o ícone de entrega levam ao rastreio. Consulte a seção 16 para cadastrar os pedidos reais e executar o serviço local.

Atualização solicitada pelo proprietário: removidas do título e da seção de avaliações as frases “Avaliações do produto na Nexbag.” e “Avaliações do produto publicadas originalmente na Nexbag.”. Notas, fotos, depoimentos e selos foram mantidos. A informação de origem continua registrada em js/vonnix-config.js; as referências a avisos visíveis nas etapas anteriores descrevem o histórico da implementação.

Data: 19/11/2026, America/Sao_Paulo. Trabalho realizado diretamente na pasta existente, sem criar outro projeto ou modificar a loja Shopify principal. A versão local está concluída para revisão; não houve publicação. Os botões de compra estão vinculados aos checkouts VONNIX fornecidos; as pendências de publicação continuam registradas separadamente.

Atualização das artes em 19/11/2026: aplicados os 7 arquivos novos fornecidos pelo proprietário, incluindo as seis artes de detalhes e o banner. A ordem, a estrutura, os kits e os preços permanecem preservados. Após a troca mais recente do banner, apenas IMG-15 ainda tem o nome Nexbag no texto incorporado e precisa de correção antes da publicação.

Atualização de fonte e avaliações em 19/11/2026: aplicada a fonte original Plus Jakarta Sans, com arquivos WOFF2 locais e licença OFL. Restaurados os cinco depoimentos, sete fotos e o resumo de notas recuperados dos arquivos originais. A indicação de verificação é qualificada como “Verificado na origem”. A contagem de vendas e o selo de loja verificada foram adicionados posteriormente por solicitação expressa do proprietário, conforme a atualização dos selos acima.

## 1. Arquivos modificados

- [index.html](index.html)
- [css/theme1.css](css/theme1.css)
- [css/kits.css](css/kits.css)
- [css/oferta-black.css](css/oferta-black.css)
- [js/latest.js](js/latest.js)
- [js/pixel.js](js/pixel.js)

Nesta atualização também foram alterados js/vonnix-config.js, index.html, js/revisao-imagens.js, revisao-imagens.html, tools/verificar.mjs, tools/validar-publicacao.mjs e os documentos de controle.

## 2. Arquivos criados e restauração

- [css/vonnix.css](css/vonnix.css)
- [js/vonnix-config.js](js/vonnix-config.js)
- [js/vonnix-icons.js](js/vonnix-icons.js)
- [js/vonnix.js](js/vonnix.js)
- [politica-frete.html](politica-frete.html)
- [pagamento-seguro.html](pagamento-seguro.html)
- [termos-uso.html](termos-uso.html)
- [trocas-reembolso.html](trocas-reembolso.html)
- [politica-privacidade.html](politica-privacidade.html)
- [politica-cookies.html](politica-cookies.html)
- [quem-somos.html](quem-somos.html)
- [rastreio.html](rastreio.html)
- [revisao-imagens.html](revisao-imagens.html)
- [css/revisao-imagens.css](css/revisao-imagens.css)
- [js/revisao-imagens.js](js/revisao-imagens.js)
- [tools/local-server.mjs](tools/local-server.mjs)
- [tools/browser.mjs](tools/browser.mjs)
- [tools/verificar.mjs](tools/verificar.mjs)
- [tools/validar-publicacao.mjs](tools/validar-publicacao.mjs)
- [.gitignore](.gitignore)
- [PENDENCIAS-IMAGENS.md](PENDENCIAS-IMAGENS.md)
- [RELATORIO-REBRANDING.md](RELATORIO-REBRANDING.md)

Os artefatos internos de auditoria ficam em .rebranding: scripts usados nesta execução, snapshots das políticas oficiais, dados originais, inventário de hashes e dimensões, resultados dos testes, capturas antes/depois e o ponto de restauração.

Ponto de restauração: [.rebranding/original-20261119-203109.zip](.rebranding/original-20261119-203109.zip). Contém todos os arquivos existentes antes do trabalho, incluindo HTML, três CSS, três JS, imagens e duas logos VONNIX. Nada anterior foi sobrescrito no arquivo de restauração.

SHA-256 do ZIP: 1c377f1ec63f596ed67edaea707926e1855c52625eae7e0a77c98b503ad3eeed.

Para recuperar, extraia o ZIP primeiro em outra pasta vazia e compare os arquivos. Evite extrair diretamente sobre uma versão que já tenha recebido novos trabalhos. Os scripts de transformação em .rebranding são registros desta execução e não devem ser executados novamente sobre a versão entregue.

Novos arquivos de imagem aplicados nesta atualização:

- [images/descricao-beneficios-vonnix.png](images/descricao-beneficios-vonnix.png)
- [images/descricao-funcionalidade-vonnix.png](images/descricao-funcionalidade-vonnix.png)
- [images/descricao-detalhes-vonnix.png](images/descricao-detalhes-vonnix.png)
- [images/descricao-medidas-vonnix.png](images/descricao-medidas-vonnix.png)
- [images/descricao-uso-vonnix.png](images/descricao-uso-vonnix.png)
- [images/descricao-conteudo-vonnix.png](images/descricao-conteudo-vonnix.png)
- [images/oferta-black-vonnix.png](images/oferta-black-vonnix.png)

Cópia anterior à troca das imagens: `.rebranding/antes-novas-artes-2026-11-20T00-23-31-102Z`. As sete cópias novas são idênticas aos arquivos de origem; os originais anteriores não foram modificados.

Nesta atualização foram incluídos assets/fonts/plus-jakarta-sans-latin.woff2, assets/fonts/plus-jakarta-sans-latin-ext.woff2 e assets/fonts/OFL.txt. Foram ajustados css/vonnix.css, os HTML, js/vonnix.js, js/vonnix-config.js, o catálogo interno, o servidor local e as verificações. Ponto de restauração desta alteração: .rebranding/antes-fonte-avaliacoes-2026-11-20T00-36-06-763Z.

## 3. Branding aplicado

Nome VONNIX no cabeçalho, menu, títulos, comparativo, FAQ, rodapé, textos alternativos e configuração dinâmica. Slogan “Produtos que facilitam sua rotina.” aplicado no menu e rodapé. Posicionamento generalista preservado no texto institucional. Mantidos os 13 blocos comerciais na ordem original e a coluna central de até 480 px, inclusive no desktop.

Title e descrição atualizados, Open Graph e Twitter Cards identificam a VONNIX. Favicon e ícone Apple usam a logo oficial, sem redesenho. Dados estruturados de Organization não contêm avaliações, preços ou certificações herdadas. A URL canônica permanece vazia até a definição do endereço final; noindex/nofollow permanece ativo.

## 4. Cores substituídas

Paleta central em [css/vonnix.css](css/vonnix.css): preto #151515, laranja #F56A00, branco #FFFFFF, fundo #F5F5F5, bordas #E5E5E5, grafite #333333 e hover #D95700. Os utilitários CSS existentes usam essas variáveis.

Azuis da interface (#165DAB, #1E93CE e #15719F), fundos azulados e os antigos verdes comerciais foram substituídos conforme a função do elemento. CTAs usam laranja e texto preto; cartões selecionados recebem borda laranja; menu e rodapé usam preto. Sucesso e erro do comparativo e as cores das bandeiras foram preservados. Fotografias e artes não receberam filtros.

## 5. Logos substituídas

- Cabeçalho: logo preta.png, 2172 × 724 px.
- Menu e rodapé: logo branca.png, 2172 × 724 px.
- Favicon, ícone Apple e compartilhamento: arquivo oficial da logo preta.
- images/logo.svg deixou de ser usado. Ambas as logos oficiais permanecem byte a byte iguais aos arquivos fornecidos, com proporções e transparência preservadas.

O favicon é a logo completa oficial; não foi criado um símbolo ou recorte novo. Imagens absolutas de compartilhamento serão resolvidas quando publication.canonicalUrl estiver configurada.

## 6. Institucional e políticas

Marca, domínio https://vonnix.store/ e e-mail contato@vonnix.store atualizados. As oito páginas locais existem e estão acessíveis no menu e/ou rodapé. A página de rastreio agora consulta a base privada própria da VONNIX por código ou e-mail e mantém o canal de atendimento oficial.

As políticas oficiais foram consultadas com HTTP 200 em 19/11/2026. As páginas locais contêm resumos fiéis e links para os textos integrais:

- [Frete e entrega](https://vonnix.store/policies/shipping-policy).
- [Termos de Serviço](https://vonnix.store/policies/terms-of-service), também usados para condições gerais de pagamento.
- [Trocas, devoluções e reembolsos](https://vonnix.store/policies/refund-policy).
- [Privacidade](https://vonnix.store/policies/privacy-policy), também usada como referência para cookies da loja principal.

Este funil não instala cookies publicitários ou pixels. Não foram copiados CNPJ, razão social, endereço ou telefone. Os campos business permanecem vazios até a confirmação expressamente exigida no briefing. A alegação “Só vendemos por aqui” foi substituída por apresentação institucional e link à loja oficial.

## 7. Scripts removidos ou desvinculados

| Integração anterior | Função identificada | Tratamento |
|---|---|---|
| Loader ofuscado UTMify e js/latest.js | Carregar UTMs, decorar links e integrar rastreamento, incluindo referência a vturb | Loader removido; arquivo ativo substituído por comentário inerte; original preservado no ZIP |
| Loader ofuscado e js/pixel.js | Eventos, identificação de visitante, IP e carregamento de pixels Meta/TikTok | Loader e ID 6ae68a07f1775c7de72a3cf0 desvinculados; arquivo substituído por comentário inerte |
| Cloudflare email-decode | Decodificar o e-mail antigo | Inclusão removida; contato passa a mailto direto; arquivo não é carregado |
| POST /api/checkout e allowlist Nexbag/Zedy | Solicitar e redirecionar para pagamento | Removidos; não existe requisição de checkout ao servidor anterior |
| Contador de três horas por visita | Reiniciar urgência após expiração e gravar prazo no localStorage | Substituído por ciclos globais de três horas, por solicitação do proprietário, com título neutro e marco temporal na configuração; sem armazenamento no navegador. O modo de data absoluta continua disponível |

Nenhum pixel novo foi instalado. Não havia integração VONNIX identificada nos scripts recebidos. Galeria, seletores e menu usam JavaScript local equivalente; nenhuma biblioteca necessária foi descartada sem substituir sua função.

## 8. Dependências externas

O HTML original carregava Google Fonts e dois loaders UTMify além das cópias locais. O pixel também referenciava tracking.utmify.com.br, connect.facebook.net, analytics.tiktok.com, ipapi.co, api.ipify.org, api6.ipify.org e jsdelivr. Essas dependências não são requisitadas pelo funil entregue. A fonte Plus Jakarta Sans é servida pelos dois arquivos WOFF2 locais em assets/fonts, sem requisições do visitante ao Google Fonts. A licença SIL Open Font License acompanha os arquivos; as fontes e sua origem estão registradas em .rebranding/fonte-jakarta.json.

Em funcionamento local, HTML, CSS, configuração, JavaScript e imagens são servidos pelo próprio projeto. Links institucionais externos são acionados apenas quando o visitante escolhe navegar. A política CSP bloqueia conexões de scripts e recursos externos; não é preciso servidor, API ou configuração remota da operação anterior.

## 9. Funcionalidades preservadas e corrigidas

- Galeria de 15 imagens, navegação circular, miniaturas e indicadores clicáveis, teclado e gesto horizontal.
- Três ofertas, kit15 selecionado inicialmente, quantidades, bombas, preços e fórmula de parcelamento originais.
- Atualização sincronizada do preço principal, oferta, barra fixa e especificações ao selecionar o kit.
- Mesma posição dos botões, benefícios, quatro passos, detalhes, especificações, comparativo, oferta, casos de uso, avaliações e FAQ.
- Menu lateral com fechamento por botão, fundo e Escape, foco controlado e retorno ao acionador.
- Barra fixa exibida após a rolagem prevista no código original e respeito à preferência por movimento reduzido.
- Seção de avaliações restaurada a pedido do proprietário: cinco depoimentos e sete fotos originais, nota e total recuperados do arquivo anterior, barras e carrossel. O texto visível identifica que são avaliações do produto publicadas na Nexbag, e a verificação é indicada como sendo da origem.

A versão inicial apresentava erros ao acessar elementos inexistentes (#miniFeatures), caminhos dinâmicos img/ incompatíveis com a pasta images/ e duplicação potencial da galeria. Esses problemas foram corrigidos. O novo código não busca dados externos para renderizar o produto.

## 10. Preços e condições recuperadas

Configuração única: [js/vonnix-config.js](js/vonnix-config.js), objeto offers.items. defaultKey = kit15; installments = 5; cardMultiplier = 1.17, exatamente a regra recuperada do JavaScript original. São valores para revisão comercial, ainda não autorizados para venda pública.

| Chave | Conteúdo | Preço de referência | À vista no Pix | Cada parcela em 5x |
|---|---|---|---|---|
| kit15 | 15 sacos / 1 bomba(s) | R$ 229,90 | R$ 96,83 | R$ 22,66 |
| kit30 | 30 sacos / 2 bomba(s) | R$ 459,80 | R$ 154,90 | R$ 36,25 |
| kit45 | 45 sacos / 3 bomba(s) | R$ 689,70 | R$ 174,90 | R$ 40,93 |

Preços riscados e descontos continuam na prévia para validação; a página não foi publicada. As 2.347 avaliações e a nota 4,9 recuperadas do original foram restauradas; a origem está registrada na configuração. Os textos “Mais de 3 mil vendidos” e “SITE OFICIAL · LOJA VERIFICADA” foram incluídos por solicitação do proprietário e permanecem sujeitos à comprovação comercial antes da publicação. Frete grátis geral e garantia adicional de 30 dias não foram restaurados. Os dados históricos estão preservados em .rebranding/dados-originais.json.

## 11. Checkouts e outras configurações

| Campo em js/vonnix-config.js | Uso |
|---|---|
| checkout.urls.kit15 / kit30 / kit45 | URLs fornecidas pelo proprietário para os três kits |
| checkout.allowedHosts | Host autorizado: seguro.vonnix.store |
| publication.canonicalUrl | URL HTTPS definitiva do funil, sem inferir o domínio principal |
| publication.*Approved | Confirmações comerciais, institucionais e de uso; políticas foram verificadas nas fontes oficiais |
| business | Razão social, CNPJ, endereço e telefone confirmados; só aparecem após a validação correspondente |
| assets[ID].path / approved | Troca individual da arte e registro de aprovação |
| promotion.mode | loop ativa os ciclos automáticos; os demais valores usam o modo de data fixa |
| promotion.durationSeconds / cycleAnchor | Duração de 10800 segundos e marco ISO 8601 comum a todas as visitas; o contador reinicia a cada três horas |
| promotion.endsAt | No modo de data fixa, usar uma data real em ISO 8601 com fuso horário; null oculta os contadores nesse modo |
| socialProof | Depoimentos, fotos e resumo restaurados a pedido do proprietário; source identifica a origem e verificationLabel qualifica o selo original |
| policies | Conteúdo local e URL da política oficial de cada tema |
| tracking.url | Link oficial complementar de rastreamento, opcional; vazio por padrão |
| tracking.apiBasePath | API própria no mesmo servidor: /api/rastreio |
| tracking.pollIntervalMs | Atualização da consulta: 45000 ms, interrompida quando entregue ou com a aba oculta |
| tracking.requestTimeoutMs | Tempo máximo de cada consulta: 15000 ms |

Os botões de compra ficam habilitados quando o kit selecionado tem uma URL HTTPS válida em um host autorizado. Um checkout ausente ou inválido impede o redirecionamento. O destino da operação anterior é rejeitado. As verificações de publicação e de indexação continuam separadas, sem marcar condições comerciais ou dados institucionais como aprovados. Nenhum parâmetro publicitário é encaminhado.

## 12. Testes realizados e limitações

Comando: node tools/verificar.mjs. Resultado: 118 verificações aprovadas, com 0 exceções JavaScript, 0 respostas HTTP de erro e 0 requisições a terceiros observadas. Evidência detalhada: [.rebranding/testes.json](.rebranding/testes.json).

| Largura solicitada | Rolagem horizontal | Cards sobrepostos | Coluna principal |
|---|---|---|---|
| 320 px | Não | Não | 305 px |
| 360 px | Não | Não | 345 px |
| 390 px | Não | Não | 375 px |
| 430 px | Não | Não | 415 px |
| 768 px | Não | Não | 480 px |
| 1024 px | Não | Não | 480 px |
| 1440 px | Não | Não | 480 px |
| 1920 px | Não | Não | 480 px |

O Chromium desktop reserva 15 px para a barra vertical nas larguras menores; a coluna ocupa a largura útil disponível e permanece limitada aos 480 px originais. Foram exercitados os três kits, preços, especificações, galeria, miniaturas, indicadores, teclado, abertura/fechamento do FAQ e menu, foco, bloqueio do checkout, sincronização dos contadores de três horas, fonte local carregada, avaliações restauradas, páginas locais e filtro de pendências no catálogo. A ordem das seis novas artes e o novo banner também foram verificados. Os 33 arquivos originais de imagem têm SHA-256 idêntico ao inventário inicial.

Novas capturas: [tipografia do título](.rebranding/fonte-titulo.png) e [avaliações restauradas](.rebranding/avaliacoes-restauradas.png).

Capturas: [antes mobile](.rebranding/antes-mobile.png), [antes desktop](.rebranding/antes-desktop.png), [depois 390 px](.rebranding/depois-390.png), [depois 1440 px](.rebranding/depois-1440.png), [página completa](.rebranding/depois-completa.png), [menu](.rebranding/depois-menu.png) e [rodapé](.rebranding/depois-rodape.png).

Não realizados: transações reais, autorização financeira, conferência de valores ou disponibilidade no provedor de checkout, consulta real de pedidos, navegação em aparelhos físicos, Safari e Firefox, validação cadastral do CNPJ, medição em hospedagem pública ou testes das artes futuras. Os testes de responsividade usam viewports reais do Chromium em execução local. Não se afirma aprovação legal ou comercial da operação pelo resultado técnico.

## 13. Artes substituídas e correções restantes

- IMG-10 — images/descricao-beneficios-vonnix.png — arte fornecida aplicada e revisada.
- IMG-11 — images/descricao-funcionalidade-vonnix.png — arte fornecida aplicada e revisada.
- IMG-12 — images/descricao-detalhes-vonnix.png — arte fornecida aplicada e revisada.
- IMG-13 — images/descricao-medidas-vonnix.png — arte fornecida aplicada e revisada.
- IMG-14 — images/descricao-uso-vonnix.png — arte fornecida aplicada e revisada.
- IMG-15 — images/descricao-conteudo-vonnix.png — arte fornecida aplicada; ainda contém “Seu kit Nexbag completo”.
- IMG-17 — images/oferta-black-vonnix-cronometro.png — nova arte fornecida aplicada e revisada; cronômetro na faixa reservada.

As sete novas artes estão em uso na prévia. Apenas IMG-15 continua sem aprovação para publicação por causa do texto incorporado. O catálogo [revisao-imagens.html](revisao-imagens.html) exibe os caminhos atuais, dimensões e essa pendência.

## 14. Dimensões das artes atuais e originais

| ID | Nova arte aplicada | Original preservado |
|---|---|---|
| IMG-10 | 1200 × 1200 px | 1200 × 1200 px |
| IMG-11 | 1254 × 1254 px | 1200 × 1200 px |
| IMG-12 | 1254 × 1254 px | 1200 × 1200 px |
| IMG-13 | 1254 × 1254 px | 1200 × 1200 px |
| IMG-14 | 1254 × 1254 px | 1200 × 1200 px |
| IMG-15 | 1254 × 1254 px | 1200 × 1200 px |
| IMG-17 | 1122 × 1402 px | 1122 × 1402 px |

O inventário completo e a correspondência com os arquivos de IMGS NOVAS estão em [PENDENCIAS-IMAGENS.md](PENDENCIAS-IMAGENS.md). As dimensões originais permanecem registradas em originalWidth e originalHeight na configuração.

## 15. Pendências antes da publicação

O comando node tools/validar-publicacao.mjs é uma conferência local; não publica nada. Nesta entrega ele deve encerrar com código 1 e listar 7 pendências esperadas:

- Validar preços, descontos, parcelamentos e meios de pagamento
- Confirmar especificações com o fornecedor
- Confirmar autorização dos recursos reutilizados
- Confirmar os dados empresariais obrigatórios com o proprietário
- Definir a URL definitiva do funil em publication.canonicalUrl
- Preencher somente dados empresariais confirmados em business
- Corrigir o texto incorporado da arte IMG-15: images/descricao-conteudo-vonnix.png

Os depoimentos do produto estão restaurados. Avaliações próprias da VONNIX poderão ser incluídas posteriormente com a atribuição correspondente. O contador está ativo em ciclos de três horas, conforme solicitado. O rastreamento consulta a API própria implementada, que precisa receber os registros reais dos pedidos por importação ou integração. O responsável deve confirmar os dados empresariais antes de reproduzi-los. Os dados técnicos recuperados, os preços riscados, descontos, parcelamentos, bandeiras e direitos de uso dos recursos precisam ser validados antes da disponibilização comercial.

Para abrir a prévia, execute node tools/local-server.mjs e acesse http://127.0.0.1:4173. O servidor atende apenas no próprio computador e bloqueia o acesso aos arquivos internos .rebranding e tools. Encerre com Ctrl+C. Não foram adicionados dependências npm, projeto Shopify, infraestrutura de hospedagem ou processo de publicação automática.

## 16. Página e API próprias de rastreio

A referência [página de rastreio](https://nexbagbrasil.shop/rastreio) foi consultada para mapear a busca por código/e-mail, seleção de pedidos, status, etapas e histórico. Seu HTML chama uma API vinculada à operação anterior. Essa API e seu banco de pedidos não acompanham o download da página. O projeto agora tem uma implementação própria, sem conexão com os pedidos da Nexbag.

Arquivos desta atualização:

- [rastreio.html](rastreio.html): interface, abas acessíveis, formulário, estados de consulta e resultado.
- [css/rastreio.css](css/rastreio.css): layout adaptado à VONNIX, fonte local e responsividade.
- [js/rastreio.js](js/rastreio.js): consulta por código/e-mail, histórico, progresso, cópia do código e atualização da consulta.
- [tools/tracking-store.mjs](tools/tracking-store.mjs): API própria, leitura da base privada, validação e limite de consultas.
- [tools/importar-rastreios.mjs](tools/importar-rastreios.mjs): importação local de registros reais, preservando cópia anterior quando houver dados.
- [tools/local-server.mjs](tools/local-server.mjs): atende os arquivos, a API e o endereço curto /rastreio.
- [tools/tracking-store.test.mjs](tools/tracking-store.test.mjs) e [tools/verificar-rastreio.mjs](tools/verificar-rastreio.mjs): validação da API e da interface.

A página está vinculada ao menu, rodapé e ícone de entrega do cabeçalho. As telas de código inexistente, e-mail sem pedidos, indisponibilidade e limite de consultas têm mensagens distintas. O status de entrega, as etapas e as datas vêm exclusivamente dos registros cadastrados. Campos de pagamento, PIX e taxas da operação anterior não fazem parte desta implementação.

### Executar e consultar

1. Execute `node tools/local-server.mjs` na raiz do projeto.
2. Abra http://127.0.0.1:4173/rastreio ou http://127.0.0.1:4173/rastreio.html.
3. Consulte pelo código de rastreio ou pelo e-mail associado a um pedido cadastrado. Links como `/rastreio?code=CODIGO-REAL` preenchem o código e iniciam a consulta.

O servidor local é necessário para a API. Abrir apenas o HTML, ou servir a pasta com um servidor exclusivamente estático, não executa o rastreio. Para hospedagem futura, será necessário manter o serviço Node ou conectar uma API compatível no mesmo domínio. Nenhuma publicação foi realizada.

### Cadastrar os pedidos reais

A base real fica em `.data/rastreios.json`. Não há pedidos de clientes nem registros de demonstração cadastrados nessa base. Sem registros, uma consulta retorna que o pedido não foi localizado.

1. Copie `.data/modelo-rastreio.json` para outro arquivo dentro de `.data`, por exemplo `.data/meus-rastreios.json`.
2. Preencha somente informações reais: código, e-mail da compra quando necessário, estado atual e, se disponíveis, etapas, histórico e datas. O modelo contém campos vazios e não pode ser importado como pedido válido até ser preenchido.
3. Confira sem gravar: `node tools/importar-rastreios.mjs .data/meus-rastreios.json --validar`.
4. Importe: `node tools/importar-rastreios.mjs .data/meus-rastreios.json`.

Cada `tracking_code` identifica um rastreio. Uma nova importação atualiza o mesmo código e preserva os demais registros. A versão anterior é copiada para `.data/backups` quando a base já contém pedidos. Use datas ISO 8601 com fuso horário. `milestones` recebe `short`, `completed` e `isCurrent`; `timeline` recebe `label`, `status`, `timestamp` e `isCurrent`. Listas vazias permanecem sem etapas ou eventos, sem criar movimentações.

Essa base permite rastrear os registros cadastrados, mas ainda não recebe automaticamente pedidos da plataforma de vendas nem eventos de transportadoras. Para essa automação, é necessário configurar o acesso da VONNIX à plataforma ou ao prestador responsável. Recarregar a consulta a cada 45 segundos apenas lê novamente os dados reais disponíveis na base.

### Contrato da API e dados privados

| Método e rota | Entrada | Resposta |
|---|---|---|
| GET /api/rastreio/:codigo | Código no caminho | Status, código, etapas e histórico cadastrados |
| POST /api/rastreio/by-email | JSON com o campo email | Lista dos códigos e estados associados ao e-mail |

A consulta por e-mail usa POST e não grava o e-mail no endereço da página, cookies ou armazenamento do navegador. As respostas não incluem e-mail do comprador, nome, endereço ou informações financeiras. A base `.data`, os backups e os artefatos `.rebranding` são bloqueados para acesso HTTP e ignorados no Git. A página não utiliza scripts ou APIs da operação anterior. A política local de privacidade foi atualizada para descrever a consulta de rastreio.

### Validação desta atualização

- API: 9 testes aprovados com `node --test tools/tracking-store.test.mjs`.
- Interface: 35 verificações aprovadas com `node tools/verificar-rastreio.mjs`, incluindo busca, resultado, histórico, entrega concluída, falhas, e-mail por POST e oito larguras de tela.
- Funil: 118 verificações de regressão aprovadas, sem exceções JavaScript, respostas HTTP inesperadas ou requisições a terceiros.
- Os dados utilizados nos testes ficam exclusivamente em `.rebranding`, sem importação para a base real.

Capturas: [mobile](.rebranding/rastreio-mobile.png) e [desktop](.rebranding/rastreio-desktop.png). Resultado técnico: [.rebranding/testes-rastreio.json](.rebranding/testes-rastreio.json). Ponto de restauração: `.rebranding/antes-rastreio-2026-11-20T00-53-43-766Z`.

## 17. Checkouts VONNIX configurados

| Kit | Produto no checkout | Link fornecido |
|---|---|---|
| 15 sacos | 51024891084997 | [Checkout de 15 sacos](https://seguro.vonnix.store/api/public/shopify?product=51024891084997&store=41507) |
| 30 sacos | 51024891117765 | [Checkout de 30 sacos](https://seguro.vonnix.store/api/public/shopify?product=51024891117765&store=41507) |
| 45 sacos | 51024891150533 | [Checkout de 45 sacos](https://seguro.vonnix.store/api/public/shopify?product=51024891150533&store=41507) |

As três URLs usam a loja 41507 e o host autorizado seguro.vonnix.store. A configuração fica em js/vonnix-config.js, em checkout.urls. Todos os botões usam o kit selecionado; a escolha inicial permanece kit15 e os preços não foram alterados. Ao retornar à página pelo navegador, os controles de kit e compra são reativados.

Verificação específica: `node tools/verificar-checkouts.mjs`, com 17 verificações aprovadas e zero exceções JavaScript. Foram capturadas as tentativas de redirecionamento dos três kits, incluindo a barra fixa, e bloqueadas antes do envio ao provedor. Não foram criados pedidos, preenchidos dados de pagamento ou efetuadas transações. Evidência: [.rebranding/testes-checkouts.json](.rebranding/testes-checkouts.json).

Os botões configurados funcionam na prévia local. A publicação permanece sem execução e sujeita às pendências comerciais, cadastrais e de imagens descritas na seção 15.

## 18. Nova arte e cronômetro

O arquivo fornecido “Oferta Black Friday com Armazenamento Inteligente.png” foi copiado sem alterações para images/oferta-black-vonnix-cronometro.png, com 1122 × 1402 px e SHA-256 idêntico. O banner anterior e o original continuam preservados. IMG-17 foi revisado e não contém mais o nome antigo.

O cronômetro foi colocado na faixa preta reservada na imagem, com números na paleta VONNIX e os rótulos HORAS, MINUTOS e SEGUNDOS. O título é “Contagem regressiva”. Por solicitação expressa do proprietário, a duração é de três horas e o ciclo reinicia automaticamente ao zerar. O marco temporal fica em promotion.cycleAnchor na configuração, mantendo os contadores sincronizados entre visitas e recarregamentos, sem cookies ou localStorage. Não foi definida uma data final de encerramento da oferta.

Validação específica: node tools/verificar-cronometro.mjs, com 21 verificações aprovadas. Foram conferidos início em 03:00:00, último segundo, reinício automático, ciclos posteriores, recarregamento e encaixe na faixa reservada em oito larguras, sem cobrir os benefícios da arte. A regressão geral também passou nas 118 verificações, sem exceções JavaScript, erros HTTP ou requisições externas.

Evidências: [testes do cronômetro](.rebranding/testes-cronometro.json) e [prévia do banner](.rebranding/banner-cronometro-548.png). O ponto de restauração desta alteração está indicado em .rebranding/restauracao-banner-cronometro.json. A página permanece local, sem publicação.
