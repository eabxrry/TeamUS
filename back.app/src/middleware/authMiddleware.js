const jwt = require('jsonwebtoken');
const JWT_SECRET = !process.env.JWT_SECRET ? () => { throw new Error('JWT_SECRET manquant') } : process.env.JWT_SECRET;
const User = require('../model/User')

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id)
    req.user = user; // id et username
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé' });
  }
  next();
};

module.exports = { authMiddleware, requireAdmin };
