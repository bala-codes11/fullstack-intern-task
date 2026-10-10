import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
  },
  { timestamps: true }
);

favoriteSchema.index(
  { user: 1, template: 1 },
  { unique: true }
);

export default mongoose.model('Favorite', favoriteSchema);