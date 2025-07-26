import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header2 from "../components/Header2";
import ProductSlider from "../components/product-ui/ProductSlider";
import ProductDetails from "../components/product-ui/ProductDetails";
import DeliveryDetails from "../components/product-ui/DeliveryDetails";
import ProductPolicy from "../components/product-ui/ProductPolicy";
import Reviews from "../components/Reviews";
import VariantSelector from "../components/product-ui/VariantSelector";
import SizeSelector from "../components/product-ui/SizeSelector";
import BottomButtons from "../components/product-ui/BottomButtons";
import { getProductById } from "../utils/productUtils";
import RatingSummary from "../components/product-ui/RatingSummary";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError('Failed to load product');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  // Set default size based on category
  const getDefaultSize = () => {
    if (product?.category === 'shoes') return '8';
    if (product?.category === 'cloth') return 'XL';
    return null;
  };
  
  const [selectedSize, setSelectedSize] = useState(getDefaultSize());

  // Update selected size when product loads
  useEffect(() => {
    setSelectedSize(getDefaultSize());
  }, [product]);

  if (loading) {
    return (
      <div>
        <Header2 />
        <div></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Header2 />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {error || "Product Not Found"}
            </h2>
            <p className="text-gray-600 mb-4">
              {error ? "Failed to load product details." : "The product you're looking for doesn't exist."}
            </p>
            {error && (
              <button 
                onClick={loadProduct}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Retry
              </button>
            )}
            <Link to="/dsghr763wdsvfht" className="text-blue-600 hover:underline mt-4 inline-block">
              Go back to dsghr763wdsvfht
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get color and storage variants for mobile category
  const colorVariants = product.variants?.filter(v => v.type === 'color') || [];
  const storageVariants = product.variants?.filter(v => v.type === 'storage') || [];
  
  const selectedColor = colorVariants[0]?.name || "Default";
  const selectedStorage = storageVariants[0]?.name || "Standard";

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <div>
      <Header2 />
      <ProductSlider product={product} />
      <ProductDetails product={product} />
      
      {/* Show variant selector only for mobile category */}
      {product.category === 'mobile' && (colorVariants.length > 0 || storageVariants.length > 0) && (
        <VariantSelector 
          color={selectedColor} 
          storage={selectedStorage}
          colorVariants={colorVariants}
          storageVariants={storageVariants}
        />
      )}
      
      {/* Show size selector only for cloth and shoes category */}
      {(product.category === 'cloth' || product.category === 'shoes') && (
        <SizeSelector 
          category={product.category} 
          onSizeChange={handleSizeChange}
        />
      )}
      
      <div className="h-2 bg-gray-100"></div>
      <DeliveryDetails product={product} />
      <div className="h-2 bg-gray-100"></div>
      <ProductPolicy />
      <div className="h-2 bg-gray-100"></div>
      <RatingSummary />
      <Reviews />
      <BottomButtons product={product} selectedSize={selectedSize} />
    </div>
  );
};

export default Product;