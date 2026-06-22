import { Request, Response } from "express";
import Shift from "../models/shift";
import Task from "../models/task";

export const getShifts = async (
    req: Request,
    res: Response
): Promise<void> => {
  try {
    const shifts = await Shift.find().sort({ startTime: -1 });
    res.status(200).json({ shifts });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve shifts", error });
  }
};

export const getShiftById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const shift = await Shift.findById(id);

    if (!shift) {
      res.status(404).json({ message: "Shift not found" });
      return;
    }

    res.status(200).json({ shift });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve shift", error });
  }
};
export const openShift = async (
    req: Request,
    res: Response
): Promise<void> => {
  try {
    const { managerName, date } = req.body;

    const shift = await Shift.create({
      managerName,
      date,
      status: "open",
      startTime: new Date(),
    });

    const taskTemplates = [
      { category: "opening", description: "Check Temperatures" },
      { category: "opening", description: "Stock Prep Stations" },
      { category: "mid-shift", description: "Restock supplies" },
      { category: "mid-shift", description: "Check food levels" },
      { category: "temperature checks", description: "Log fridge temps" },
      { category: "temperature checks", description: "Log freezer temps" },
      { category: "closing", description: "Clean all stations" },
      { category: "closing", description: "Complete waste log" },
    ];

    const tasks = taskTemplates.map((task) => ({ ...task, shift: shift._id }));
    await Task.insertMany(tasks);

    res
      .status(201)
      .json({ message: "Shift opened successfully", shift });
  } catch (error) {
    res.status(500).json({ message: "Failed to open shift", error });
  }
};

export const closeShift = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const shift = await Shift.findByIdAndUpdate(
      id,
      {
        status: "closed",
        endTime: new Date(),
      },
      { returnDocument: "after" },
    );

    if (!shift) {
      res.status(404).json({ message: "Shift not found" });
      return;
    }

    res.status(200).json({ message: "Shift closed successfully", shift });
  } catch (error) {
    res.status(500).json({ message: "Failed to close shift", error });
  }
};
