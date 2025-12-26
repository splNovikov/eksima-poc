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
    name: 'Керамогранит Calacatta Marble полированный',
    article: 'KG-CAL-001',
    collection: 'Calacatta',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    size: '60×120 см',
    surface: 'Полированная',
    priceRetail: 3200,
    priceWholesale: 2450,
    stock: 1240,
    minOrder: 20,
    discount: 15,
    unit: 'м²',
  },
  {
    id: '2',
    name: 'Керамогранит Grey Stone матовый',
    article: 'KG-GRS-042',
    collection: 'Stone',
    image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=400&fit=crop',
    size: '80×80 см',
    surface: 'Матовая',
    priceRetail: 2100,
    priceWholesale: 1680,
    stock: 856,
    minOrder: 30,
    unit: 'м²',
  },
  {
    id: '3',
    name: 'Керамогранит Oak Wood структурный',
    article: 'KG-OAK-118',
    collection: 'Wood',
    image: 'https://images.unsplash.com/photo-1560185127-6a4079c0befd?w=400&h=400&fit=crop',
    size: '20×120 см',
    surface: 'Структурированная',
    priceRetail: 1850,
    priceWholesale: 1420,
    stock: 2150,
    minOrder: 25,
    unit: 'м²',
  },
  {
    id: '4',
    name: 'Керамогранит Statuario Venato лаппатированный',
    article: 'KG-STV-089',
    collection: 'Statuario',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop',
    size: '120×120 см',
    surface: 'Лаппатированная',
    priceRetail: 4500,
    priceWholesale: 3600,
    stock: 45,
    minOrder: 10,
    discount: 10,
    unit: 'м²',
  },
  {
    id: '5',
    name: 'Керамогранит Concrete Dark матовый',
    article: 'KG-CND-056',
    collection: 'Concrete',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&sat=-100',
    size: '60×60 см',
    surface: 'Матовая',
    priceRetail: 1650,
    priceWholesale: 1290,
    stock: 3420,
    minOrder: 40,
    unit: 'м²',
  },
  {
    id: '6',
    name: 'Керамогранит Terrazzo Milano полированный',
    article: 'KG-TRM-023',
    collection: 'Terrazzo',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop',
    size: '60×60 см',
    surface: 'Полированная',
    priceRetail: 2800,
    priceWholesale: 2240,
    stock: 678,
    minOrder: 15,
    unit: 'м²',
  },
  {
    id: '7',
    name: 'Керамогранит Bianco Carrara полированный',
    article: 'KG-BCR-077',
    collection: 'Carrara',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=400&fit=crop',
    size: '60×120 см',
    surface: 'Полированная',
    priceRetail: 3800,
    priceWholesale: 2950,
    stock: 234,
    minOrder: 20,
    unit: 'м²',
  },
  {
    id: '8',
    name: 'Керамогранит Walnut Wood матовый',
    article: 'KG-WNT-091',
    collection: 'Wood',
    image: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=400&fit=crop',
    size: '20×100 см',
    surface: 'Матовая',
    priceRetail: 1750,
    priceWholesale: 1380,
    stock: 1890,
    minOrder: 30,
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
