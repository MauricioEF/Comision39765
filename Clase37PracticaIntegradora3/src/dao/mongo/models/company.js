import mongoose from 'mongoose';

const collection = 'Companies';

const schema = new mongoose.Schema(
  {
    name: String,
    legal_name: String,
    plan: {
      type: String,
      enum: ['TEST', 'BASIC', 'PREMIUM'],
      default: 'BASIC',
    },
    status: {
      type: String,
      default: 'active',
    },
    industry: String,
    address: String,
    users: [],
    documents: [],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const companyModel = mongoose.model(collection, schema);

export default companyModel;
