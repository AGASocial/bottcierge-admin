import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  QrCodeIcon,
  UserCircleIcon,
  UsersIcon,
  TableCellsIcon,
  RectangleGroupIcon,
  QueueListIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import Badge from '../common/Badge';
import type { RootState } from '../../store';

const Layout: React.FC = () => {
  const location = useLocation();
  const newOrdersCount = useSelector((state: RootState) =>
    state.order.orderHistory.filter(order => order.status === 'created').length
  );

  const menuItems = [
    { path: '/', icon: RectangleGroupIcon, label: 'Orders', badge: newOrdersCount },
    {
      path: '/tables',
      icon: TableCellsIcon,
      label: 'Tables',
      badge: 0
    },
    {
      path: '/servers', icon: UsersIcon, label: 'Servers', badge: 0
    },
    {
      path: '/menu', icon: QueueListIcon, label: 'Menu', badge: 0
    },
    { path: '/orders', icon: ArchiveBoxIcon, label: 'History', badge: 0 },
    {
      path: '/profile', icon: UserCircleIcon, label: 'Profile', badge: 0
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-16">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-deep-purple/95 backdrop-blur-lg border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-4">
            {menuItems.map(({ path, icon: Icon, label, badge }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative flex flex-col items-center space-y-1 transition-colors duration-200 ${isActive ? 'text-menu-active' : 'text-gray-400 hover:text-menu-hover'
                    }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{label}</span>
                  {badge > 0 && (
                    <Badge
                      count={badge}
                      variant="error"
                      className="absolute -top-1 -right-1"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
