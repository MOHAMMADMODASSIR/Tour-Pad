import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
import { GoogleLogin } from "react-google-login";
// import { GoogleOAuthProvider } from '@react-oauth/google';

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
    error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({ formValue, navigate, toast }));
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };
    
    // <GoogleOAuthProvider clientId="770596283641-k6t14o2a2b52c0ts561336kmfsc6kvvg.apps.googleusercontent.com">...</GoogleOAuthProvider>;

    const googleSuccess = (resp) => {
        console.log("Login through google success");
        console.log(resp);
        const email = resp?.profileObj?.email;
        const name = resp?.profileObj?.name;
        const token = resp?.tokenId;
        const googleId = resp?.googleId;
        const result = { email, name, token, googleId };
        dispatch(googleSignIn({ result, navigate, toast }));
    };

    const googleFailure = (error) => {
        toast.error(error);
        console.log("Login through google not success");
        console.log(error);
    };

    return (
    <div
        style={{
        margin: "auto",
        padding: "26px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "60px",
        // marginBottom: "20px",
        // border:"2px solid green",
        }}
    >
        <MDBCard alignment="center">
            <MDBIcon fas icon="user-circle" className="fa-2x" />
                <h3>Sign In</h3>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
                        <div className="col-md-12">
                            <MDBInput
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide your email"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide your password"
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }} className="mt-2">    
                                {loading && (
                                    <MDBSpinner
                                    size="sm"
                                    role="status"
                                    tag="span"
                                    className="me-2"
                                    />
                                )}
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <br/>
                    <GoogleLogin
                    clientId="770596283641-k6t14o2a2b52c0ts561336kmfsc6kvvg.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <MDBBtn
                        style={{ width: "100%" }}
                        color="danger"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        >
                        <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                        </MDBBtn>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account ? Sign Up Now</p>
                    </Link>
                </MDBCardFooter>
        </MDBCard>
    </div>
    );
};









//   const devEnv = process.env.NODE_ENV !== "production";



//   const googleSuccess = (resp) => {
//     const email = resp?.profileObj?.email;
//     const name = resp?.profileObj?.name;
//     const token = resp?.tokenId;
//     const googleId = resp?.googleId;
//     const result = { email, name, token, googleId };
//     dispatch(googleSignIn({ result, navigate, toast }));
//   };
//   const googleFailure = (error) => {
//     toast.error(error);
//   };
//           <br />
//           <GoogleLogin
//             clientId="770596283641-qk1dsrlo069qonkv3jtqrim4oic5ng4e.apps.googleusercontent.com"
//             render={(renderProps) => (
//               <MDBBtn
//                 style={{ width: "100%" }}
//                 color="danger"
//                 onClick={renderProps.onClick}
//                 disabled={renderProps.disabled}
//               >
//                 <MDBIcon className="me-2" fab icon="google" /> Google Sign In
//               </MDBBtn>
//             )}
//             onSuccess={googleSuccess}
//             onFailure={googleFailure}
//             cookiePolicy="single_host_origin"
//           />

export default Login;
