import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongo'; 
import { NextApiRequest,NextApiResponse } from 'next';
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid or missing product ID' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }


    const similarProducts = await db.collection('products')
      .find({
        category: product.category, 
        _id: { $ne: product._id }   
      })
      .limit(5) 
      .toArray();

    res.status(200).json({ similarProducts });
  } catch (error) {
    console.error('Error fetching similar products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
