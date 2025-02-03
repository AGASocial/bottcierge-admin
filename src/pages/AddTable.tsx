import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TableCellsIcon } from "@heroicons/react/24/outline";
import { TableStatus, TableType, type Table } from "../types";
import type { RootState } from "../store";

const SECTIONS = [
  { id: "main_floor", name: "Main Floor" },
  { id: "patio", name: "Patio" },
  { id: "bar", name: "Bar" },
];

const AddTable: React.FC = () => {
  const navigate = useNavigate();
  const { tableId } = useParams();
  const { tables } = useSelector((state: RootState) => state.table);
  const { currentVenue } = useSelector((state: RootState) => state.venue);
  const [initialValues, setInitialValues] = useState<Partial<Table> | null>(
    null
  );

  useEffect(() => {
    if (tableId && currentVenue) {
      const table = tables.find((t) => t.id === tableId);
      if (table) {
        setInitialValues(table);
      } else {
        // If table not found, redirect to tables list
        navigate("/profile/tables");
      }
    }
  }, [tableId, currentVenue, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const tableData: Partial<Table> = {
      id: tableId || Math.random().toString(36).substring(7).toUpperCase(),
      number: formData.get("number") as string,
      capacity: {
        minimum: Number(formData.get("capacity.minimum")),
        maximum: Number(formData.get("capacity.maximum")),
      },
      section: formData.get("section") as string,
      tableType: formData.get("tableType") as TableType,
      location: {
        floor: Number(formData.get("floor")),
        position: formData.get("position") as string,
        coordinates: {
          x: 0,
          y: 0,
        },
      },
      minimumSpend: Number(formData.get("minimumSpend")),
      status: TableStatus.AVAILABLE,
    };

    // TODO: Implement save/update table action
    console.log(tableId ? "Updating table:" : "Adding table:", tableData);
    navigate("/profile/tables");
  };

  const handleCancel = () => {
    navigate("/profile/tables");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <TableCellsIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold">
            {tableId ? "Edit Table" : "Add New Table"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6">
            <div className="space-y-6">
              {/* Table Number */}
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Table Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  defaultValue={initialValues?.number || ""}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
              </div>

              {/* Capacity */}
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Capacity (guests)
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity.minimum"
                  min="1"
                  defaultValue={initialValues?.capacity?.minimum || ""}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
                <input
                  type="number"
                  id="capacity"
                  name="capacity.maximum"
                  min="1"
                  defaultValue={initialValues?.capacity?.minimum || ""}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                />
              </div>

              {/* Section */}
              <div>
                <label
                  htmlFor="section"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Section
                </label>
                <select
                  id="section"
                  name="section"
                  defaultValue={initialValues?.section || ""}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                >
                  {SECTIONS.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shape */}
              <div>
                <label
                  htmlFor="tableType"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Table Shape
                </label>
                <select
                  id="tableType"
                  name="tableType"
                  defaultValue={initialValues?.tableType || ""}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
                >
                  {Object.values(TableType).map((key, value) => (
                    <option key={key} value={value}>
                      value
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimum Spend */}
              <div>
                <label
                  htmlFor="minimumSpend"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Minimum Spend ($)
                </label>
                <input
                  type="number"
                  id="minimumSpend"
                  name="minimumSpend"
                  min="0"
                  defaultValue={initialValues?.minimumSpend || "100"}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
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
              {tableId ? "Save Changes" : "Add Table"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTable;
