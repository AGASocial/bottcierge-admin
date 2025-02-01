import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Server, ServerStatus } from '../types';
import { fetchServers, updateServerStatus } from '../store/slices/serverSlice';
import type { AppDispatch } from '../store';

const Servers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { servers, loading, error } = useSelector((state: RootState) => state.server);

  useEffect(() => {
    dispatch(fetchServers());
  }, [dispatch]);

  const getStatusColor = (status: ServerStatus): string => {
    const colors: Record<ServerStatus, string> = {
      [ServerStatus.ACTIVE]: 'bg-green-500',
      [ServerStatus.INACTIVE]: 'bg-gray-500',
      [ServerStatus.ON_BREAK]: 'bg-yellow-500',
      [ServerStatus.OFF_DUTY]: 'bg-red-500',
      [ServerStatus.SICK]: 'bg-blue-500',
      [ServerStatus.VACATION]: 'bg-purple-500'
    };
    return colors[status];
  };

  const handleStatusChange = async (serverId: string, newStatus: ServerStatus) => {
    try {
      await dispatch(updateServerStatus({ serverId, status: newStatus })).unwrap();
    } catch (error) {
      console.error('Failed to update server status:', error);
    }
  };

  const ServerCard: React.FC<{ server: Server }> = ({ server }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="glass-card p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{server.name}</h3>
            <p className="text-sm text-gray-300">{server.email}</p>
            <p className="text-sm text-gray-300">{server.phone}</p>
          </div>
          <div className="flex flex-col items-end relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(server.status)} text-white hover:opacity-90 transition-opacity`}
            >
              {server.status}
            </button>
            {isOpen && (
              <div className="absolute top-8 right-0 z-10 w-48 py-1 bg-deep-purple border border-white/20 rounded-lg shadow-lg">
                {Object.values(ServerStatus).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      handleStatusChange(server.id, status);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-sm text-left text-white hover:bg-white/10 ${server.status === status ? 'bg-white/5' : ''
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="font-semibold mb-2">Assigned Sections</h4>
          <div className="flex flex-wrap gap-2">
            {server.sections.map((section) => (
              <span
                key={section.id}
                className="bg-electric-blue/40 text-electric-white px-2 py-1 rounded text-sm"
                title={section.description}
              >
                {section.name}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="font-semibold mb-2">Performance Metrics</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-300">Orders Served</p>
              <p className="text-lg font-semibold">{server.metrics.ordersServed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Average Rating</p>
              <p className="text-lg font-semibold">{server.metrics.averageRating.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Total Sales</p>
              <p className="text-lg font-semibold">${server.metrics.totalSales.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="font-semibold mb-2">Schedule</h4>
          <p className="text-sm">
            {server.schedule.start} - {server.schedule.end}
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card p-4 text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Server Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}
      </div>
    </div>
  );
};

export default Servers;
