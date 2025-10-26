import { memo } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
      </div>
      <div className="product-card__footer">
        <div>
          <div className="product-card__price">{formatCurrency(product.price)}</div>
          <div className="product-card__rating" aria-label={`Đánh giá ${product.rating} trên 5`}>
            ★ {product.rating.toFixed(1)}
          </div>
        </div>
        <button
          type="button"
          className="button primary"
          onClick={() => addToCart(product)}
        >
          Thêm giỏ hàng
        </button>
      </div>
    </article>
  )
}

export default memo(ProductCard)
