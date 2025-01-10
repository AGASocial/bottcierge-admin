import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import type { Table } from '../types';

const SECTIONS = [
  { id: 'main_floor', name: 'Main Floor' },
  { id: 'patio', name: 'Patio' },
  { id: 'bar', name: 'Bar' }
];

const SHAPES = ['round', 'square', 'rectangle'] as const;

const AddTable: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newTable: Table = {
      id: Math.random().toString(36).substring(7).toUpperCase(),
      number: formData.get('number') as string,
      capacity: Number(formData.get('capacity')),
      sectionId: formData.get('section') as string,
      shape: formData.get('shape') as 'round' | 'square' | 'rectangle',
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      minimumSpend: Number(formData.get('minimumSpend')),
      status: 'available',
    };

    // TODO: Add table to venue state
    console.log('New table:', newTable);
    navigate('/profile/tables');
  };

  const handleCancel = () => {
    navigate('/profile/tables');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <TableCellsIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Add New Table</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6">
            <div className="space-y-6">
              {/* Table Number */}
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-2">
                  Table Number
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  min="1"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
              </div>

              {/* Capacity */}
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-300 mb-2">
                  Capacity (guests)
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  min="1"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
              </div>

              {/* Section */}
              <div>
                <label htmlFor="section" className="block text-sm font-medium text-gray-300 mb-2">
                  Section
                </label>
                <select
                  id="section"
                  name="section"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                >
                  {SECTIONS.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shape */}
              <div>
                <label htmlFor="shape" className="block text-sm font-medium text-gray-300 mb-2">
                  Table Shape
                </label>
                <select
                  id="shape"
                  name="shape"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                >
                  {SHAPES.map((shape) => (
                    <option key={shape} value={shape}>
                      {shape.charAt(0).toUpperCase() + shape.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimum Spend */}
              <div>
                <label htmlFor="minimumSpend" className="block text-sm font-medium text-gray-300 mb-2">
                  Minimum Spend ($)
                </label>
                <input
                  type="number"
                  id="minimumSpend"
                  name="minimumSpend"
                  min="0"
                  defaultValue="100"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-electric-blue text-white rounded-lg hover:bg-electric-blue/90 transition-colors"
            >
              Add Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTable;
