import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['WASH', 'DRY', 'IRON', 'FOLD', 'DELIVERY']
  },
  duration: {
    type: Number, // duration in hours
    required: true,
    min: 1
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

export default Service; 