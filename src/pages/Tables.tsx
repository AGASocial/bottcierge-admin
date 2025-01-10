import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Tables: React.FC = () => {
  const { currentVenue } = useSelector((state: RootState) => state.venue);
  const tables = currentVenue?.tables || [];

  // Group tables by section
  const tablesBySection = tables.reduce((acc, table) => {
    const section = table.sectionId;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(table);
    return acc;
  }, {} as Record<string, typeof tables>);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/20 text-green-300';
      case 'occupied':
        return 'bg-red-500/20 text-red-300';
      case 'reserved':
        return 'bg-yellow-500/20 text-yellow-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tables</h1>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-gray-300">Available</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-gray-300">Occupied</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="text-gray-300">Reserved</span>
          </div>
        </div>
      </div>

      {Object.entries(tablesBySection).map(([sectionId, sectionTables]) => (
        <div key={sectionId} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">
            {sectionId === 'default_section' ? 'General Area' : sectionId}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sectionTables.map((table) => (
              <div
                key={table.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">Table {table.number}</span>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(table.status)}`}>
                    {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-2 text-gray-400">
                  <p>Capacity: {table.capacity} people</p>
                  <p>Shape: {table.shape}</p>
                  <p>Size: {table.width}x{table.height}</p>
                  <p>Minimum Spend: ${table.minimumSpend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {tables.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No tables found. Add tables to your venue to get started.
        </div>
      )}
    </div>
  );
};

export default Tables;
