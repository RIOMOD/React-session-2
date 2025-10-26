import { useCart } from '../context/CartContext.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'

const CartSummary = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <aside className="cart-summary empty" aria-live="polite">
        <h2>Giỏ hàng</h2>
        <p>Chưa có sản phẩm nào. Hãy chọn vài món ngon nhé!</p>
      </aside>
    )
  }

  return (
    <aside className="cart-summary" aria-live="polite">
      <header className="cart-summary__header">
        <div>
          <h2>Giỏ hàng ({totalItems})</h2>
          <span className="cart-summary__total">{formatCurrency(totalPrice)}</span>
        </div>
        <button type="button" className="button ghost" onClick={clearCart}>
          Xóa tất cả
        </button>
      </header>

      <ul className="cart-summary__items">
        {items.map((item) => (
          <li key={item.product.id} className="cart-item">
            <div>
              <p className="cart-item__name">{item.product.name}</p>
              <span className="cart-item__price">
                {formatCurrency(item.product.price)} · {item.product.category}
              </span>
            </div>
            <div className="cart-item__actions">
              <div className="quantity-input">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  aria-label={`Giảm số lượng ${item.product.name}`}
                >
                  –
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.product.id, Number(event.target.value) || 1)
                  }
                  aria-label={`Số lượng ${item.product.name}`}
                />
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  aria-label={`Tăng số lượng ${item.product.name}`}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="button danger"
                onClick={() => removeFromCart(item.product.id)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CartSummary
