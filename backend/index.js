import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  requestType: {
    type: String,
    required: true,
    enum: ['installer', 'patch', 'upgrader']
  },
  patchType: {
    type: String,
    required: function() { return this.requestType === 'patch'; },
    enum: [
      'Product Patch',
      'Product Custom Patch',
      'Product with Product Custom and Product Scheme Patch',
      'Product with Platform tag Patch',
      'Product with Project tag Patch'
    ]
  },
  // Common fields
  tag: String,
  version: String,
  previousVersion: String,
  branch: String,
  masterPRNumber: String,
  repo: String,
  
  // Product Custom Patch fields
  customRepo: String,
  customBranch: String,
  customTag: String,
  customVersion: String,
  previousCustomVersion: String,
  bank: String,
  
  // Scheme Patch fields
  schemeRepo: String,
  schemeTag: String,
  schemeVersion: String,
  schemeBranch: String,
  schemePreviousVersion: String,
  
  // Platform tag Patch fields
  platformRepo: String,
  platformBranch: String,
  platformTag: String,
  platformPreviousTag: String,
  
  // Project tag Patch fields
  projectRepo: String,
  projectName: String,
  projectBranchName: String,
  projectCurrentVersion: String,
  projectPreviousVersion: String,
  
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'processing', 'completed', 'failed']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Request || mongoose.model('Request', requestSchema);

// pages/api/requests/index.js
import dbConnect from '../../../lib/dbConnect';
import Request from '../../../models/Request';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const requests = await Request.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: requests });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const request = await Request.create(req.body);
        res.status(201).json({ success: true, data: request });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

// pages/api/requests/[id].js
import dbConnect from '../../../lib/dbConnect';
import Request from '../../../models/Request';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const request = await Request.findById(id);
        if (!request) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: request });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const request = await Request.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!request) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: request });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedRequest = await Request.deleteOne({ _id: id });
        if (!deletedRequest) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

// lib/dbConnect.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;