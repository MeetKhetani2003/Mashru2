import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  image: { type: String, required: true },
  features: [{ type: String }],
  specifications: [{
    label: { type: String, required: true },
    value: { type: String, required: true }
  }],
  varieties: [{ type: String }],
  order: { type: Number, default: 0 }
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
