import mongoose from 'mongoose';

const SubCategotySchema = mongoose.Schema({
    name : { type: String},
    description : { type: String},
    displayed : { type: String, default: 'Yes'},
    // subc: [{
    //   name : { type: String},
    //   description : { type: String},
    // }],
  }, { timestamps: true });
  
  SubCategotySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
  });
  
  
  const SubCategoty = mongoose.model('subcategory', SubCategotySchema)
  

  export default SubCategoty;