import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isFilled, setIsFilled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    if (!username && !email) {
      setErrorMessage("Username or email is required");
      setIsFilled(false);
      return;
    }
    if (!password) {
      setErrorMessage("password is required");
      setIsFilled(false);
    }
    setIsFilled(true)
    const data = {
      email,
      password,
      username,
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(error, "error while login");
      if (error.response && (error.response.status === 404 || error.response.status === 401)) {
        setErrorMessage("Invalid username, email, or password");
      } else {
        setErrorMessage("Error during login. Please try again.");
      }
    }
    
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center h-screen bg-gray-50">
      <div className="w-full md:w-2/5 ml-4 md:pr-10 lg:pr-20 -mt-20">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-40 mr-2"
            src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow-md">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>

            <form className="space-y-4" action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="eg. anu36"
                  className="input-style"
                  required
                  autoComplete="username"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  className="input-style"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input-style"
                  required
                  autoComplete="current-password"
                />
              </div>
              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to="/forgotpass"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                disabled={!isFilled}
                type="submit"
                onClick={login}
                className="btn-style"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  to="/stepOne"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-3/5">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/man-watching-you-tube-6937231-5691359.png?f=webp"
          className="object-cover w-full h-full"
          alt="Illustration"
        />
      </div>
    </section>
  );
}

export default SignIn;
