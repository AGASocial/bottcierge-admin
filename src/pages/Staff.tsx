import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { StaffStatus, Staff } from "../types";
import {
  fetchStaffMembersFromVenue,
  updateStaffStatus,
} from "../store/slices/staffSlice";
import type { AppDispatch } from "../store";
import { formatTime, getDayName } from "@/utils/orderConstants";

const Servers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { staffMembers, loading, error } = useSelector(
    (state: RootState) => state.staff
  );

  // useEffect(() => {
  //   dispatch(fetchStaff());
  // }, [dispatch]);

  const getStatusColor = (status: StaffStatus): string => {
    const colors: Record<StaffStatus, string> = {
      [StaffStatus.ACTIVE]: "bg-green-500",
      [StaffStatus.INACTIVE]: "bg-gray-500",
      [StaffStatus.ON_BREAK]: "bg-yellow-500",
      [StaffStatus.OFF_DUTY]: "bg-red-500",
      [StaffStatus.SICK]: "bg-blue-500",
      [StaffStatus.VACATION]: "bg-purple-500",
    };
    return colors[status];
  };

  const handleStatusChange = async (
    staffId: string,
    newStatus: StaffStatus
  ) => {
    try {
      await dispatch(
        updateStaffStatus({ staffId, status: newStatus })
      ).unwrap();
    } catch (error) {
      console.error("Failed to update staffMember status:", error);
    }
  };

  const ServerCard: React.FC<{ staffMember: Staff }> = ({ staffMember }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="glass-card p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{staffMember.firstName}</h3>
            <p className="text-sm text-gray-300">{staffMember.email}</p>
            <p className="text-sm text-gray-300">{staffMember.phoneNumber}</p>
          </div>
          <div className="flex flex-col items-end relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                staffMember.status
              )} text-white hover:opacity-90 transition-opacity`}
            >
              {staffMember.status}
            </button>
            {isOpen && (
              <div className="absolute top-8 right-0 z-10 w-48 py-1 bg-deep-blue border border-white/100 rounded-lg shadow-lg">
                {Object.values(StaffStatus).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      handleStatusChange(staffMember.id, status);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-sm text-left text-white bg-deep-blue hover:bg-white/100 ${
                      staffMember.status === status ? "bg-white/50" : ""
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
            {staffMember.sections.map((section) => (
              <span
                key={section}
                className="bg-electric-blue/40 text-electric-white px-2 py-1 rounded text-sm"
                title={section}
              >
                {section}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="font-semibold mb-2">Performance Metrics</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-300">Orders Served</p>
              <p className="text-lg font-semibold">
                {staffMember.metrics.ordersServed}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Average Rating</p>
              <p className="text-lg font-semibold">
                {staffMember.metrics.averageRating.toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Total Sales</p>
              <p className="text-lg font-semibold">
                ${staffMember.metrics.totalSales.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h4 className="text-sm font-semibold text-electric-blue mb-1">
            Schedule
          </h4>
          {staffMember.schedule.map((shift, index) => (
            <div key={index} className="text-sm text-gray-300">
              {getDayName(shift.dayOfWeek)}: {formatTime(shift.start)} -{" "}
              {formatTime(shift.end)}
            </div>
          ))}
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
        <div className="glass-card p-4 text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Server Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staffMembers.map((staffMember) => (
          <ServerCard key={staffMember.id} staffMember={staffMember} />
        ))}
      </div>
    </div>
  );
};

export default Servers;
