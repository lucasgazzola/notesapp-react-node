import express from 'express';
import cors from 'cors';
import path from 'path';
import notesRoutes from './routes/notesRoutes';

import './config/dotenv';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', notesRoutes);

// Static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Uncomment if using a single-page application
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/frontend/dist', 'index.html'));
// });

export default app;
