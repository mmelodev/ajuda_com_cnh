import type { RoadMarking } from "../../types";

/**
 * Sinalização Horizontal: marcas pintadas no pavimento (linhas, faixas e
 * inscrições). Complementam placas e semáforos, mas ficam por último na
 * hierarquia de sinalização em caso de conflito.
 */
const horizontal: RoadMarking[] = [
  {
    id: "h-linha-continua-branca",
    name: "Linha Simples Contínua Branca",
    color: "branca",
    pattern: "continua",
    visual: "line",
    description:
      "Separa faixas de tráfego do mesmo sentido em trecho onde a mudança de faixa é perigosa ou proibida.",
    action: "Não mude de faixa nem ultrapasse enquanto essa linha estiver do seu lado.",
  },
  {
    id: "h-linha-tracejada-branca",
    name: "Linha Simples Tracejada Branca",
    color: "branca",
    pattern: "tracejada",
    visual: "line",
    description:
      "Separa faixas de tráfego do mesmo sentido em trecho onde é seguro mudar de faixa.",
    action: "Pode mudar de faixa, desde que sinalize e verifique que está seguro fazer a manobra.",
  },
  {
    id: "h-linha-continua-amarela",
    name: "Linha Simples Contínua Amarela",
    color: "amarela",
    pattern: "continua",
    visual: "line",
    description:
      "Separa fluxos de sentidos opostos em trecho perigoso para ultrapassagem (curvas, aclives, baixa visibilidade).",
    action: "Nunca ultrapasse nem cruze essa linha; veículos vêm de frente do outro lado.",
  },
  {
    id: "h-linha-tracejada-amarela",
    name: "Linha Simples Tracejada Amarela",
    color: "amarela",
    pattern: "tracejada",
    visual: "line",
    description:
      "Separa fluxos de sentidos opostos em trecho onde a ultrapassagem é permitida quando segura.",
    action: "Pode ultrapassar, mas só depois de confirmar que a pista está livre nos dois sentidos.",
  },
  {
    id: "h-linha-dupla-continua",
    name: "Linha Dupla Contínua Amarela",
    color: "amarela",
    pattern: "dupla-continua",
    visual: "line",
    description:
      "Separa fluxos de sentidos opostos em trecho de risco elevado, proibindo ultrapassagem para os dois lados da via.",
    action: "Não ultrapasse em nenhuma hipótese, esteja você de que lado estiver da via.",
  },
  {
    id: "h-linha-dupla-mista",
    name: "Linha Dupla Contínua/Tracejada Amarela",
    color: "amarela",
    pattern: "mista",
    visual: "line",
    description:
      "Linha dupla combinando um lado contínuo e outro tracejado: a permissão de ultrapassagem depende de qual lado é o seu.",
    action: "Só ultrapasse se a linha tracejada estiver do seu lado; se for a contínua, é proibido.",
  },
  {
    id: "h-faixa-pedestres",
    name: "Faixa de Pedestres",
    visual: "crosswalk",
    description:
      "Listras brancas largas que marcam o local prioritário e seguro para a travessia de pedestres.",
    action: "Pare antes da faixa sempre que houver pedestre atravessando ou prestes a entrar nela; nunca pare o veículo sobre ela.",
  },
  {
    id: "h-linha-retencao",
    name: "Linha de Retenção",
    visual: "retention-line",
    description:
      "Linha grossa e perpendicular à via, pintada antes de semáforos ou placas PARE, indicando onde o veículo deve parar.",
    action: "Pare exatamente antes dessa linha, nunca sobre ou depois dela.",
  },
  {
    id: "h-palavra-pare",
    name: 'Inscrição "PARE" no solo',
    visual: "text",
    visualText: "PARE",
    description: "Palavra pintada em letras grandes no pavimento, reforçando a mensagem da placa PARE.",
    action: "Pare o veículo antes dessa inscrição, com a mesma obrigatoriedade da placa R-1.",
  },
  {
    id: "h-area-cruzamento",
    name: "Área de Cruzamento",
    visual: "hatched",
    description:
      "Marcação em \"X\" ou hachurada pintada sobre cruzamentos, delimitando uma área que não pode ser bloqueada.",
    action: "Não avance para essa área se não houver espaço garantido para sair do outro lado, mesmo com o sinal verde.",
  },
  {
    id: "h-canalizacao",
    name: "Marcas de Canalização",
    visual: "hatched",
    description:
      "Faixas brancas diagonais (em forma de zebra) ou ilhas pintadas que organizam e direcionam o fluxo de veículos, sem serem faixas de circulação.",
    action: "Nunca trafegue, pare ou estacione sobre essas marcas; elas garantem espaço de segurança entre fluxos.",
  },
  {
    id: "h-faixa-exclusiva",
    name: "Faixa Exclusiva",
    visual: "exclusive-lane",
    description:
      "Faixa reservada para um tipo específico de veículo (ônibus, táxi ou bicicleta), geralmente destacada por cor e pictograma.",
    action: "Não circule nem estacione nessa faixa a menos que esteja autorizado a utilizá-la.",
  },
  {
    id: "h-setas-direcionais",
    name: "Setas Direcionais",
    visual: "arrow",
    description: "Setas pintadas no chão indicando para onde cada faixa da via se destina.",
    action: "Siga apenas a direção indicada pela seta da faixa em que você está; mude de faixa com antecedência se precisar seguir outro caminho.",
  },
];

export default horizontal;
