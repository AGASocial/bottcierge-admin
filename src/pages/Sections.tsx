import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import {
  fetchSections,
  createSection,
  updateSection,
  deleteSection,
  updateTable,
  setSelectedSection,
} from "../store/slices/sectionSlice";
import { Section, Table, TableStatus, TableType } from "../types";

const Sections: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sections, selectedSection, loading, error } = useSelector(
    (state: RootState) => state.sections
  );
  const [draggedTable, setDraggedTable] = useState<Table | null>(null);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const handleCreateSection = () => {
    const newSection: Omit<Section, "id"> = {
      name: "New Section",
      description: "",
      type: "GENERAL",
      isActive: true,
      tables: [],
      position: {
        x: 0,
        y: 0,
        width: 200,
        height: 150,
      },
    };
    dispatch(createSection(newSection));
  };

  const handleUpdateSection = (section: Section) => {
    dispatch(updateSection(section));
  };

  const handleDeleteSection = (sectionId: string) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      dispatch(deleteSection(sectionId));
    }
  };

  const handleTableDragStart = (table: Table) => {
    setDraggedTable(table);
  };

  const handleTableDragEnd = (e: React.DragEvent, sectionId: string) => {
    if (draggedTable) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // const updatedTable: Table = {
      //   ...draggedTable,
      //   x,
      //   y,
      //   sectionId,
      // };

      // dispatch(updateTable(updatedTable));
      setDraggedTable(null);
    }
  };

  const handleAddTable = (sectionId: string) => {
    const newTable: Table = {
      id: Math.random().toString(36).substr(2, 9),
      number: `T-${Math.floor(Math.random() * 100)}`,
      status: TableStatus.AVAILABLE,
      capacity: {
        minimum: 2,
        maximum: 6,
      },
      section: sectionId,
      tableType: TableType.ROUND,
      minimumSpend: 1000,
      venueId: "",
      qrCode: "",
      category: "regular",
      location: {
        floor: 0,
        position: "",
        coordinates: {
          x: 0,
          y: 0,
        },
      },
      reservation: null,
      currentOrder: null,
      reservationHistory: [],
    };

    const section = sections.find((s) => s.id === sectionId);
    if (section) {
      const updatedSection: Section = {
        ...section,
        tables: [...section.tables, newTable],
      };
      dispatch(updateSection(updatedSection));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Section Management</h1>
        <button
          onClick={handleCreateSection}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Section
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border rounded-lg p-4 bg-white shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{section.name}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddTable(section.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Add Table
                </button>
                <button
                  onClick={() => handleDeleteSection(section.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">{section.description}</p>
              <p className="text-sm text-gray-500">Type: {section.type}</p>
              <p className="text-sm text-gray-500">
                Tables: {section.tables.length}
              </p>
            </div>

            <div
              className="border rounded-lg p-4 bg-gray-50 relative"
              style={{
                width: "100%",
                height: "200px",
                overflow: "hidden",
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleTableDragEnd(e, section.id)}
            >
              {/* {section.tables.map((table) => (
                <div
                  key={table.id}
                  draggable
                  onDragStart={() => handleTableDragStart(table)}
                  className={`absolute cursor-move bg-white border-2 rounded-full flex items-center justify-center ${
                    table.status === 'occupied'
                      ? 'border-red-500'
                      : table.status === 'reserved'
                      ? 'border-yellow-500'
                      : 'border-green-500'
                  }`}
                  style={
                    left: table.location.coordinates.x,
                    top: table.location.coordinates.y,
                    width: 50, 
                    height: 50,
                  }
                >
                  <div className="text-sm">
                    <div>{table.number}</div>
                    <div className="text-xs">{table.capacity}p</div>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sections;
