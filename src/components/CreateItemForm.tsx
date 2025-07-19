'use client';

import { useState } from 'react';
import { CreateItemRequest } from '@/types/item';
import { itemsApi } from '@/services/api';

interface CreateItemFormProps {
  onItemCreated: () => void;
}

export default function CreateItemForm({ onItemCreated }: CreateItemFormProps) {
  const [formData, setFormData] = useState<CreateItemRequest>({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const item = await itemsApi.createItem({
        name: formData.name.trim(),
        description: formData.description?.trim() || undefined,
      });
      
      setSuccess(`Item "${item.name}" created successfully!`);
      setFormData({ name: '', description: '' });
      onItemCreated();
      
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err && 
          typeof err.response === 'object' && err.response && 
          'status' in err.response && err.response.status === 409) {
        setError('An item with this name already exists');
      } else if (err && typeof err === 'object' && 'code' in err && err.code === 'ERR_NETWORK') {
        setError('Cannot connect to API server. Make sure the backend is running on http://localhost:8000');
      } else {
        setError('Failed to create item');
      }
      console.error('Error creating item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Item</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            maxLength={100}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter item name"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={1000}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Enter item description (optional)"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-red-600 text-sm">{error}</div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <div className="text-green-600 text-sm">{success}</div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !formData.name.trim()}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating...' : 'Create Item'}
        </button>
      </form>
    </div>
  );
}