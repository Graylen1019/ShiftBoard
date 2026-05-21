Project Recommendation: ShiftBoard (MERN + AWS Edition)
Graylen Bigelow | Frontend Engineer | May 2026

Why This Project
Your background before tech is food service management. You spent three years working at the operational level inside a quick-service restaurant chain: managing inventory, tracking food cost targets, monitoring waste, running team schedules, and dealing with the real consequences of process failures. You were the floor manager, not the head office analyst or the supply chain planner. That distinction matters for how this project is scoped.

The problem that exists at the floor manager level is operational visibility and closing fatigue. Every shift involves tracking tasks, logging waste, checking temperatures, and recording what went wrong. Most of this is done on paper or in disconnected spreadsheets, usually at 11:00 PM when a manager is exhausted. Enterprise restaurant management systems are franchise-mandated and read-only to individual managers. Generic task apps have no concept of shift structure, food-service compliance, or kitchen realities.

ShiftBoard solves this. It is a real-time shift operations dashboard for a quick-service restaurant manager. This project was chosen because it is rooted in the specific daily workflow you operated. By using your target stack (MERN + AWS + Jest), you aren't just building a CRUD form app; you are building an intelligent tool that uses cloud media storage and AI data parsing to eliminate late-night manual data entry.

The Problem
A shift manager walks into every shift with a list of responsibilities and almost no consolidated view of how the shift is performing in real time. Food cost variance, waste events, temperature log compliance, and task completion all need to be tracked, but the tooling available is fragmented: printed checklists, shared spreadsheets, and verbal handoffs between shifts. At shift close, a manager faces 20 minutes of tedious paperwork when they want to go home.

What does not exist is a smart web app that a manager can open at shift start, update organically via text, photo, or voice throughout the shift, and close out with an AI-synthesized summary to hand to the next person. That is what you are building.

The Product
ShiftBoard consists of an intuitive, mobile-first interface optimized for a manager walking a busy kitchen floor. It features four distinct views:

Shift Overview: Displays real-time shift metrics including time elapsed, automated task completion counters, live waste expense metrics, and safety flags.

Task Checklist: Shift tasks grouped by category (Opening, Mid-shift, Food Safety, Closing). Tasks can be marked complete, skipped with a reason, or flagged.

Smart Logs (The Waste & Handoff Portal): A media-centric upload area. Instead of typing lines of inventory data, managers can drop an image of the day's wasted food items or record a verbal handoff note.

Shift Report: Generated instantly when the shift closes. It compiles calculated task percentages, aggregated waste metrics, active equipment flags, and an AI Insights Summary highlighting critical anomalies or compliance breaches.

The Technical Polish
The AI Pipeline: The backend coordinates with an LLM API to process unstructured inputs. Photos of waste bins or food bins are parsed into structured data arrays, while recorded voice memos are transcribed and audited for operational updates.

7-Day Trend Analytics: A Recharts implementation displays historical data over the trailing 7 shifts, graphing food waste trends and task compliance—something paper logs completely obscure.

Technology Stack
Frontend: React 19 (Vite) with TypeScript + Tailwind CSS & ShadCN/UI. Built completely responsive for mobile/tablet use on the floor.

State Management: Zustand. Manages global active shift status across all views cleanly, avoiding prop-drilling without Redux-level overhead.

Backend: Node.js with Express. Handles traditional REST routes alongside the multi-part data processing pipelines.

Database: MongoDB via Mongoose. The document model is exceptionally well-suited here; shifts, dynamic checklists, and unstructured AI JSON responses can be natively indexed, stored, and queried without strict relational bottlenecks.

Cloud Storage: Amazon S3. Hosts raw image uploads (waste verification, broken equipment pictures) and audio handoff streams safely with secure URLs mapped back to the database documents.

Testing: Jest + supertest. Closes your primary testing gap. Focuses heavily on backend route validation, data parsing logic, and the mock-testing of third-party API integrations.

CI/CD: GitHub Actions executing your Jest testing suite on every push.

Deployment: Frontend hosted on Vercel/Netlify; backend Express engine running via cloud provider (Render/Railway), and database hosted via MongoDB Atlas.

How It Closes Your Skill Gaps
Jest and Integration Testing
The data-mapping layer is a fantastic testing canvas. You will write 12–15 focused tests using Jest and supertest covering:

Route guards ensuring invalid shift structures return proper error codes (400 Bad Request).

Pure logical functions responsible for calculating shift summary data (percentages, math validations).

API Mocking: Writing explicit Jest mock environments to intercept and simulate AI responses. This proves you can test modern architectures without incurring live external API billing or relying on slow network connections during CI steps.

Zustand Architecture
Managing an active shift requires shared real-time values. If a user uploads an asset or checks a task, the Overview counters must react instantly. You'll build a central store (useShiftStore) that masters active states, learning realistic engineering patterns like store selectors, optimistic UI updates, and handling asynchronous data streams gracefully.

Cloud Media & AI Infrastructure Execution
By integrating Amazon S3 and an external LLM parser into a custom Express app, you move well beyond standard bootcamp tutorials. You will be able to speak extensively during technical screens about multi-part form payloads, secure asset URLs, environment variable safety, prompt engineering guidelines, and fallback mechanisms for when an external service times out.