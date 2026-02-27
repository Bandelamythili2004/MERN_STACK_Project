// import { useCart } from "./CartContext";

// const Products = () => {
//   const { addToCart } = useCart();

//   const products = [
//     { id: 1, name: "Laptop", price: 50000 },
//     { id: 2, name: "Mouse", price: 500 }
//   ];

//   return (
//     <div>
//       <h2>Products</h2>
//       {products.map(product => (
//         <div key={product.id}>
//           <h3>{product.name}</h3>
//           <p>₹{product.price}</p>
//           <button onClick={() => addToCart(product)}>
//             Add To Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Products;

import { useCart } from "./CartContext";

const Products = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 500 }
  ];

  return (
    <div className="products-page">
      <h2 className="products-title">Products</h2>

      <div className="products-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">₹ {product.price}</p>

            <button
              className="add-btn"
              onClick={() => addToCart(product, 1)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

