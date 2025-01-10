import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';

interface Table {
  id: string;
  number: string;
  section: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  currentOrderId?: string;
  qrCode?: string;
}

interface Section {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

const TableManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [sections] = useState<Section[]>([
    {
      id: 'section1',
      name: 'Main Floor',
      description: 'Main dining area',
      isActive: true
    },
    {
      id: 'section2',
      name: 'Patio',
      description: 'Outdoor seating',
      isActive: true
    }
  ]);

  const [tables] = useState<Table[]>([
    {
      id: 'table1',
      number: '101',
      section: 'section1',
      capacity: 4,
      status: 'available',
      qrCode: 'https://example.com/qr/table101'
    },
    {
      id: 'table2',
      number: '102',
      section: 'section1',
      capacity: 2,
      status: 'occupied',
      currentOrderId: 'order123'
    }
  ]);

  const [selectedSection, setSelectedSection] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTables = tables.filter(table => {
    const matchesSection = !selectedSection || table.section === selectedSection;
    const matchesSearch = !searchTerm || 
      table.number.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const getStatusColor = (status: Table['status']): string => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-yellow-500';
      case 'maintenance':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStatusChange = (tableId: string, newStatus: Table['status']) => {
    // TODO: Implement status change through Redux
    console.log('Changing status for table', tableId, 'to', newStatus);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Table Management</h1>
        <button className="btn-primary">Add New Table</button>
      </div>

      {/* Search and Filter */}
      <div className="glass-card p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tables..."
            className="input-field flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input-field md:w-48"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">All Sections</option>
            {sections.map(section => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTables.map(table => (
          <div key={table.id} className="glass-card p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Table {table.number}</h3>
                <p className="text-sm text-gray-400">
                  {sections.find(s => s.id === table.section)?.name}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(table.status)}`}>
                {table.status}
              </span>
            </div>

            <div className="space-y-4">
              {/* Table Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Capacity</label>
                  <div className="text-lg font-semibold">{table.capacity}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Current Order</label>
                  <div className="text-lg font-semibold">
                    {table.currentOrderId || 'None'}
                  </div>
                </div>
              </div>

              {/* QR Code */}
              {table.qrCode && (
                <div className="text-center">
                  <img
                    src={table.qrCode}
                    alt={`QR Code for Table ${table.number}`}
                    className="w-32 h-32 mx-auto"
                  />
                  <button className="btn-secondary mt-2">Download QR</button>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center">
                <select
                  className="input-field flex-1 mr-2"
                  value={table.status}
                  onChange={(e) => handleStatusChange(table.id, e.target.value as Table['status'])}
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="reserved">Reserved</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                <button className="btn-primary">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Management */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Section Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(section => (
            <div key={section.id} className="glass-card p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{section.name}</h3>
                  <p className="text-sm text-gray-400">{section.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  section.isActive ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {section.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex justify-end space-x-2">
                <button className="btn-secondary">
                  {section.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button className="btn-primary">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableManagement;
