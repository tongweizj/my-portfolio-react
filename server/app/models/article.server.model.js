const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank',
  },
  content: {
    type: String,
    default: '',
    trim: true,
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  slug: { type: String, unique: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
});
mongoose.model('Article', ArticleSchema);
