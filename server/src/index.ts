import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDB();
  if (process.env.GEMINI_API_KEY) {
    console.log('Gemini AI ready');
  } else {
    console.warn('Warning: GEMINI_API_KEY is not set');
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();