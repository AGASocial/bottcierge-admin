import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { Table } from '../../types';
import type { RootState } from '../../store';

interface TableMapProps {
  onTableSelect?: (table: Table) => void;
}

const TableMap: React.FC<TableMapProps> = ({ onTableSelect }) => {
  const navigate = useNavigate();
  const { currentVenue } = useSelector((state: RootState) => state.venue);
  const tables = currentVenue?.tables || [];

  const handleTableClick = (table: Table) => {
    if (onTableSelect) {
      onTableSelect(table);
    } else {
      navigate(`/tables`);
    }
  };

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {tables.map((table) => (
        <button
          key={table.id}
          onClick={() => handleTableClick(table)}
          className={`p-4 rounded-lg border ${
            table.status === 'available'
              ? 'hover:border-blue-500 cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Table {table.number}</span>
            <span className={`w-3 h-3 rounded-full ${getTableStatusColor(table.status)}`} />
          </div>
          <div className="text-sm text-gray-400">
            <p>Capacity: {table.capacity}</p>
            <p>Shape: {table.shape}</p>
            <p>Size: {table.width}x{table.height}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TableMap;
