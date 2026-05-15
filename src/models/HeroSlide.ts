import mongoose from 'mongoose';

const HeroSlideSchema = new mongoose.Schema({
  video: {
    type: String,
    required: [true, 'Please provide a video URL'],
  },
  image: {
    type: String,
    required: [true, 'Please provide a poster image URL'],
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  subtitle: {
    type: String,
    required: [true, 'Please provide a subtitle'],
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

export default mongoose.models.HeroSlide || mongoose.model('HeroSlide', HeroSlideSchema);
