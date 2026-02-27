// import { useCart } from "./CartContext";

// const Cart = () => {
//   const { cartItems, addToCart, removeFromCart } = useCart();

//   // ✅ Calculate Grand Total
//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.pcost * item.quantity,
//     0
//   );

//   // ✅ Razorpay Payment Function
//   const handlePayment = async () => {
//     if (totalPrice <= 0) {
//       alert("Cart is empty");
//       return;
//     }

//     try {
//       // 1️⃣ Create Order from Backend
//       const res = await fetch("http://localhost:5000/api/payment/create-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: totalPrice,
//           userId: "demoUser123", // later you can pass logged-in user id
//         }),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         alert("Order creation failed");
//         return;
//       }

//       // 2️⃣ Open Razorpay Checkout
//       const options = {
//         key: data.key, // comes from backend
//         amount: data.order.amount,
//         currency: "INR",
//         name: "My E-Commerce Store",
//         description: "Order Payment",
//         order_id: data.order.id,

//         handler: async function (response) {
//           // 3️⃣ Verify Payment at Backend
//           const verifyRes = await fetch(
//             "http://localhost:5000/api/payment/verify-payment",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 ...response,
//                 amount: totalPrice,
//                 userId: "demoUser123",
//               }),
//             }
//           );

//           const verifyData = await verifyRes.json();

//           if (verifyData.success) {
//             alert("✅ Payment Successful!");
//           } else {
//             alert("❌ Payment Verification Failed");
//           }
//         },

//         prefill: {
//           name: "Test User",
//           email: "test@example.com",
//           contact: "9999999999",
//         },

//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.error(err);
//       alert("Payment Failed");
//     }
//   };

//   return (
//     <div className="cart-pg">
//       <h2>My Cart</h2>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           {cartItems.map((item) => (
//             <div key={item.pid} className="cart-item">
//               <img src={item.img} width="120" alt={item.pname} />

//               <h3>{item.pname}</h3>
//               <p>Price: ₹ {item.pcost}</p>

//               {/* Quantity Controls */}
//               <div className="qty-container">
//                 <button onClick={() => addToCart(item, -1)}>-</button>
//                 <span style={{ margin: "0 10px" }}>{item.quantity}</span>
//                 <button onClick={() => addToCart(item, 1)}>+</button>
//               </div>

//               <p>Total: ₹ {item.pcost * item.quantity}</p>

//               <button onClick={() => removeFromCart(item.pid)}>
//                 Remove
//               </button>

//               <hr />
//             </div>
//           ))}

//           {/* ✅ Grand Total */}
//           <h3>Grand Total: ₹ {totalPrice}</h3>

//           {/* ✅ Checkout Button */}
//           <button
//             onClick={handlePayment}
//             style={{
//               padding: "12px 25px",
//               background: "green",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "16px",
//               borderRadius: "5px",
//             }}
//           >
//             Proceed to Pay
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // ✅ Calculate Grand Total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.pcost * item.quantity,
    0
  );

  // ✅ Razorpay Payment Function
  const handlePayment = async () => {
    if (totalPrice <= 0) {
      alert("Cart is empty");
      return;
    }

    try {
      // 1️⃣ Create Order from Backend
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
          userId: "demoUser123",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Order creation failed");
        return;
      }

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "My E-Commerce Store",
        description: "Cart Payment",
        order_id: data.order.id,

        handler: async function (response) {
          // 3️⃣ Verify Payment at Backend
          const verifyRes = await fetch(
            "http://localhost:5000/api/payment/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                amount: totalPrice,
                userId: "demoUser123",
                products: cartItems, // ✅ SEND PRODUCTS
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            clearCart(); // ✅ CLEAR CART
            navigate("/order-success"); // ✅ REDIRECT
          } else {
            alert("❌ Payment Verification Failed");
          }
        },

        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);

      // ✅ Payment Failure Handling
      rzp.on("payment.failed", function () {
        alert("❌ Payment Failed");
      });

      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    }
  };

  return (
    <div className="cart-pg">
      <h2>My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.pid} className="cart-item">
              <img src={item.img} width="120" alt={item.pname} />

              <h3>{item.pname}</h3>
              <p>Price: ₹ {item.pcost}</p>

              <div className="qty-container">
                <button onClick={() => addToCart(item, -1)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                <button onClick={() => addToCart(item, 1)}>+</button>
              </div>

              <p>Total: ₹ {item.pcost * item.quantity}</p>

              <button onClick={() => removeFromCart(item.pid)}>
                Remove
              </button>

              <hr />
            </div>
          ))}

          <h3>Grand Total: ₹ {totalPrice}</h3>

          <button
            onClick={handlePayment}
            style={{
              padding: "12px 25px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "5px",
            }}
          >
            Proceed to Pay
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;