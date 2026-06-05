import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Shift from "../models/shift";
import Task from "../models/task";
import WasteEntry from "../models/waste-entry";

const getModel = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  return genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
};

export const generateShiftSummary = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const shiftId = req.params.shiftId as string;

    const shift = await Shift.findById(shiftId);
    const tasks = await Task.find({ shift: shiftId });
    const wasteEntries = await WasteEntry.find({ shift: shiftId });

    if (!shift) {
      res.status(404).json({ message: "Shift not found" });
      return;
    }

    const completedTasks = tasks.filter((t) => t.status === "complete").length;
    const skippedTasks = tasks.filter((t) => t.status === "skipped").length;
    const flaggedTasks = tasks.filter((t) => t.status === "flagged").length;
    const totalWaste = wasteEntries.reduce((sum, e) => sum + e.quantity, 0);

    const prompt = `
      You are a restaurant shift assistant. Summarize the following shift data in 3-5 sentences in a professional but conversational tone.
      
      Manager: ${shift.managerName}
      Date: ${shift.date}
      Duration: ${shift.startTime} to ${shift.endTime || "ongoing"}
      Food Cost Variance: ${shift.foodCostVariance ?? "not entered"}
      Tasks: ${completedTasks} completed, ${skippedTasks} skipped, ${flaggedTasks} flagged out of ${tasks.length} total
      Total Waste Quantity: ${totalWaste}
      Waste Entries: ${wasteEntries.map((e) => `${e.quantity} ${e.unit} of ${e.item} (${e.category})`).join(", ")}
    `;

    const result = await getModel().generateContent(prompt);
    const summary = result.response.text();
    res.status(200).json({ summary });

  } catch (error) {
    res.status(500).json({ message: "Failed to generate shift summary", error });
  }
};

export const analyzeWasteTrends = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const wasteEntries = await WasteEntry.find()
      .sort({ createdAt: -1 })
      .limit(50);

    if (wasteEntries.length === 0) {
      res.status(404).json({ message: "No waste entries found" });
      return;
    }

    const prompt = `
      You are a restaurant operations analyst. Based on the following waste log entries, identify the top 2-3 waste trends and suggest one actionable improvement for each.

      Waste entries: ${wasteEntries.map((e) => `${e.quantity} ${e.unit} of ${e.item} (${e.category})`).join(", ")}

      Keep your response concise and practical for a shift manager.
    `;

    const result = await getModel().generateContent(prompt);
    const analysis = result.response.text();
    res.status(200).json({ analysis });

  } catch (error) {
    res.status(500).json({ message: "Failed to analyze waste trends", error });
  }
};

export const suggestTasks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { shiftType } = req.body;

    const prompt = `
      You are a quick-service restaurant operations expert. Suggest 6-8 practical shift tasks for a ${shiftType} shift at a quick-service restaurant.
      
      Return ONLY a JSON array of objects with this exact structure, no extra text:
      [{ "category": "opening" | "mid-shift" | "temperature checks" | "closing", "description": "task description" }]
    `;

    const result = await getModel().generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, "").trim();
    const tasks = JSON.parse(clean);
    res.status(200).json({ tasks });

  } catch (error) {
    res.status(500).json({ message: "Failed to suggest tasks", error });
  }
};

export const generateGreeting = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { managerName, taskCount, timeOfDay } = req.body;

    const prompt = `
      You are a friendly restaurant shift assistant. Generate a short, energetic, and personalized shift opening greeting for a manager.
      
      Manager name: ${managerName}
      Time of day: ${timeOfDay}
      Number of tasks ahead: ${taskCount}
      
      Keep it to 2 sentences max. Be encouraging and specific. Do not use generic phrases like "Let's get started". Make it feel human and warm.
    `;

    const result = await getModel().generateContent(prompt);
    const greeting = result.response.text();
    res.status(200).json({ greeting });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate greeting', error });
  }
};