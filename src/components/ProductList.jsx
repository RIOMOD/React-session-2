import ProductCard from './ProductCard.jsx'

const ProductList = ({ products }) => {
  return (
    <section className="product-list" aria-label="Danh sách sản phẩm">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ProductList
