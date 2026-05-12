import mongoose, { Schema, model, models } from 'mongoose';

const ServiceSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  iconName: { type: String, required: true },
  benefits: [{ type: String }],
  process: [{
    step: { type: String, required: true },
    desc: { type: String, required: true }
  }],
  order: { type: Number, default: 0 }
});

const Service = models.Service || model('Service', ServiceSchema);

export default Service;
