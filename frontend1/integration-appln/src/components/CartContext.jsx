// // // import { createContext, useContext, useState } from "react";

// // // // create context
// // // const CartContext = createContext();

// // // // provider
// // // export const CartProvider = ({ children }) => {
// // //   const [cartItems, setCartItems] = useState([]);

// // //   // add item
// // //   const addToCart = (product) => {
// // //     setCartItems((prev) => [...prev, product]);
// // //   };

// // //   // remove item (optional)
// // //   const removeFromCart = (index) => {
// // //     setCartItems((prev) => prev.filter((_, i) => i !== index));
// // //   };

// // //   return (
// // //     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
// // //       {children}
// // //     </CartContext.Provider>
// // //   );
// // // };

// // // // custom hook (THIS YOU WILL IMPORT EVERYWHERE)
// // // export const useCart = () => useContext(CartContext);
// // import { createContext, useContext, useState } from "react";

// // // Create context
// // const CartContext = createContext();

// // // Provider
// // export const CartProvider = ({ children }) => {

// //   const [cartItems, setCartItems] = useState([]);

// //   // ✅ Add to Cart with Quantity
// //   const addToCart = (product, qty) => {

// //     setCartItems((prev) => {

// //       const exist = prev.find(
// //         (item) => item.pid === product.pid
// //       );

// //       // If product already exists → increase quantity
// //       if (exist) {
// //         return prev.map((item) =>
// //           item.pid === product.pid
// //             ? { ...item, quantity: item.quantity + qty }
// //             : item
// //         );
// //       }

// //       // If product is new → add with quantity
// //       return [...prev, { ...product, quantity: qty }];
// //     });
// //   };

// //   // Optional remove
// //   const removeFromCart = (pid) => {
// //     setCartItems((prev) =>
// //       prev.filter((item) => item.pid !== pid)
// //     );
// //   };

// //   return (
// //     <CartContext.Provider
// //       value={{ cartItems, addToCart, removeFromCart }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // // Custom hook
// // export const useCart = () => useContext(CartContext);
// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {

//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product, qty) => {

//     setCartItems((prev) => {

//       const exist = prev.find(
//         (item) => item.pid === product.pid
//       );

//       if (exist) {

//         const newQty = exist.quantity + qty;

//         // Remove item if quantity becomes 0
//         if (newQty <= 0) {
//           return prev.filter(
//             (item) => item.pid !== product.pid
//           );
//         }

//         return prev.map((item) =>
//           item.pid === product.pid
//             ? { ...item, quantity: newQty }
//             : item
//         );
//       }

//       // If new product
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (pid) => {
//     setCartItems((prev) =>
//       prev.filter((item) => item.pid !== pid)
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty) => {

    setCartItems((prev) => {

      const exist = prev.find(
        (item) => item.pid === product.pid
      );

      if (exist) {

        const newQty = exist.quantity + qty;

        // Remove item if quantity becomes 0
        if (newQty <= 0) {
          return prev.filter(
            (item) => item.pid !== product.pid
          );
        }

        return prev.map((item) =>
          item.pid === product.pid
            ? { ...item, quantity: newQty }
            : item
        );
      }

      // If new product
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (pid) => {
    setCartItems((prev) =>
      prev.filter((item) => item.pid !== pid)
    );
  };

  // ✅ ADD THIS FUNCTION
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);