import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  CogIcon,
  BuildingStorefrontIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import type { RootState } from '../store';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="glass-card p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-electric-blue flex items-center justify-center">
            <UserCircleIcon className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">Restaurant Administrator</p>
          </div>
        </div>
      </div>

      {/* Admin Sections */}
      <div className="space-y-6">
        {/* Restaurant Settings */}
       

        {/* Operating Hours */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Operating Hours</h2>
            <ClockIcon className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Monday - Friday</span>
              <span className="text-gray-300">11:00 AM - 10:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Saturday</span>
              <span className="text-gray-300">10:00 AM - 11:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Sunday</span>
              <span className="text-gray-300">10:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Restaurant Settings</h2>
            <BuildingStorefrontIcon className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/profile/business-info')}
              className="w-full text-left py-2 hover:text-electric-blue transition-colors"
            >
              Business Information
            </button>
            <button 
              onClick={() => navigate('/profile/hours')}
              className="w-full text-left py-2 hover:text-electric-blue transition-colors"
            >
              Operating Hours
            </button>
            <button 
              onClick={() => navigate('/profile/tables')}
              className="w-full text-left py-2 hover:text-electric-blue transition-colors"
            >
              Table Management
            </button>
            <button className="w-full text-left py-2 hover:text-electric-blue transition-colors">
              Inventory Management
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Account Settings</h2>
            <CogIcon className="w-6 h-6" />
          </div>
          <div className="space-y-4">
            <button className="w-full text-left py-2 hover:text-electric-blue transition-colors">
              Change Password
            </button>
            <button className="w-full text-left py-2 hover:text-electric-blue transition-colors">
              Administrator Access
            </button>
            <button className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
