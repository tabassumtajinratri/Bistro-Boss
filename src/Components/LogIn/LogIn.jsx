
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const LogIn = () => {
  const captchaRef = useRef(null);
  const [disable, setDisable] = useState(true);

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    loadCaptchaEnginge(6); 
  }, []);

  const handleLogIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const captcha = form.captcha.value;

    if (!validateCaptcha(captcha)) {
      alert("Captcha is incorrect! Try again.");
      setDisable(true);
      return;
    }

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Login successful!");
        form.reset();
        setDisable(true);
        loadCaptchaEnginge(6); 
        navigate(from,{replace:true})
      })
      .catch((error) => {
        console.error(error);
      });
  };

 
  const handleValidateCaptcha = () => {
    const userCaptchaValue = captchaRef.current.value;
    if (validateCaptcha(userCaptchaValue)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <form onSubmit={handleLogIn} className="hero-content flex w-full">
          <div className="text-center lg:text-left mr-8">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="space-y-4">
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input w-full"
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <label className="label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input w-full"
                    placeholder="Password"
                    required
                  />
                </div>

                <div>
                  <label className="label">Captcha</label>
                  <LoadCanvasTemplate />
                  <input
                    ref={captchaRef}
                    type="text"
                    name="captcha"
                    className="input w-full mt-2"
                    placeholder="Enter Captcha"
                    onBlur={handleValidateCaptcha} 
                    required
                  />
                </div>

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <input
                  type="submit"
                  disabled={disable}
                  className="btn btn-neutral mt-4 w-full"
                  value="Login"
                />
              </fieldset>

              <div>
                <p>
                  <small>
                    New Here? <Link to="/signUp">Create an account</Link>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;

