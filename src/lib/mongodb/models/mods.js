import mongoose from 'mongoose';

const ModSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minLength: [2, 'Title must be at least 2 characters long'],
      maxLength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minLength: [3, 'Description must be at least 3 characters long'],
      maxLength: [2000, 'Description cannot exceed 2000 characters'],
    },
    downloads: {
      type: String,
      required: [true, 'Download path is required'],
      trim: true,
      validate: {
        validator: function (v) {
          return v.startsWith('/download/');
        },
        message: (props) =>
          `${props.value} is not a valid download path. Must start with /download/`,
      },
    },
    github: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || v.startsWith('https://github.com/');
        },
        message: 'GitHub URL must start with https://github.com/',
      },
    },
    discord: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return (
            !v || v.startsWith('https://discord.gg/') || v === 'placeholder'
          );
        },
        message: 'Discord URL must start with https://discord.gg/',
      },
    },
    tags: {
      type: [String],
      required: [true, 'At least one tag is required'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'At least one tag is required',
      },
      enum: {
        values: [
          'Performance',
          'Graphics',
          'Utility',
          'Dungeons',
          'QOL',
          'OpenSRC',
          'Storage',
          'HUD',
          'Other',
        ],
        message: '{VALUE} is not a supported tag',
      },
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: {
        values: ['Legit', 'Cheat'],
        message: '{VALUE} is not a valid type',
      },
      default: 'Legit',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    downloadCount: {
      type: Number,
      default: 0,
      min: [0, 'Download count cannot be negative'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

ModSchema.index({ title: 1 });
ModSchema.index({ tags: 1 });
ModSchema.index({ type: 1 });
ModSchema.index({ price: 1 });
ModSchema.index({ verified: 1 });

ModSchema.pre('save', function (next) {
  this.tags = [...new Set(this.tags)];
  next();
});

ModSchema.statics.findVerified = function () {
  return this.find({ verified: true });
};

ModSchema.statics.findByTag = function (tag) {
  return this.find({ tags: tag });
};

ModSchema.statics.findFreeMods = function () {
  return this.find({ price: 0 });
};

ModSchema.methods.incrementDownloads = async function () {
  this.downloadCount += 1;
  return this.save();
};

export const Mod = mongoose.models.Mod || mongoose.model('Mod', ModSchema);
