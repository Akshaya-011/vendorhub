const mongoose = require('mongoose');

const builderStateSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
      unique: true,
      index: true
    },
    layout: {
      type: mongoose.Schema.Types.Mixed, // canvas layouts configurations
      default: {}
    },
    sections: {
      type: mongoose.Schema.Types.Mixed, // ordered canvas section components
      default: []
    },
    components: {
      type: mongoose.Schema.Types.Mixed, // customized UI widgets states
      default: {}
    },
    lastSavedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BuilderState', builderStateSchema);
