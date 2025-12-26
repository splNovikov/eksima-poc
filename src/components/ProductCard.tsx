import { ShoppingCart, Heart, Eye, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useViewMode } from '@/contexts/ViewModeContext';

export interface Product {
  id: string;
  name: string;
  article: string;
  collection: string;
  image: string;
  size: string;
  surface: string;
  priceRetail: number;
  priceWholesale: number;
  stock: number;
  minOrder: number;
  discount?: number;
  unit: string;
}

interface ProductCardProps {
  product: Product;
  view?: 'grid' | 'list';
}

export function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const { isDemoMode, isWorkMode } = useViewMode();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const getStockStatus = () => {
    if (isDemoMode) {
      return product.stock > 0 ? (
        <span className="badge-stock badge-in-stock">В наличии</span>
      ) : (
        <span className="badge-stock bg-gray-100 text-gray-600">Под заказ</span>
      );
    }

    if (product.stock > 100) {
      return (
        <span className="badge-stock badge-in-stock flex items-center gap-1">
          <Package className="w-3 h-3" />
          В наличии: {product.stock} {product.unit}
        </span>
      );
    } else if (product.stock > 0) {
      return (
        <span className="badge-stock badge-low-stock flex items-center gap-1">
          <Package className="w-3 h-3" />
          В наличии: {product.stock} {product.unit}
        </span>
      );
    }
    return (
      <span className="badge-stock bg-gray-100 text-gray-600">Под заказ</span>
    );
  };

  // List view layout
  if (view === 'list') {
    return (
      <div className="product-card group animate-fade-in flex flex-row">
        {/* Image - smaller for list view */}
        <div className="relative w-32 h-32 shrink-0 overflow-hidden rounded-l-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {isWorkMode && product.discount && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-xs font-medium">
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex items-center gap-6">
          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
              <span>Арт. {product.article}</span>
              <span className="text-primary">{product.collection}</span>
            </div>
            <h3 className="font-medium text-foreground truncate mb-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Размер: <span className="text-foreground">{product.size}</span></span>
              <span className="truncate max-w-[180px]">Поверхность: <span className="text-foreground">{product.surface}</span></span>
            </div>
          </div>

          {/* Stock */}
          <div className="w-28 shrink-0">
            {getStockStatus()}
          </div>

          {/* Pricing */}
          <div className="w-40 shrink-0">
            {isDemoMode ? (
              <div className="price-retail">
                {formatPrice(product.priceRetail)} ₽/{product.unit}
              </div>
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="price-wholesale">
                    {formatPrice(product.priceWholesale)} ₽/{product.unit}
                  </span>
                </div>
                {product.discount && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.priceRetail)} ₽
                  </span>
                )}
                <div className="text-xs text-muted-foreground">
                  Мин. заказ: {product.minOrder} {product.unit}
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="shrink-0 flex items-center gap-2">
            <button className="w-8 h-8 border border-border rounded flex items-center justify-center hover:bg-secondary transition-colors">
              <Heart className="w-4 h-4 text-muted-foreground" />
            </button>
            <Button size="sm" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              В корзину
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view layout (original)
  return (
    <div className="product-card group animate-fade-in">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount badge */}
        {isWorkMode && product.discount && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
            -{product.discount}%
          </div>
        )}

        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-card rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Article & Collection */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Арт. {product.article}</span>
          <span className="text-primary">{product.collection}</span>
        </div>

        {/* Name */}
        <h3 className="font-medium text-foreground line-clamp-2 min-h-[2.5rem] leading-tight">
          {product.name}
        </h3>

        {/* Specs */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Размер:</span>
            <span className="text-foreground">{product.size}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="shrink-0">Поверхность:</span>
            <span className="text-foreground truncate">{product.surface}</span>
          </div>
        </div>

        {/* Stock */}
        <div className="pt-2 border-t border-border">
          {getStockStatus()}
        </div>

        {/* Pricing */}
        <div className="space-y-1">
          {isDemoMode ? (
            <div className="price-retail">
              {formatPrice(product.priceRetail)} ₽/{product.unit}
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <span className="price-wholesale">
                  {formatPrice(product.priceWholesale)} ₽/{product.unit}
                </span>
                {product.discount && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.priceRetail)} ₽
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Розница: {formatPrice(product.priceRetail)} ₽/{product.unit}
              </div>
              <div className="text-xs text-muted-foreground">
                Мин. заказ: {product.minOrder} {product.unit}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2">
          <Button className="w-full gap-2" size="sm">
            <ShoppingCart className="w-4 h-4" />
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
}
