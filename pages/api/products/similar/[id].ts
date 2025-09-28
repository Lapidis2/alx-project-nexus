import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongo'; // Adjust path as needed
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

    // Fetch similar products based on category, excluding the current product
    const similarProducts = await db.collection('products')
      .find({
        category: product.category,  // Use the same category as the current product
        _id: { $ne: product._id }   // Exclude the current product from the results
      })
      .limit(5)  // You can adjust this number based on your needs
      .toArray();

    res.status(200).json({ similarProducts });
  } catch (error) {
    console.error('Error fetching similar products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
