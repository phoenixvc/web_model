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
  const collection = db.collection('notifications');

  switch (req.method) {
    case 'GET':
      const notifications = await collection.find({}).toArray();
      res.status(200).json(notifications);
      break;
    case 'POST':
      const newNotification = req.body;
      await collection.insertOne(newNotification);
      res.status(201).json(newNotification);
      break;
    case 'PUT':
      const { id, ...updateData } = req.body;
      await collection.updateOne({ _id: new MongoClient.ObjectId(id) }, { $set: updateData });
      res.status(200).json({ message: 'Notification updated' });
      break;
    case 'DELETE':
      const { id: deleteId } = req.body;
      await collection.deleteOne({ _id: new MongoClient.ObjectId(deleteId) });
      res.status(200).json({ message: 'Notification deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await client.close();
}

export default handler;
