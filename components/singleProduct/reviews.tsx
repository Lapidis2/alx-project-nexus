// 'use client';
// import React, { useEffect, useState } from 'react';
// import StarRating from './star';
// import LoadingFrame from '@/constants/LoadingFrame';

// interface Review {
//   id: string;
//   name: string;
//   feedback: string;
//   ratingScore: number;
//   createdAt: string;
// }

// interface ReviewsProps {
//   productId: string;
// }

// const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [visible, setVisible] = useState(3);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/reviews/${productId}`);
//         const data = await res.json();
//         setReviews(data.ratings || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, [productId]);

//   const showMore = () => setVisible(prev => prev + 3);
//   const showLess = () => setVisible(3);

//   if (loading) return <LoadingFrame />;

//   return (
//     <section className="p-5">
//       <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>
//       <div className="flex flex-col gap-4">
//         {reviews.slice(0, visible).map((review) => (
//           <div key={review.id} className="border p-3 rounded">
//             <div className="flex justify-between items-center mb-2">
//               <span className="font-bold text-orange-500">{review.name}</span>
//               <StarRating rating={review.ratingScore} />
//             </div>
//             <p>{review.feedback}</p>
//             <small className="text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</small>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-2 mt-2">
//         {visible < reviews.length && <button onClick={showMore} className="px-4 py-2 bg-blue-500 text-white rounded">Show More</button>}
//         {visible > 3 && <button onClick={showLess} className="px-4 py-2 bg-red-500 text-white rounded">Show Less</button>}
//       </div>
//     </section>
//   );
// };

// export default Reviews;
