// Utility functions for generating dynamic reviews based on product category
import { getRatingLabel, getRatingImage } from './productUtils';

// Review templates for different categories
const reviewTemplates = {
  mobile: [
    "Amazing phone! The camera quality is outstanding and battery life is excellent.",
    "Best smartphone I've ever used. Super fast performance and great display.",
    "Incredible value for money. The build quality is premium and features are top-notch.",
    "Love this phone! Perfect for photography and gaming. Highly recommended.",
    "Fantastic device with smooth performance. The design is sleek and modern.",
    "Outstanding phone with excellent camera and long-lasting battery.",
    "Perfect smartphone for daily use. Fast charging and great screen quality.",
    "Impressive phone with amazing features. Worth every penny!",
    "Excellent build quality and performance. Camera is absolutely brilliant.",
    "Best phone in this price range. Super satisfied with the purchase."
  ],
  
  shoes: [
    "Super comfortable shoes! Perfect fit and great quality material.",
    "Amazing comfort and style. These shoes are perfect for daily wear.",
    "Excellent quality and very comfortable. Great for long walks.",
    "Perfect shoes with amazing comfort. The design is also very stylish.",
    "Outstanding comfort and durability. Highly recommend these shoes.",
    "Great shoes with excellent build quality. Very comfortable to wear.",
    "Perfect fit and amazing comfort. These shoes are worth buying.",
    "Excellent shoes with great comfort and style. Love the design!",
    "Amazing quality and comfort. Perfect for running and casual wear.",
    "Best shoes I've bought! Super comfortable and stylish."
  ],
  
  cloth: [
    "Perfect fit and excellent quality fabric. Very comfortable to wear.",
    "Amazing quality and great design. The fabric feels premium.",
    "Excellent clothing with perfect fit. The material is very soft.",
    "Great quality and comfortable fabric. Perfect for daily wear.",
    "Outstanding quality and perfect size. The design is very stylish.",
    "Perfect clothing with excellent fabric quality. Highly recommended.",
    "Amazing fit and great quality. The material is very comfortable.",
    "Excellent quality and perfect design. Very satisfied with purchase.",
    "Great clothing with perfect fit and comfortable fabric.",
    "Outstanding quality and stylish design. Perfect for any occasion."
  ],
  
  other: [
    "Excellent product with amazing quality. Highly recommend this item.",
    "Great value for money. The quality is outstanding and very useful.",
    "Perfect product with excellent build quality. Very satisfied.",
    "Amazing quality and great functionality. Worth every rupee.",
    "Outstanding product with excellent features. Highly recommended.",
    "Great quality and perfect for daily use. Very happy with purchase.",
    "Excellent product with amazing durability. Perfect choice!",
    "Perfect quality and great design. Very useful and practical.",
    "Amazing product with excellent build quality. Highly satisfied.",
    "Great product with outstanding quality. Perfect for my needs."
  ]
};

// Indian names for reviewers
const reviewerNames = [
  "Rahul Sharma, Mumbai",
  "Priya Patel, Delhi",
  "Amit Kumar, Bangalore",
  "Sneha Singh, Pune",
  "Vikash Gupta, Chennai",
  "Anita Verma, Hyderabad",
  "Rohit Agarwal, Kolkata",
  "Kavya Reddy, Ahmedabad",
  "Arjun Mehta, Jaipur",
  "Pooja Jain, Lucknow",
  "Sanjay Yadav, Indore",
  "Ritu Sharma, Chandigarh",
  "Deepak Singh, Nagpur",
  "Meera Gupta, Surat",
  "Karan Malhotra, Vadodara",
  "Nisha Agarwal, Agra",
  "Rajesh Kumar, Kanpur",
  "Divya Patel, Rajkot",
  "Suresh Reddy, Visakhapatnam",
  "Anjali Verma, Nashik"
];

