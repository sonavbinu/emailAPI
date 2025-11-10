import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import emailRoutes from './routes/emailRoutes';
import { verifyEmailConnection } from './config/email';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

verifyEmailConnection();

// Middlewares
app.use(
  cors({
    origin: '*', // Allow all origins (you can restrict this later)
    credentials: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root
app.get('/', async (_req, res) => {
  res.send('Hai there, API is running...');
});

// Swagger Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Email API Routes
app.use('/api/email', emailRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `API Documentation available at http://localhost:${PORT}/api-docs`
  );
});
