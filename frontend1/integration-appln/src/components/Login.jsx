import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const navigate = useNavigate();

    const login = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email: ref1.current.value, password: ref2.current.value }
            );

            const { message, token } = data;

            if (message === "Login Success") {
               window. localStorage.setItem("token", token);
                navigate("/dashboard");
            }
        } catch (err) {
            navigate("/error");
        }
    };

    return (
    //     <div className="login-page">
    //         <div className="login-container">
    //             <h2 className="login-title">E-Commerce Portal</h2>

    //             <input
    //                 type="email"
    //                 ref={ref1}
    //                 placeholder="Enter Email"
    //                 className="login-input"
    //             />

    //             <input
    //                 type="password"
    //                 ref={ref2}
    //                 placeholder="Enter Password"
    //                 className="login-input"
    //             />

    //             <div className="login-buttons">
    //                 <button onClick={login} className="btn login-btn">Login</button>
    //                 <button onClick={() => navigate("/register")} className="btn register-btn">Register</button>
    //                 { <button onClick={() => navigate("/forget-password")} className="btn forgot-btn">Forget Password</button>}
    //                 {/* <button
    //                           className="btn forgot-btn"
    //                           onClick={() => navigate("/forget-password")}>
    //                       Forget Password
    //                      </button> */}

    //             </div>
    //         </div>
    //     </div>
    // );
    
    <div className="login-page">

        {/* NAVBAR */}
        <div className="navbar">
            <div className="nav-links">
                {/* <span>Home</span>
                <span>Contact</span>
                <span>About</span> */}
            </div>

            <button className="nav-login">Login</button>
        </div>

        {/* LOGIN CARD */}
        <div className="glass-container">
            <div className="glass-card">

                <h2>Login</h2>

                <input
                    type="email"
                    ref={ref1}
                    placeholder="Email"
                    className="glass-input"
                />

                <input
                    type="password"
                    ref={ref2}
                    placeholder="Password"
                    className="glass-input"
                />

                <div className="extra-options">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>

                    <span
                        className="link"
                        onClick={() => navigate("/forget-password")}
                    >
                        Forget Password
                    </span>
                </div>

                <button onClick={login} className="glass-btn">
                    Login
                </button>

                <p className="register-text">
                    Don’t have an account?
                    <span onClick={() => navigate("/register")}> Register</span>
                </p>

            </div>
        </div>

    </div>
);

};

 export default Login;
