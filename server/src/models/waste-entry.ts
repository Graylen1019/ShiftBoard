import mongoose, { Schema, Document } from "mongoose";

export interface IWasteEntry extends Document {
  shift: mongoose.Types.ObjectId;
  category: "food" | "condiments" | "paper" | "other";
  item: string;
  quantity: number;
  unit: "cases" | "sleeves" | "each" | "bags" | "oz" | "lbs";
  note?: string;
  createdAt: Date;
}

const WasteEntrySchema: Schema = new Schema({
  shift: { type: Schema.Types.ObjectId, ref: "Shift", required: true },
  category: {
    type: String,
    enum: ["food", "condiments", "paper", "other"],
    required: true,
  },
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: {
    type: String,
    enum: ["cases", "sleeves", "each", "bags", "oz", "lbs"],
    required: true,
  },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWasteEntry>("WasteEntry", WasteEntrySchema);
