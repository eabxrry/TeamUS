const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const { authMiddleware } = require('./src/middleware/authMiddleware');
const { requireAdmin } = require('./src/middleware/authMiddleware');
const userRoutes = require('./src/routes/userRoutes');
const dataRoutes = require('./src/routes/dataRoutes')
const groupeRoutes = require('./src/routes/groupRoutes')
const studentRoutes = require('./src/routes/studentRoutes')
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

const allowedOrigins = process.env.FRONTEND_URL
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());




app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groupes', groupeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/data', dataRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});



