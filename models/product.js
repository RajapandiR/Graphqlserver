import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = mongoose.Schema({
    name: { type: String},
    sku: { type: String},
    // images: { type: String},
    category :  { type: mongoose.Schema.ObjectId, ref: 'category'},
    price: { type: String},
    weight:{ type: String},
    quantity : { type: String},
    description : { type: String},
    attributes :  { type: mongoose.Schema.ObjectId, ref: 'attribute'},
    // attributes: [{
    //   brand: { type: String},
    //   dimension: { type: String},
    //   color: { type: String},
    //   material: { type: String},
    //   hardware: { type: String},
    // }],
    availability : { type: String, enum : ['Enabled', 'Disable'], default: 'Enabled'},
    stock : { type: Boolean, default: '1'},
    status : { type: Boolean, default: '1'},
}, { timestamps: true });

ProductSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});
const Product = mongoose.model('product', ProductSchema)

export default Product;



