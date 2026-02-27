import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";   // ✅ import cart

const Header = () => {
    const navigate = useNavigate();
    const { cartItems } = useCart();       // ✅ get cart items

    // ✅ Calculate total quantity
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="header">

            {/* SEARCH BAR */}
            <div className="search-bar">

                {/* HOME ICON */}
                <i
                    className="fa fa-home"
                    onClick={() => navigate("/dashboard")}
                    title="Home"
                ></i>

                {/* SEARCH INPUT */}
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="search-input"
                />

                {/* CART ICON WITH COUNT */}
                <div
                    className="cart-icon-wrapper"
                    onClick={() => navigate("/dashboard/cart")}
                >
                    <i className="fa fa-shopping-cart"></i>

                    {/* ✅ COUNT BADGE */}
                    {cartCount > 0 && (
                        <span className="cart-count">
                            {cartCount}
                        </span>
                    )}
                </div>

            </div>

            {/* SIGN OUT */}
            <button onClick={logout} className="signout-btn">
                Sign Out
            </button>
        </header>
    );
};

export default Header;
