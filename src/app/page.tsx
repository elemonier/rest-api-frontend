'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CreateItemForm from '@/components/CreateItemForm';
import ItemList from '@/components/ItemList';
import AuthForms from '@/components/AuthForms';

export default function Home() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleItemCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show auth forms if not authenticated
  if (!isAuthenticated) {
    return <AuthForms />;
  }

  // Show main app if authenticated
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-900">Items Manager</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          <p className="text-gray-600">Manage your personal items</p>
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
