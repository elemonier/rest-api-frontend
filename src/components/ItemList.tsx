'use client';

import { useState, useEffect } from 'react';
import { Item } from '@/types/item';
import { itemsApi } from '@/services/api';

interface ItemListProps {
  refreshTrigger: number;
}

export default function ItemList({ refreshTrigger }: ItemListProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedItems = await itemsApi.getAllItems();
      setItems(fetchedItems);
    } catch (err) {
      if (err && typeof err === 'object' && 'code' in err && err.code === 'ERR_NETWORK') {
        setError('Cannot connect to API server. Make sure the backend is running on http://localhost:8000');
      } else {
        setError('Failed to fetch items');
      }
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-600">{error}</div>
        <button
          onClick={fetchItems}
          className="mt-2 text-sm text-red-500 hover:text-red-700 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No items found. Create your first item above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Items ({items.length})</h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-600 mt-1">{item.description}</p>
                )}
                <p className="text-sm text-gray-400 mt-2">
                  Created: {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                ID: {item.id}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}