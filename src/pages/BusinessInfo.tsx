import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import type { RootState } from '../store';

const BusinessInfo: React.FC = () => {
  const navigate = useNavigate();
  const { currentVenue } = useSelector((state: RootState) => state.venue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save business info
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <BuildingStorefrontIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Business Information</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6">
            <div className="space-y-6">
              {/* Business Name */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  defaultValue={currentVenue?.name || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={currentVenue?.address || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={currentVenue?.description || ''}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
              </div>

              {/* Contact Information */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={currentVenue?.phone || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Business Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={currentVenue?.email || ''}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                  required
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessInfo;
