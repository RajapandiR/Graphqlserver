import { SECRET } from '../config';
import User  from "../models/user";
import jwt from 'jsonwebtoken';

import { AuthenticationError } from 'apollo-server-express';

const getAuthUser = async (req) => {
	const header = req.headers.authorization;
    if (header) {
      // const token = header.replace("Bearer ", "");
      const token = jwt.verify(header, SECRET);
      let user = await User.find({_id:token.userId});
      // console.log("User", user);
      if (!user) {
      throw new AuthenticationError("Invalid user.");
      }
      return user;
    }
    if (requireAuth) {
      throw new AuthenticationError("You must be logged in.");
    }
    return null;
  };

export default getAuthUser;