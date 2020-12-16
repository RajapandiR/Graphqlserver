import mongoose from 'mongoose';

const RoleSchema = mongoose.Schema({
    role : { type: String},
    status : { type: Boolean, default: 1},
}, { timestamps: true });

RoleSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Role = mongoose.model('role', RoleSchema)

export default Role;