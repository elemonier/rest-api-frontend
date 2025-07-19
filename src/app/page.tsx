'use client';

import { useState } from 'react';
import CreateItemForm from '@/components/CreateItemForm';
import ItemList from '@/components/ItemList';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleItemCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Items Manager</h1>
          <p className="text-gray-600">Manage your items with our REST API frontend</p>
          <div className="mt-4 text-sm text-gray-500">
            API Backend: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}</span>
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <CreateItemForm onItemCreated={handleItemCreated} />
          <ItemList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}
