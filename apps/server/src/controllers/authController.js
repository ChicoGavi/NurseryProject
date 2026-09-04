// IMPORT SERVICES
import { registerService } from '../services/authService.js';

import validateUser from '../utils/validateData.js';

export const register = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ error: 'Complete the fields!' });
    const { email, password, fullName } = req.body;
    const validations = validateUser(email, fullName, password);

    if (!validations.isValid)
      return res.status(400).json({ error: validations.errors });

    await registerService(email, password, fullName);

    return res.status(201).json({ message: 'User registered with success!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
