import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import "./style-signin.scss";
import image from "../../assets/images/24361836.jpg";
import { useSelector, useDispatch } from "react-redux";
import messages from "./../../Locale/messages";
import { changeLang } from "../../Redux/Languageslice/languageslice";
import GoogleButton from "react-google-button";
import { Button } from "react-bootstrap";

const SignIn = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const language = useSelector((s) => s.lang.lang);
  const dispatch = useDispatch();
  const { signin } = messages[language];

  const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setErr(true);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await googleSignIn();
      console.log(res);
      // Set google user to chat
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="content h-100">
      <button
        className="btn btn-secondary lang-change "
        onClick={() => dispatch(changeLang())}
      >
        {language}
      </button>
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-6 ">
            <img src={image} alt="Image" className="img-fluid" />
          </div>
          <div className="col-md-12 col-lg-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="mb-4">
                  <h3>{signin.signin}</h3>
                  <p className="mb-3">{signin.welcome}</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group first">
                    <label htmlFor="email">{signin.email}</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group last mb-4">
                    <label htmlFor="password">{signin.password}</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                    />
                  </div>
                  {err && <span className="text-danger">{signin.err}</span>}
                  <div className="d-flex mb-2  justify-content-between">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        {signin.rememberme}
                      </label>
                    </div>
                    <span className="">
                      <a href="#" className="forgot-pass">
                        {signin.forgotpassword}
                      </a>
                    </span>
                  </div>

                  <input
                    type="submit"
                    value={signin.login}
                    className="btn btn-primary "
                  />

                  <span className="d-block text-left my-3 text-muted">
                    &mdash; {signin.loginwith} &mdash;
                  </span>

                  <div className="social-login">
                    <div className="facebook">
                      <span className=" icon-facebook  mr-3">
                        <Link to="/phonesignup">
                          <Button
                            className="button"
                            variant="success"
                            type="Submit"
                          >
                            Sign in with Phone
                          </Button>
                        </Link>
                      </span>
                    </div>

                    <span className="google icon-google mr-3">
                      <div>
                        <GoogleButton
                          className="g-btn"
                          type="dark"
                          onClick={handleGoogleSignIn}
                        />
                      </div>
                    </span>
                  </div>
                </form>
                <p>
                  {signin.donthaveaccount}
                  <Link to="/register">{signin.register}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
