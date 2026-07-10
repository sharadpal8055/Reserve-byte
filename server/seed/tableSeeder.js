import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";

import Table from "../models/table.model.js";

const seedTables = async () => {
  try {
    await connectDB();

    await Table.deleteMany();

    await Table.insertMany([
      {
        tableNumber: 1,
        capacity: 2,
      },

      {
        tableNumber: 2,
        capacity: 4,
      },

      {
        tableNumber: 3,
        capacity: 4,
      },

      {
        tableNumber: 4,
        capacity: 6,
      },

      {
        tableNumber: 5,
        capacity: 8,
      },
    ]);

    console.log("Tables inserted");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedTables();
