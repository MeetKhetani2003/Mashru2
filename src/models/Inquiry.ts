import mongoose, { Schema, model, models } from 'mongoose';

const InquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['New', 'Responded', 'Closed'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = models.Inquiry || model('Inquiry', InquirySchema);

export default Inquiry;
