import { useState } from 'react';
import { Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard, Product } from '@/components/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const products: Product[] = [
  {
    id: '1',
    name: 'Керамогранит Sandy Stone Ivory',
    article: 'KG-SSI-001',
    collection: 'Sandy Stone',
    image: 'https://www.ehituseabc.ee/images/thumbs/016/0168995_taismassplaat-60-x-60-x-20-sandy-stone-ivoryr11_415.jpeg',
    size: '60×60 см',
    surface: 'Матовая R11',
    priceRetail: 2200,
    priceWholesale: 1750,
    stock: 1240,
    minOrder: 20,
    discount: 30,
    unit: 'м²',
  },
  {
    id: '2',
    name: 'Керамогранит Slate Stone Grey',
    article: 'KG-SSG-042',
    collection: 'Slate Stone',
    image: 'https://www.ehituseabc.ee/images/thumbs/016/0167092_taismassplaat-60-x-60-x-20-slate-stone-greyr11_415.jpeg',
    size: '60×60 см',
    surface: 'Матовая R11',
    priceRetail: 2100,
    priceWholesale: 1680,
    stock: 856,
    minOrder: 30,
    discount: 30,
    unit: 'м²',
  },
  {
    id: '3',
    name: 'Керамогранит Eclipse Pulsar',
    article: 'KG-ECP-118',
    collection: 'Eclipse',
    image: 'https://www.ehituseabc.ee/images/thumbs/015/0153597_taismassplaat-60-x-60-x-20-eclipse-pulsar-r11b_415.jpeg',
    size: '60×60 см',
    surface: 'Структурированная R11/B',
    priceRetail: 1850,
    priceWholesale: 1420,
    stock: 2150,
    minOrder: 25,
    unit: 'м²',
  },
  {
    id: '4',
    name: 'Керамогранит Stone Age Anthracite',
    article: 'KG-SAA-089',
    collection: 'Stone Age',
    image: 'https://www.ehituseabc.ee/images/thumbs/014/0143706_taismassplaat-60-x-60-x-1-stone-age-anthracite-recr10_415.jpeg',
    size: '60×60 см',
    surface: 'Ректифицированная R10',
    priceRetail: 2500,
    priceWholesale: 1900,
    stock: 45,
    minOrder: 10,
    discount: 30,
    unit: 'м²',
  },
  {
    id: '5',
    name: 'Керамогранит Arvora Black Matt',
    article: 'KG-ABM-056',
    collection: 'Arvora',
    image: 'https://www.ehituseabc.ee/images/thumbs/015/0155866_taismassplaat-60-x-120-x-09-arvora-black-matt_415.jpeg',
    size: '60×120 см',
    surface: 'Матовая',
    priceRetail: 3200,
    priceWholesale: 2450,
    stock: 420,
    minOrder: 15,
    discount: 30,
    unit: 'м²',
  },
  {
    id: '6',
    name: 'Керамогранит Caracter Gris Mix',
    article: 'KG-CGM-023',
    collection: 'Caracter',
    image: 'https://www.ehituseabc.ee/images/thumbs/013/0139462_taismassplaat-60-x-60-x-085-caracter-gris-mix-rett_415.jpeg',
    size: '60×60 см',
    surface: 'Ректифицированная',
    priceRetail: 2800,
    priceWholesale: 2240,
    stock: 678,
    minOrder: 15,
    discount: 38,
    unit: 'м²',
  },
  {
    id: '7',
    name: 'Керамогранит Glaciar Mate',
    article: 'KG-GLM-077',
    collection: 'Glaciar',
    image: 'https://www.ehituseabc.ee/images/thumbs/016/0163275_taismassplaat-60-x-120-glaciar-mate-rect_415.jpeg',
    size: '60×120 см',
    surface: 'Матовая Rect',
    priceRetail: 3800,
    priceWholesale: 2950,
    stock: 234,
    minOrder: 20,
    discount: 30,
    unit: 'м²',
  },
  {
    id: '8',
    name: 'Керамогранит Piazen Coal',
    article: 'KG-PZC-091',
    collection: 'Piazen',
    image: 'https://www.ehituseabc.ee/images/thumbs/014/0146659_taismassplaat-60-x-60-x-1-piazen-coal_415.jpeg',
    size: '60×60 см',
    surface: 'Матовая',
    priceRetail: 1750,
    priceWholesale: 1380,
    stock: 1890,
    minOrder: 30,
    discount: 30,
    unit: 'м²',
  },
];

export function CatalogGrid() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="text-sm text-muted-foreground">
          Найдено <span className="font-medium text-foreground">156</span> товаров
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Сортировка:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">По популярности</SelectItem>
                <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                <SelectItem value="name">По названию</SelectItem>
                <SelectItem value="stock">По наличию</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setView('grid')}
              className={`p-2 ${view === 'grid' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 ${view === 'list' ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List */}
      <div className={view === 'grid' 
        ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'flex flex-col gap-3'
      }>
        {products.map(product => (
          <ProductCard key={product.id} product={product} view={view} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <Button variant="outline" size="sm" disabled>
          Назад
        </Button>
        <Button variant="default" size="sm" className="w-9">1</Button>
        <Button variant="outline" size="sm" className="w-9">2</Button>
        <Button variant="outline" size="sm" className="w-9">3</Button>
        <span className="text-muted-foreground px-2">...</span>
        <Button variant="outline" size="sm" className="w-9">12</Button>
        <Button variant="outline" size="sm">
          Вперёд
        </Button>
      </div>
    </div>
  );
}
