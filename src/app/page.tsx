'use client';

import * as React from 'react';
import Image from 'next/image';
import { bannerSouv } from '@/assets';
import { ItemList } from '@/components/item-list';
import api from '@/services/api';
import { ItemBoxProps } from '@/components/item-box';
import { AddItemButton, CategoryField, ItemSearchField, QuantityField } from '@/components';

export default function Home() {
  const [ items, setItems ] = React.useState<ItemBoxProps[]>([]);
  const [ searchTerm, setSearchTerm ] = React.useState('');
  const [ filterQuantity, setFilterQuantity ] = React.useState('');
  const [ filterUnit, setFilterUnit ] = React.useState<string | null>('Un.');
  const [ filterCategory, setFilterCategory ] = React.useState<string | null>(null);

  const fetchItems = React.useCallback(async () => {
    try {
      const response = await api.get('/item');
      console.log('Fetched items:', response.data);
      const itemsData = response.data.data || response.data;
      setItems(Array.isArray(itemsData) ? itemsData : []);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setItems([]);
    }

    return;
  }, []);

  React.useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = React.useMemo(() => {
    return items.filter(item => {
      // Filter by search term (item name)
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filter by quantity and unit (only when quantity is provided)
      if (filterQuantity) {
        if (item.quantity.toString() !== filterQuantity) {
          return false;
        }
        if (filterUnit) {
          // Map frontend unit values to backend values for comparison
          const unitMap: Record<string, string> = {
            'Un.': 'unidade',
            'Kg': 'kg',
            'L': 'litro'
          };
          const mappedUnit = unitMap[filterUnit] || filterUnit;
          if (item.unit.toLowerCase() !== mappedUnit.toLowerCase()) {
            return false;
          }
        }
      }

      // Filter by category (case-insensitive comparison)
      if (filterCategory && item.category.toLowerCase() !== filterCategory.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [items, searchTerm, filterQuantity, filterUnit, filterCategory]);

  return (
    <div className="flex flex-1 flex-col min-h-screen items-center bg-[#0C0C0D] pb-32">
      <Image src={bannerSouv} alt="Banner Comidas" className='w-full top-0 absolute' />
      <h1 className='w-180 text-[#FFF] text-2xl leading-none font-bold mt-[6.11vw] z-10'>Lista de Compras</h1>
      <div className='w-180 mt-[calc(3.89vw-1.5rem)] flex gap-3 justify-between items-end z-10'>
        <ItemSearchField value={searchTerm} onChange={setSearchTerm} />
        <QuantityField 
          quantityValue={filterQuantity} 
          onQuantityChange={setFilterQuantity}
          unitValue={filterUnit}
          onUnitChange={setFilterUnit}
        />
        <CategoryField value={filterCategory} onChange={setFilterCategory} />
        <AddItemButton onItemAdded={fetchItems} />
      </div>
      <div className='w-180 mt-4'>
        <ItemList itemList={filteredItems} onUpdate={fetchItems} />
      </div>
    </div>
  );
}
