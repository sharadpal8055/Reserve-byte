import Table from "../models/table.model.js";

// CREATE TABLE

export const createTable = async (req, res, next) => {
  try {
    const { tableNumber, capacity } = req.body;

    // validation

    if (!tableNumber || !capacity) {
      return res.status(400).json({
        success: false,

        message: "Table number and capacity required",
      });
    }

    // duplicate check

    const existingTable = await Table.findOne({
      tableNumber,
    });

    if (existingTable) {
      return res.status(400).json({
        success: false,

        message: "Table number already exists",
      });
    }

    const table = await Table.create({
      tableNumber,

      capacity,
    });

    res.status(201).json({
      success: true,

      table,
    });
  } catch (error) {
    next(error);
  }
};

// GET TABLES

export const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find();

    res.json({
      success: true,

      tables,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE TABLE

export const updateTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    if (!table) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    res.json({
      success: true,

      table,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE TABLE

export const deleteTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);

    if (!table) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    res.json({
      success: true,

      message: "Table removed",
    });
  } catch (error) {
    next(error);
  }
};
