import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterSection {
  id: string;
  title: string;
  options: { id: string; label: string; count?: number }[];
}

const filterSections: FilterSection[] = [
  {
    id: 'collection',
    title: 'Коллекция',
    options: [
      { id: 'marble-look', label: 'Мрамор', count: 45 },
      { id: 'wood-look', label: 'Дерево', count: 32 },
      { id: 'stone-look', label: 'Камень', count: 28 },
      { id: 'concrete-look', label: 'Бетон', count: 18 },
      { id: 'terrazzo', label: 'Терраццо', count: 12 },
    ],
  },
  {
    id: 'size',
    title: 'Размер',
    options: [
      { id: '60x60', label: '60×60 см', count: 56 },
      { id: '60x120', label: '60×120 см', count: 34 },
      { id: '80x80', label: '80×80 см', count: 23 },
      { id: '120x120', label: '120×120 см', count: 15 },
      { id: '120x280', label: '120×280 см', count: 8 },
    ],
  },
  {
    id: 'surface',
    title: 'Поверхность',
    options: [
      { id: 'matte', label: 'Матовая', count: 67 },
      { id: 'polished', label: 'Полированная', count: 45 },
      { id: 'lappato', label: 'Лаппатированная', count: 32 },
      { id: 'structured', label: 'Структурированная', count: 21 },
    ],
  },
  {
    id: 'country',
    title: 'Страна производства',
    options: [
      { id: 'italy', label: 'Италия', count: 48 },
      { id: 'spain', label: 'Испания', count: 35 },
      { id: 'russia', label: 'Россия', count: 42 },
      { id: 'china', label: 'Китай', count: 28 },
    ],
  },
];

export function CatalogFilters() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['collection', 'size', 'surface']);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleFilter = (sectionId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const current = prev[sectionId] || [];
      return {
        ...prev,
        [sectionId]: current.includes(optionId)
          ? current.filter(id => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  return (
    <aside className="w-64 shrink-0">
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Фильтры</h2>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Сбросить
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filterSections.map(section => (
            <div key={section.id} className="border-t border-border pt-4 first:border-0 first:pt-0">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full text-left font-medium text-foreground hover:text-primary transition-colors"
              >
                {section.title}
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {expandedSections.includes(section.id) && (
                <div className="mt-3 space-y-2">
                  {section.options.map(option => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 text-sm cursor-pointer group"
                    >
                      <Checkbox
                        checked={selectedFilters[section.id]?.includes(option.id)}
                        onCheckedChange={() => toggleFilter(section.id, option.id)}
                      />
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {option.label}
                      </span>
                      {option.count !== undefined && (
                        <span className="text-muted-foreground text-xs ml-auto">
                          {option.count}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Button className="w-full mt-6" variant="outline">
          Применить фильтры
        </Button>
      </div>
    </aside>
  );
}
