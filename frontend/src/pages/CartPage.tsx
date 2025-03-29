import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.purchaseAmount,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table className="table table-hover table-bordered table-responsive">
          <thead>
            <tr>
              <th>Title</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item: CartItem) => (
              <tr key={item.bookId}>
                <td>{item.title}</td>
                <td>{item.purchaseAmount}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.purchaseAmount * item.price).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item.bookId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h4 className="text-end">Total: ${total.toFixed(2)}</h4>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary">Checkout</button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/books')}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartPage;
