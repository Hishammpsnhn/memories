// analyticalModel.js
const mongoose = require('mongoose');

const analyticalSchema = new mongoose.Schema(
  {
    location: { type: String, required: true, unique: true },
    visitCount: { type: Number, default: 0 },
  },
  { timestamps: true }  
);

const Analytical = mongoose.model('Analytical', analyticalSchema);

module.exports = Analytical;
