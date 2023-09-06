import DTemplates from '../constants/DTemplates.js';
import MailingService from '../services/MailingService.js';
import { generateToken } from '../services/auth.js';

const register = async (req, res) => {
  const mailingService = new MailingService();
  try {
    const result = await mailingService.sendMail(
      req.user.email,
      DTemplates.WELCOME,
      { user: req.user }
    );
    console.log(result);
    res.sendSuccess('Registered');
  } catch (error) {
    res.sendInternalError(error);
  }
};

const login = (req, res) => {
  try {
    console.log(req.user);
    const token = generateToken(req.user);
    res
      .cookie('authToken', token, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
      })
      .sendSuccess('Logged In');
  } catch (error) {
    console.log(error);
  }
};

export default {
  login,
  register,
};
