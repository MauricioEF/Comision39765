import config from '../config/config.js';
import DTemplates from '../constants/DTemplates.js';
import UserTokenDTO from '../dto/User/TokenDTO.js';
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
    if(req.user.temporalPassword){
      const tempToken = generateToken({email:req.user.email});
      return res.cookie('temp',tempToken).send({status:"success",redirect:'/password-restore'})
    }
    const tokenizedUser = UserTokenDTO.getFrom(req.user);
    const token = generateToken(tokenizedUser);
    res
      .cookie(config.jwt.COOKIE, token, {
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
