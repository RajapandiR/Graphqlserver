import bcrypt from 'bcryptjs';

class BcryptHelper {
  static hash(param) {
    return bcrypt.hash(param, 8);
  }

  static compare(param, hashValue) {
    return bcrypt.compare(param, hashValue);
  }
}

export default BcryptHelper;
