import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  shift: mongoose.Types.ObjectId;
  category: "opening" | "mid-shift" | "closing" | "temperature checks";
  description: string;
  status:
    | "pending action"
    | "in progress"
    | "complete"
    | "skipped"
    | "flagged";
  skipReason?: string;
  completedAt?: Date;
}

const TaskSchema: Schema = new Schema({
  shift: { type: Schema.Types.ObjectId, ref: "Shift", required: true },
  category: {
    type: String,
    enum: ["opening", "mid-shift", "closing", "temperature checks"],
    required: true,
  },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: [
        "pending action",
        "in progress",
        "complete",
        "skipped",
        "flagged"
    ],
    default: "pending action",
  },
  skipReason: { type: String },
  completedAt: { type: Date },
});

export default mongoose.model<ITask>("Task", TaskSchema);
