import mongoose from 'mongoose';

const CategotySchema = mongoose.Schema({
    name : { type: String},
    description : { type: String},
    displayed : { type: String, default: 'Yes'},
    parentId : { type: String},
}, { timestamps: true });

CategotySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Categoty = mongoose.model('category', CategotySchema)

export default Categoty;