import { Request, Response } from "express";
import WasteEntry from "../models/waste-entry";

export const addWasteEntry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const shiftId = req.params.shiftId as string;
    const { category, item, quantity, unit, note } = req.body;

    if (quantity <= 0) {
      res.status(400).json({ message: "quantity must be greater then zero!" });
      return;
    }

    const entry = await WasteEntry.create({
      shift: shiftId,
      category,
      item,
      quantity,
      unit,
      note,
    });

    res.status(201).json({ message: "Waste entry added successfully", entry });
  } catch (error) {
    res.status(500).json({ message: "Failed to add waste entry", error });
  }
};

export const getWasteEntriesByShift = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const shiftId = req.params.shiftId as string;

    const entries = await WasteEntry.find({ shift: shiftId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ entries });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve waste entries", error });
  }
};

export const deleteWasteEntry = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    const entry = await WasteEntry.findByIdAndDelete(id);

    if (!entry) {
      res.status(404).json({ message: "Waste entry not found" });
      return;
    }

    res.status(200).json({ message: "Waste entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete waste entry", error });
  }
};
