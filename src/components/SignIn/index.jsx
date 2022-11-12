import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./style-signin.scss";
import image from "../../assets/images/24361836.jpg";
import { useSelector, useDispatch } from "react-redux";
import messages from "./../../Locale/messages";
import { changeLang } from "../../Redux/Languageslice/languageslice";

const SignIn = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const language = useSelector((s) => s.lang.lang);
  const dispatch = useDispatch();
  const { signin } = messages[language];

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
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
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
                    <a href="#" className="facebook">
                      <span className="icon-facebook mr-3"></span>
                    </a>
                    <a href="#" className="google">
                      <span className="icon-google mr-3"></span>
                    </a>
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
