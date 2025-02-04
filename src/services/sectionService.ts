import { Section, Table, TableStatus, TableType } from "../types";

// Mock data for development
const mockSections: Section[] = [
  {
    id: "1",
    name: "VIP Area",
    description: "Premium seating area",
    type: "VIP",
    isActive: true,
    tables: [
      {
        id: "1",
        number: "VIP-1",
        status: TableStatus.AVAILABLE,
        location: {
          floor: 0,
          position: "",
          coordinates: {
            x: 10,
            y: 10,
          },
        },
        capacity: {
          minimum: 2,
          maximum: 6,
        },
        section: "Bar",
        tableType: TableType.ROUND,
        minimumSpend: 1000,
        venueId: "",
        qrCode: "",
        category: "regular",
        reservation: null,
        currentOrder: null,
        reservationHistory: [],
        userId: "",
      },
    ],
    position: {
      x: 0,
      y: 0,
      width: 300,
      height: 200,
    },
  },
];

export const sectionService = {
  getSections: async (): Promise<Section[]> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockSections);
      }, 500);
    });
  },

  createSection: async (section: Omit<Section, "id">): Promise<Section> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSection = {
          ...section,
          id: Math.random().toString(36).substr(2, 9),
        };
        mockSections.push(newSection);
        resolve(newSection);
      }, 500);
    });
  },

  updateSection: async (section: Section): Promise<Section> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockSections.findIndex((s) => s.id === section.id);
        if (index !== -1) {
          mockSections[index] = section;
        }
        resolve(section);
      }, 500);
    });
  },

  deleteSection: async (sectionId: string): Promise<void> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockSections.findIndex((s) => s.id === sectionId);
        if (index !== -1) {
          mockSections.splice(index, 1);
        }
        resolve();
      }, 500);
    });
  },

  updateTable: async (table: Table): Promise<Table> => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const section = mockSections.find((s) => s.id === table.section);
        if (section) {
          const tableIndex = section.tables.findIndex((t) => t.id === table.id);
          if (tableIndex !== -1) {
            section.tables[tableIndex] = table;
          }
        }
        resolve(table);
      }, 500);
    });
  },
};
