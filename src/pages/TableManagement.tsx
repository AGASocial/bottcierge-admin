import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableCellsIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { RootState } from '../store';
import type { Table } from '../types';

const SECTION_NAMES: Record<string, string> = {
  main_floor: 'Main Floor',
  patio: 'Patio',
  bar: 'Bar'
};

const TableManagement: React.FC = () => {
  const navigate = useNavigate();
  const { currentVenue } = useSelector((state: RootState) => state.venue);

  const tablesBySection = currentVenue?.tables.reduce((acc: Record<string, Table[]>, table) => {
    if (!acc[table.sectionId]) {
      acc[table.sectionId] = [];
    }
    acc[table.sectionId].push(table);
    return acc;
  }, {}) || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <TableCellsIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Table Management</h1>
          </div>
          <button
            onClick={() => navigate('/profile/tables/add')}
            className="flex items-center space-x-2 px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-electric-blue/90 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Table</span>
          </button>
        </div>

        <div className="space-y-6">
          {Object.entries(tablesBySection).map(([sectionId, tables]) => (
            <div key={sectionId} className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">{SECTION_NAMES[sectionId]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium">Table {table.number}</h3>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        table.status === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-1 text-gray-300">
                      <p>Capacity: {table.capacity} guests</p>
                      <p>Shape: {table.shape}</p>
                      <p>Minimum Spend: ${table.minimumSpend}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableManagement;
