const READING_TABLES = {
  R1: { capacity: 1, type: "window-seat" },
  R2: { capacity: 1, type: "window-seat" },

  R3: { capacity: 2, type: "reading-nook" },
  R4: { capacity: 2, type: "reading-nook" },

  R5: { capacity: 4, type: "group-table" },
  R6: { capacity: 4, type: "group-table" },
  R7: { capacity: 4, type: "group-table" },

  R8: { capacity: 6, type: "group-table" },
  R9: { capacity: 6, type: "group-table" },
  R10: { capacity: 6, type: "group-table" },
};

const EATING_TABLES = {
  E1: { capacity: 2, type: "window-dining" },
  E2: { capacity: 2, type: "window-dining" },

  E3: { capacity: 4, type: "dining-place" },
  E4: { capacity: 4, type: "dining-place" },
  E5: { capacity: 4, type: "dining-place" },

  E6: { capacity: 6, type: "lounge-table" },
  E7: { capacity: 6, type: "lounge-table" },

  E8: { capacity: 8, type: "lounge-table" },
  E9: { capacity: 8, type: "lounge-table" },

  E10: { capacity: 10, type: "lounge-table" },
  E11: { capacity: 10, type: "lounge-table" },
  E12: { capacity: 10, type: "lounge-table" },
};

module.exports = { READING_TABLES, EATING_TABLES };
