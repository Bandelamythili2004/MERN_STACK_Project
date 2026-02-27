import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Forgetpassword = () => {
    const ref1 = useRef(null);
    const navigate = useNavigate();

    const forgetpswd = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/forget-password",
                { email: ref1.current.value }
            );

            alert(data.message);
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("Error sending reset link");
        }
    };

    return (
    //     <fieldset>
    //         <legend>FORGOT PASSWORD</legend>

    //         <input
    //             type="email"
    //             ref={ref1}
    //             placeholder="enter registered email"
    //         />
    //         <br /><br />

    //         <button onClick={forgetpswd}>
    //             Send Reset Link
    //         </button>
    //     </fieldset>
    // );
    <div className="fp-page">
            <div className="fp-container">
                <h2 className="fp-title">Forgot Password</h2>
                <p className="fp-subtitle">
                    Enter your registered email to reset your password
                </p>

                <input
                    type="email"
                    ref={ref1}
                    placeholder="Enter Email Address"
                    className="fp-input"
                />

                <button onClick={forgetpswd} className="fp-btn">
                    Reset My Password
                </button>

                <span className="fp-back" onClick={() => navigate("/login")}>
                    ← Back to Login
                </span>
            </div>
        </div>
    );
};

export default Forgetpassword;
