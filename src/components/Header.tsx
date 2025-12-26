import { useState } from 'react';
import { Phone, Mail, MapPin, Search, ShoppingCart, User, ChevronDown, Monitor, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useViewMode } from '@/contexts/ViewModeContext';
import logo from '@/assets/logo.png';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { viewMode, setViewMode, isDemoMode } = useViewMode();

  return (
    <header className="w-full bg-card border-b border-border">
      {/* Top bar */}
      <div className="bg-gray-800 text-gray-100">
        <div className="container flex items-center justify-between h-10 text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+78001234567" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>8 (800) 123-45-67</span>
            </a>
            <a href="mailto:info@eksima.ru" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@eksima.ru</span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-400">Работаем с 9:00 до 18:00</span>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Москва</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <a href="/" className="shrink-0">
            <img src={logo} alt="EKSIMA" className="h-10 w-auto" />
          </a>

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по артикулу, названию или коллекции..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-11 bg-secondary border-0 focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-lg">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-muted-foreground" />
              <span className={`text-sm ${!isDemoMode ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                Работа
              </span>
            </div>
            <Switch
              checked={isDemoMode}
              onCheckedChange={(checked) => setViewMode(checked ? 'demo' : 'work')}
            />
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className={`text-sm ${isDemoMode ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                Демо
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-card border-t border-border">
        <div className="container">
          <ul className="flex items-center gap-8 h-12 text-sm">
            <li>
              <a href="#" className="flex items-center gap-1 font-medium text-primary hover:text-primary/80 transition-colors">
                Каталог
                <ChevronDown className="w-4 h-4" />
              </a>
            </li>
            <li><a href="#" className="header-link">Коллекции</a></li>
            <li><a href="#" className="header-link">Новинки</a></li>
            <li><a href="#" className="header-link">Распродажа</a></li>
            <li><a href="#" className="header-link">Доставка</a></li>
            <li><a href="#" className="header-link">О компании</a></li>
            <li><a href="#" className="header-link">Контакты</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
