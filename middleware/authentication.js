import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('Not authorized to access this route');
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { rol } = decoded;
    if (rol !== 'admin') {
      throw new Error(
        `Not authorized to access this route cause your rol is not allowed ${rol}`
      );
    }

    next();
  } catch (error) {
    throw new Error(`Not authorized to access this route: ${error.message}`);
  }
};

export default authMiddleware;
