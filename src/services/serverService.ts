import { Server, ServerStatus } from '../types';

const mockServers: Server[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    status: ServerStatus.ACTIVE,
    sections: [
      { id: '1', name: 'Main Dining', description: 'Main dining area with 20 tables' },
      { id: '2', name: 'Bar Area', description: 'Bar area with high-top tables' }
    ],
    metrics: {
      ordersServed: 150,
      averageRating: 4.8,
      totalSales: 4500.00,
      lastMonthPerformance: {
        ordersServed: 145,
        averageRating: 4.7,
        totalSales: 4300.00
      }
    },
    startDate: '2024-01-01',
    schedule: {
      start: '09:00',
      end: '17:00'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '(555) 234-5678',
    status: ServerStatus.ON_BREAK,
    sections: [
      { id: '3', name: 'Outdoor Patio', description: 'Outdoor seating area with 15 tables' }
    ],
    metrics: {
      ordersServed: 120,
      averageRating: 4.9,
      totalSales: 3800.00,
      lastMonthPerformance: {
        ordersServed: 118,
        averageRating: 4.8,
        totalSales: 3600.00
      }
    },
    startDate: '2024-01-15',
    schedule: {
      start: '14:00',
      end: '22:00'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const serverService = {
  // Get all servers
  getServers: async () => {
    // TODO: Replace with actual API call
    return mockServers;
  },

  // Get server by ID
  getServerById: async (serverId: string) => {
    // TODO: Replace with actual API call
    const server = mockServers.find(s => s.id === serverId);
    if (!server) throw new Error('Server not found');
    return server;
  },

  // Create new server
  createServer: async (serverData: Partial<Server>) => {
    // TODO: Replace with actual API call
    const newServer: Server = {
      id: Math.random().toString(36).substr(2, 9),
      name: serverData.name || '',
      email: serverData.email || '',
      phone: serverData.phone || '',
      status: serverData.status || ServerStatus.INACTIVE,
      sections: serverData.sections || [],
      metrics: serverData.metrics || {
        ordersServed: 0,
        averageRating: 0,
        totalSales: 0,
        lastMonthPerformance: {
          ordersServed: 0,
          averageRating: 0,
          totalSales: 0
        }
      },
      startDate: serverData.startDate || new Date().toISOString(),
      schedule: serverData.schedule || {
        start: '09:00',
        end: '17:00'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockServers.push(newServer);
    return newServer;
  },

  // Update server
  updateServer: async (serverId: string, data: Partial<Server>) => {
    // TODO: Replace with actual API call
    const index = mockServers.findIndex(s => s.id === serverId);
    if (index === -1) throw new Error('Server not found');
    
    mockServers[index] = {
      ...mockServers[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    return mockServers[index];
  },

  // Update server status
  updateServerStatus: async (serverId: string, status: ServerStatus) => {
    // TODO: Replace with actual API call
    const index = mockServers.findIndex(s => s.id === serverId);
    if (index === -1) throw new Error('Server not found');
    
    mockServers[index] = {
      ...mockServers[index],
      status,
      updatedAt: new Date().toISOString()
    };
    
    return mockServers[index];
  }
};
