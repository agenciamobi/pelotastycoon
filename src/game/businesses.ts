export type BusinessId =
  | 'pizzaria'
  | 'sorveteria'
  | 'churrascaria'
  | 'lancheria'
  | 'pastelaria'
  | 'peixaria';

export type BusinessDefinition = {
  id: BusinessId;
  name: string;
  starterProduct: string;
  secondaryProduct: string;
  productionTimeMs: number;
  saleValue: number;
  arrivalMinMs: number;
  arrivalMaxMs: number;
  identity: string;
  color: number;
  colorCss: string;
};

export const BUSINESSES: BusinessDefinition[] = [
  {
    id: 'sorveteria',
    name: 'Sorveteria',
    starterProduct: 'Sorvete de chocolate',
    secondaryProduct: 'Sorvete de morango',
    productionTimeMs: 2500,
    saleValue: 7,
    arrivalMinMs: 6000,
    arrivalMaxMs: 8000,
    identity: 'Rápida, alto giro e movimento constante.',
    color: 0x43b7e8,
    colorCss: '#43b7e8',
  },
  {
    id: 'pastelaria',
    name: 'Pastelaria',
    starterProduct: 'Pastel de carne',
    secondaryProduct: 'Pastel de queijo',
    productionTimeMs: 4000,
    saleValue: 10,
    arrivalMinMs: 7000,
    arrivalMaxMs: 9000,
    identity: 'Ritmo ágil e fila frequente.',
    color: 0xf2a83b,
    colorCss: '#f2a83b',
  },
  {
    id: 'lancheria',
    name: 'Lancheria',
    starterProduct: 'Hambúrguer',
    secondaryProduct: 'Cachorro-quente',
    productionTimeMs: 5000,
    saleValue: 14,
    arrivalMinMs: 8000,
    arrivalMaxMs: 10000,
    identity: 'Equilibrada e boa para aprender o fluxo.',
    color: 0xf06b45,
    colorCss: '#f06b45',
  },
  {
    id: 'peixaria',
    name: 'Peixaria',
    starterProduct: 'Filé de pescado',
    secondaryProduct: 'Pescado inteiro',
    productionTimeMs: 5500,
    saleValue: 16,
    arrivalMinMs: 9000,
    arrivalMaxMs: 11000,
    identity: 'Demanda menor e valor de venda mais alto.',
    color: 0x2aa89c,
    colorCss: '#2aa89c',
  },
  {
    id: 'pizzaria',
    name: 'Pizzaria',
    starterProduct: 'Pizza de queijo',
    secondaryProduct: 'Pizza de calabresa',
    productionTimeMs: 7000,
    saleValue: 20,
    arrivalMinMs: 10000,
    arrivalMaxMs: 12000,
    identity: 'Produção mais lenta e recompensa maior.',
    color: 0xd95a45,
    colorCss: '#d95a45',
  },
  {
    id: 'churrascaria',
    name: 'Churrascaria',
    starterProduct: 'Porção de carne',
    secondaryProduct: 'Porção de frango',
    productionTimeMs: 8000,
    saleValue: 24,
    arrivalMinMs: 11000,
    arrivalMaxMs: 13000,
    identity: 'Cadência mais lenta e maior valor por venda.',
    color: 0x8b5538,
    colorCss: '#8b5538',
  },
];

export function isBusinessId(value: unknown): value is BusinessId {
  return typeof value === 'string' && BUSINESSES.some((business) => business.id === value);
}

export function getBusinessDefinition(id: BusinessId): BusinessDefinition {
  return BUSINESSES.find((business) => business.id === id) ?? BUSINESSES[2];
}
