import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  properties: [{
    name: { type: String, required: true },
    values: { type: [String], required: true },  // กำหนดเป็นอาร์เรย์ของ string
  }],
});



export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
