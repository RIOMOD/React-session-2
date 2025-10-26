import CartSummary from './components/CartSummary.jsx'
import ProductList from './components/ProductList.jsx'
import { CartProvider } from './context/CartContext.jsx'
import products from './data/products.js'
import './styles/app.css'

function App() {
  return (
    <CartProvider>
      <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="eyebrow">React Session 2</p>
            <h1>Cửa hàng thủ công</h1>
            <p className="subtitle">
              Khám phá bộ sưu tập sản phẩm thủ công và thêm vào giỏ hàng với Context API.
            </p>
          </div>
        </header>

        <main className="layout">
          <div className="layout__content">
            <ProductList products={products} />
          </div>
          <div className="layout__sidebar">
            <CartSummary />
          </div>
        </main>
      </div>
    </CartProvider>
  )
}

export default App
