import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";

import User from "../models/user.model.js";

const createAdmin = async () => {
  try {
    // connect database

    await connectDB();

    // check existing admin

    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("Admin already exists");

      process.exit(0);
    }

    // create admin

    const admin = await User.create({
      name: process.env.ADMIN_NAME,

      email: process.env.ADMIN_EMAIL,

      password: process.env.ADMIN_PASSWORD,

      role: "admin",
    });

    console.log(
      `
Admin Created Successfully:

Email: ${admin.email}

Role: ${admin.role}
`,
    );

    process.exit(0);
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

createAdmin();
