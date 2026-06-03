import { Request, Response } from "express";
import Task from "../models/task";

export const getTasksByShift = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { shiftId } = req.params;

    const tasks = await Task.find({ shift: shiftId });

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, skipReason } = req.body;

    if (status === "skipped" && !skipReason) {
      res
        .status(400)
        .json({ message: "Skip reason is required when skipping a task" });
      return;
    }

    const task = await Task.findByIdAndUpdate(
      id,
      {
        status,
        skipReason: skipReason || undefined,
        completedAt: status === "complete" ? new Date() : undefined,
      },
      { new: true },
    );

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};
