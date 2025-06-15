import mongoose from 'mongoose';

// Define the Analysis schema
const AnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      maxlength: [10000, 'Text cannot exceed 10,000 characters'],
    },
    // Computed field for text length
    textLength: {
      type: Number,
      default: function() {
        return this.text ? this.text.length : 0;
      },
    },
    analysisType: {
      type: String,
      enum: ['pragmatic', 'conversational', 'semantic'], // Updated to semantic
      required: true,
    },
    results: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    suggestions: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    // Optional prompt field for storing the analysis prompt
    prompt: {
      type: String,
      default: null,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function(tags) {
          return tags.length <= 10; // Limit number of tags
        },
        message: 'Cannot have more than 10 tags'
      }
    },
    notes: {
      type: String,
      default: '',
      maxlength: [1000, 'Notes cannot exceed 1,000 characters'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create indexes for better query performance
AnalysisSchema.index({ userId: 1, createdAt: -1 });
AnalysisSchema.index({ userId: 1, analysisType: 1 });
AnalysisSchema.index({ userId: 1, isFavorite: 1 });
AnalysisSchema.index({ userId: 1, tags: 1 });
AnalysisSchema.index({ userId: 1, text: 'text' }); // Text search index

// Virtual property for truncated text preview
AnalysisSchema.virtual('textPreview').get(function() {
  const maxLength = 100;
  if (this.text && this.text.length > maxLength) {
    return this.text.substring(0, maxLength) + '...';
  }
  return this.text;
});

// Ensure virtuals are included when converting to JSON
AnalysisSchema.set('toJSON', { virtuals: true });
AnalysisSchema.set('toObject', { virtuals: true });

// Pre-save middleware to update textLength
AnalysisSchema.pre('save', function(next) {
  if (this.isModified('text')) {
    this.textLength = this.text ? this.text.length : 0;
  }
  next();
});

// Method to update user's usage statistics (optional)
AnalysisSchema.post('save', async function(doc) {
  try {
    // Only update stats for new documents, not updates
    if (doc.isNew) {
      // Get the User model (if you have one)
      const User = mongoose.models.User || null;
      
      if (User) {
        await User.findByIdAndUpdate(
          doc.userId,
          {
            $inc: { 'usage.analysisCount': 1 },
            $set: { 'usage.lastAnalysisDate': new Date() },
          },
          { new: true }
        );
      }
    }
  } catch (error) {
    console.error('Error updating user statistics:', error);
    // Don't throw error here as it would prevent analysis save
  }
});

// Static method to find by user with pagination
AnalysisSchema.statics.findByUserPaginated = function(userId, options = {}) {
  const {
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    filter = {}
  } = options;
  
  const skip = (page - 1) * limit;
  const query = { userId, ...filter };
  
  return this.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

// Check if we already have the model to prevent overwriting
export default mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);