// Time periods for reviews
const timePeriods = [
  "2 days ago",
  "5 days ago",
  "1 week ago",
  "2 weeks ago",
  "3 weeks ago",
  "1 month ago",
  "6 weeks ago",
  "2 months ago"
];

// Generate random number within range
const getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random rating between 4.0 and 5.0 for positive reviews
const generatePositiveRating = () => {
  return parseFloat((Math.random() * 1 + 4).toFixed(1)); // 4.0 to 5.0
};

// Generate variant text based on product category
const generateVariantText = (product) => {
  if (product.category === 'mobile') {
    const colors = ['Midnight Black', 'Pearl White', 'Space Gray', 'Rose Gold', 'Blue', 'Green'];
    const storages = ['128GB', '256GB', '512GB'];
    const rams = ['6GB', '8GB', '12GB'];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const storage = storages[Math.floor(Math.random() * storages.length)];
    const ram = rams[Math.floor(Math.random() * rams.length)];
    
    return `Color ${color} · RAM ${ram} · Storage ${storage}`;
  }
  
  if (product.category === 'cloth') {
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Gray'];
    
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return `Size ${size} · Color ${color}`;
  }
  
  if (product.category === 'shoes') {
    const sizes = ['7', '8', '9', '10', '11'];
    const colors = ['Black', 'White', 'Brown', 'Blue', 'Gray'];
    
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return `Size ${size} · Color ${color}`;
  }
  
  // For other categories
  return `${product.brand} ${product.name.split(' ').slice(-2).join(' ')}`;
};

// Generate reviews for a specific product
export const generateReviewsForProduct = (product, count = 3) => {
  if (!product) return [];
  
  const categoryTemplates = reviewTemplates[product.category] || reviewTemplates.other;
  const reviews = [];
  
  for (let i = 0; i < count; i++) {
    const rating = generatePositiveRating();
    const reviewText = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
    const reviewer = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
    const daysAgo = timePeriods[Math.floor(Math.random() * timePeriods.length)];
    const helpfulCount = getRandomInRange(50, 500);
    const dislikeCount = getRandomInRange(2, 20);
    
    reviews.push({
      rating,
      label: getRatingLabel(rating),
      ratingImage: getRatingImage(rating),
      variant: generateVariantText(product),
      reviewText,
      reviewer,
      helpfulCount,
      dislikeCount,
      daysAgo
    });
  }
  
  return reviews;
};

// Generate reviews with product-specific context
export const generateContextualReview = (product) => {
  const rating = generatePositiveRating();
  const categoryTemplates = reviewTemplates[product.category] || reviewTemplates.other;
  
  // Get a random template and customize it with product details
  let reviewText = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
  
  // Add product-specific context
  if (product.category === 'mobile') {
    const cameraFeatures = ['camera', 'photography', 'pictures', 'video quality'];
    const performanceFeatures = ['performance', 'speed', 'gaming', 'multitasking'];
    const batteryFeatures = ['battery life', 'charging', 'power backup'];
    
    if (reviewText.includes('camera')) {
      reviewText += ` The ${product.brand} really delivers on camera quality.`;
    } else if (reviewText.includes('performance')) {
      reviewText += ` ${product.brand} phones are known for their reliability.`;
    }
  }
  
  if (product.category === 'shoes') {
    if (reviewText.includes('comfort')) {
      reviewText += ` ${product.brand} always makes comfortable footwear.`;
    }
  }
  
  if (product.category === 'cloth') {
    if (reviewText.includes('quality')) {
      reviewText += ` ${product.brand} maintains excellent quality standards.`;
    }
  }
  
  return {
    rating,
    label: getRatingLabel(rating),
    ratingImage: getRatingImage(rating),
    variant: generateVariantText(product),
    reviewText,
    reviewer: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
    helpfulCount: getRandomInRange(50, 500),
    dislikeCount: getRandomInRange(2, 20),
    daysAgo: timePeriods[Math.floor(Math.random() * timePeriods.length)]
  };
};