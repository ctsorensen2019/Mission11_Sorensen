import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams(); // ✅ get all from route
  const { addToCart } = useCart();
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      price: Number(price) || 0, // ✅ parse as number
      purchaseAmount,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Donate to {title || 'Unknown Book'}</h2> {/* ✅ fix variable name */}
      <div>
        <input
          type="number"
          placeholder="Enter donation amount"
          value={purchaseAmount}
          onChange={(x) => setPurchaseAmount(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default PurchasePage;
