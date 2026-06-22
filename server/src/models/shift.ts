import mongoose, { Schema, Document } from "mongoose";

export interface IShift extends Document {
  managerName: string;
  date: Date;
  status: "open" | "closed";
  startTime: Date;
  endTime: Date;
}

const ShiftSchema: Schema = new Schema({
  managerName: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["open", "closed"], default: "closed" },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
});

export default mongoose.model<IShift>("shift", ShiftSchema);
