import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { AuthenticationError } from 'apollo-server-express';

import User from '../models/user'
class Jwt {
  static issueToken(payload) {
    return jwt.sign(payload, SECRET);
  }
  static verifyToken(token) {
    return jwt.verify(token, SECRET);
  }

  // static async verifyToken (req, requireAuth=false,res) {
  //   // return jwt.verify(token, SECRET);
  //   const header = req.headers.authorization;
  //   if (header) {
  //     // const token = header.replace("Bearer ", "");
  //     const token = jwt.verify(header, SECRET);
  //     let user = await User.find({_id:token.userId});
  //     if (!user) {
  //     throw new AuthenticationError("Invalid user.");
  //     }
  //     return user;
  //   }
  //   if (requireAuth) {
  //     return res.status(401).send({ auth: false, message: 'No Authorization header provided.' });
  //     // throw new AuthenticationError("You must be logged in.");
  //   }
  //   return null;
  
  // };
}

export default Jwt;
