import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchTablesByVenueId, updateTableStatus } from "@/store/slices/tableSlice";

const Tables: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tables } = useSelector((state: RootState) => state.table);
  const { currentVenue } = useSelector((state: RootState) => state.venue);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleStatusChange = async (tableId: string, newStatus: string) => {
    try {
      await dispatch(updateTableStatus({
        tableId,
        status: newStatus,
        venueId: currentVenue?.id || ""
      })).unwrap();
      setOpenDropdownId(null);
    } catch (error) {
      console.error("Failed to update table status:", error);
    }
  };

  useEffect(() => {
    if (currentVenue?.id)
      dispatch(fetchTablesByVenueId(currentVenue?.id || ""));
  }, [currentVenue?.id, dispatch]);

  // Group tables by section
  var tablesBySection: Record<string, typeof tables> = {};
  tables.map((table) => {
    const section = table.section || "other";
    if (!tablesBySection[section]) {
      tablesBySection[section] = [];
    }
  }, {} as Record<string, typeof tables>);

  tables.forEach((table) => {
    if (table.section) {
      tablesBySection[table.section].push(table);
    } else {
      tablesBySection["default_section"].push(table);
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-300";
      case "occupied":
        return "bg-red-500/20 text-red-300";
      case "reserved":
        return "bg-yellow-500/20 text-yellow-300";
      default:
        return "bg-gray-500/20 text-gray-300";
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
            {sectionId === "default_section" ? "General Area" : sectionId}{" "}
            <span className="text-gray-400">
              (Min.{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              }).format(currentVenue?.pricingRules[sectionId] || 0)}
              )
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sectionTables.map((table) => (
              <div
                key={table.id}
                onClick={() => setOpenDropdownId(openDropdownId === table.id ? null : table.id)}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/30 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">
                    Table {table.number}
                  </span>
                  <div className="relative">
                    <button
                      
                      className={`px-2 py-1 rounded text-xs  min-w-20 ${getStatusColor(table.status)} hover:bg-opacity-90  active:bg-opacity-100 select-none focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                      {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                    </button>
                    {openDropdownId === table.id && (
                      <div className="absolute top-8 right-0 z-10 w-32 py-1 bg-deep-blue border border-white/10 rounded-lg shadow-lg">
                        {["available", "occupied", "reserved"].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(table.id, status)}
                            className={`w-full px-4 py-2 text-xs text-left text-white bg-deep-blue hover:bg-white/10 ${table.status === status ? "bg-white/5" : ""}`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-gray-400">
                  <p>
                    Capacity: {table.capacity.minimum} -{" "}
                    {table.capacity.maximum} guests
                  </p>
                  <p>Table type: {table.tableType}</p>

                  <p>
                    Minimum Spend:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    }).format(currentVenue?.pricingRules[table.section] || 0)}
                  </p>
                  {/* {table.userId && (<p>Assigned to: {table.userId}</p>)} */}
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
