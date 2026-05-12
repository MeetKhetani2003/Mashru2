import mongoose, { Schema, model, models } from 'mongoose';

const TestimonialSchema = new Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  company: { type: String, required: true },
  initial: { type: String, required: true },
  rating: { type: Number, default: 5 },
  date: { type: String, required: true },
  partnerSince: { type: String },
  volume: { type: String },
  location: { type: String },
  order: { type: Number, default: 0 }
});

const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);

export default Testimonial;
