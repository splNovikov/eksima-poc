import { Header } from '@/components/Header';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CatalogFilters } from '@/components/CatalogFilters';
import { CatalogGrid } from '@/components/CatalogGrid';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import logo from '@/assets/logo.png';

const Index = () => {
  const breadcrumbItems = [
    { label: 'Каталог', href: '/catalog' },
    { label: 'Керамогранит', href: '/catalog/keramogranit' },
    { label: 'Напольный керамогранит' },
  ];

  return (
    <ViewModeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container pb-12">
          <Breadcrumbs items={breadcrumbItems} />
          
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Напольный керамогранит
            </h1>
            <p className="text-muted-foreground">
              Широкий ассортимент керамогранита от ведущих мировых производителей
            </p>
          </div>

          {/* Catalog Layout */}
          <div className="flex gap-8">
            <CatalogFilters />
            <CatalogGrid />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-100 py-10">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="mb-4">
                  <img src={logo} alt="EKSIMA" className="h-10 w-auto mb-2" />
                  <p className="text-xs text-gray-400">Оптовые поставки</p>
                </div>
                <p className="text-sm text-gray-400">
                  Ведущий поставщик керамогранита для B2B клиентов с 2010 года
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Каталог</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Напольный керамогранит</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Настенная плитка</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Мозаика</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Декоры и бордюры</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Информация</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-primary transition-colors">О компании</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Доставка и оплата</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Возврат товара</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Контакты</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>8 (800) 123-45-67</li>
                  <li>info@keramogranit.ru</li>
                  <li>Москва, ул. Примерная, 123</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} Эксима. Все права защищены.
            </div>
          </div>
        </footer>
      </div>
    </ViewModeProvider>
  );
};

export default Index;
