import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { getSession } from 'next-auth/client';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await client.connect();
  const db = client.db('webcam-modeling');
  const collection = db.collection('user-profiles');

  switch (req.method) {
    case 'GET':
      const profiles = await collection.find({}).toArray();
      res.status(200).json(profiles);
      break;
    case 'POST':
      const newProfile = req.body;
      await collection.insertOne(newProfile);
      res.status(201).json(newProfile);
      break;
    case 'PUT':
      const { id, ...updateData } = req.body;
      await collection.updateOne({ _id: new MongoClient.ObjectId(id) }, { $set: updateData });
      res.status(200).json({ message: 'Profile updated' });
      break;
    case 'DELETE':
      const { id: deleteId } = req.body;
      await collection.deleteOne({ _id: new MongoClient.ObjectId(deleteId) });
      res.status(200).json({ message: 'Profile deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await client.close();
}

export default handler;
