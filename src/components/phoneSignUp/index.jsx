import React, { useState } from "react";
import "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import image from "../../assets/images/24361836.jpg";
import { useSelector, useDispatch } from "react-redux";
import { changeLang } from "../../Redux/Languageslice/languageslice";
import messages from "./../../Locale/messages";

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const language = useSelector((s) => s.lang.lang);
  const { signin } = messages[language];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
      // Set Phone user to chat
      await setDoc(doc(db, "userChats", response.user.uid), {});
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/home");
    } catch (err) {
      setError(err.message);
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
                  <h3>PhoneNumber SignIn</h3>
                  <p className="mb-3">{signin.welcome}</p>
                </div>
                {/* {error && <Alert variant="danger">{error}</Alert>} */}

                <Form
                  onSubmit={getOtp}
                  style={{ display: !flag ? "block" : "none" }}
                >
                  <Form.Group
                    className="form-group first"
                    controlId="formBasicEmail"
                  >
                    <PhoneInput
                      defaultCountry="IN"
                      value={number}
                      onChange={setNumber}
                      placeholder="Enter Phone Number"
                    />
                    <div id="recaptcha-container"></div>
                  </Form.Group>
                  <div className=" text-center mb-3 button-right">
                    <Link to="/">
                      <Button variant="secondary">Cancel</Button>
                    </Link>
                    &nbsp;
                    <Button type="submit" variant="primary">
                      Send Otp
                    </Button>
                  </div>
                </Form>

                <Form
                  onSubmit={verifyOtp}
                  style={{ display: flag ? "block" : "none" }}
                >
                  <Form.Group
                    className="form-group last mb-4"
                    controlId="formBasicOtp"
                  >
                    <Form.Control
                      type="otp"
                      placeholder="Enter OTP"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Form.Group>
                  <div className="button-right">
                    <Link to="/">
                      <Button variant="secondary">Cancel</Button>
                    </Link>
                    &nbsp;
                    <Button type="submit" variant="primary">
                      Verify
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneSignUp;

{
  /* <form onSubmit={handleSubmit}>
  <div className="form-group first">
    <label htmlFor="email">{signin.email}</label>
    <input type="email" className="form-control" id="email" />
  </div>
  <div className="form-group last mb-4">
    <label htmlFor="password">{signin.password}</label>
    <input type="password" className="form-control" id="password" />
  </div>
  {err && <span className="text-danger">{signin.err}</span>}
</form>; */
}
