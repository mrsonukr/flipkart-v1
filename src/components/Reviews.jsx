import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/product-ui/ReviewCard";
import { getProductById } from "../utils/productUtils";
import { generateReviewsForProduct } from "../utils/reviewUtils";

const Reviews = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        
        if (productData) {
          // Generate 3 dynamic reviews based on product category
          const generatedReviews = generateReviewsForProduct(productData, 3);
          setReviews(generatedReviews);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div></div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mb-20">
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          rating={review.rating}
          label={review.label}
          ratingImage={review.ratingImage}
          variant={review.variant}
          reviewText={review.reviewText}
          reviewer={review.reviewer}
          helpfulCount={review.helpfulCount}
          dislikeCount={review.dislikeCount}
          daysAgo={review.daysAgo}
        />
      ))}
    </div>
  );
};

export default Reviews;