import mongoose from 'mongoose';
import Bcrypt from '../utils/bcrypt';

const UserSchema = mongoose.Schema({
    firstname : { type: String},
    lastname : { type: String},
    username : { type: String},
    role :  { type: mongoose.Schema.ObjectId, ref: 'role'},
    email : { type: String},
    password: { type: String},
    addressLine : { type: String},
    city : { type: String},
    zipcode : { type: String},
    country : { type: String},
    status : { type: Boolean, default: 1},
}, { timestamps: true });

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});


UserSchema.pre('save', async function save() {
  if (!this.isModified('password') || !this.password) return true;
  const password = await Bcrypt.hash(this.password);
  this.password = password;
  return true;
});
UserSchema.pre('findOneAndUpdate', async function update() {
  // const password = await Bcrypt.hash(this.password);
  // this._update.password = Bcrypt.hash(this._update.password)
  // this.password =await Bcrypt.hash(this.password);
  // return true;
  this._update.password = await Bcrypt.hash(this._update.password)
});

const User = mongoose.model('user', UserSchema)

export default User;