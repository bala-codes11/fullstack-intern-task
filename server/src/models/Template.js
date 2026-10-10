import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Template name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Template description is required'],
      trim: true,
    },
    thumbnail_url: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
      trim: true,
      validate: {
        validator: (value) => {
          try {
            const url = new URL(value);
            return ['http:', 'https:'].includes(url.protocol);
          } catch {
            return false;
          }
        },
        message: 'Enter a valid HTTP or HTTPS thumbnail URL',
      },
    },
    category: {
      type: String,
      required: [true, 'Template category is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Template', templateSchema);