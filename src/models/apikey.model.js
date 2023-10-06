const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

var apiKeySchema = new Schema(
  {
    key: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      enum: ["0000", "1111", "2222"],
    },
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

module.exports = model(DOCUMENT_NAME, apiKeySchema);
