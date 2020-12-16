import mongoose from 'mongoose';

const AttributesSchema = mongoose.Schema({
    brand: { type: String},
    dimension: { type: String},
    color: { type: String},
    material: { type: String},
    hardware: { type: String},
}, { timestamps: true });

AttributesSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Attributes = mongoose.model('attribute', AttributesSchema)

export default Attributes;