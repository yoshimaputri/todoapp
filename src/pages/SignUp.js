import { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
    const [load, setLoad] = useState(false);
    return (
        <>
            <h1>SignUp</h1>
            <button>Sign in</button>
        </>
    );
}

export default SignUp;