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
  const collection = db.collection('blog-posts');

  switch (req.method) {
    case 'GET':
      const posts = await collection.find({}).toArray();
      res.status(200).json(posts);
      break;
    case 'POST':
      const newPost = req.body;
      await collection.insertOne(newPost);
      res.status(201).json(newPost);
      break;
    case 'PUT':
      const { id, ...updateData } = req.body;
      await collection.updateOne({ _id: new MongoClient.ObjectId(id) }, { $set: updateData });
      res.status(200).json({ message: 'Post updated' });
      break;
    case 'DELETE':
      const { id: deleteId } = req.body;
      await collection.deleteOne({ _id: new MongoClient.ObjectId(deleteId) });
      res.status(200).json({ message: 'Post deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  await client.close();
}

export default handler;
