const mongoose = require('mongoose');

const SamethaSchema = new mongoose.Schema(
  {
    samethaTelugu: {
      type: String,
      required: [true, 'Telugu sametha is required'],
      trim: true,
    },
    samethaEnglish: {
      type: String,
      trim: true,
      default: '',
    },
    meaningTelugu: {
      type: String,
      required: [true, 'Telugu meaning is required'],
      trim: true,
    },
    meaningEnglish: {
      type: String,
      trim: true,
      default: '',
    },
    explanationTelugu: {
      type: String,
      required: [true, 'Telugu explanation is required'],
      trim: true,
    },
    exampleTelugu: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      enum: ['life', 'wisdom', 'humor', 'experience', 'education', 'work', 'family', 'nature', 'other'],
      default: 'other',
    },
    tags: {
      type: [String],
      default: [],
    },
    hasEnglish: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Text index for full-text search
SamethaSchema.index({
  samethaTelugu: 'text',
  meaningTelugu: 'text',
  explanationTelugu: 'text',
  samethaEnglish: 'text',
  meaningEnglish: 'text',
});

module.exports = mongoose.model('Sametha', SamethaSchema);
