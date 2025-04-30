'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '../shared/hooks/useQuery/useQuery';
import { SortDirectionEnum } from '../shared/types/enums/sort-direction.enum';
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

export const dummyProducts: Product[] = [
  { id: '1', name: 'Laptop Pro 15”', category: 'electronics', price: 1500 },
  { id: '2', name: 'Running Shoes X', category: 'apparel', price: 120 },
  { id: '3', name: 'Coffee Mug', category: 'kitchen', price: 15 },
  { id: '4', name: 'Smartphone XL', category: 'electronics', price: 999 },
  { id: '5', name: 'Yoga Mat Deluxe', category: 'fitness', price: 45 },
  { id: '6', name: 'Electric Guitar', category: 'music', price: 700 },
  { id: '7', name: 'Blender Pro', category: 'kitchen', price: 200 },
  {
    id: '8',
    name: 'Office Chair Ergonomic',
    category: 'furniture',
    price: 350,
  },
  { id: '9', name: 'Denim Jacket', category: 'apparel', price: 85 },
  {
    id: '10',
    name: 'Wireless Headphones',
    category: 'electronics',
    price: 250,
  },
];

export default function TestQueryWithData() {
  const { search, filter, sort, paginate } = useQuery<Product>();
  const [result, setResult] = useState<Product[]>(dummyProducts);

  useEffect(() => {
    search('name', 'Pro');
    filter('category', 'electronics');
    sort('price', SortDirectionEnum.DESC);
    paginate(2, 1);
    const params = new URLSearchParams(window.location.search);

    let arr = dummyProducts.slice();
    const nameQ = params.get('search[name]');
    if (nameQ) {
      arr = arr.filter((p) =>
        p.name.toLowerCase().includes(nameQ.toLowerCase()),
      );
    }
    const catQ = params.get('filter[category]');
    if (catQ) {
      arr = arr.filter((p) => p.category === catQ);
    }
    const sortDir = params.get('sort[price]');
    if (
      sortDir === SortDirectionEnum.ASC ||
      sortDir === SortDirectionEnum.DESC
    ) {
      arr.sort((a, b) =>
        sortDir === SortDirectionEnum.ASC
          ? a.price - b.price
          : b.price - a.price,
      );
    }
    const limit = Number(params.get('limit'));
    const offset = Number(params.get('offset'));
    if (!isNaN(limit) && !isNaN(offset)) {
      arr = arr.slice(offset, offset + limit);
    }

    setResult(arr);
  }, []);

  return (
    <div>
      <h2>Resulting Products</h2>
      <ul>
        {result.map((p) => (
          <li key={p.id}>
            {p.name} — {p.category} — ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
