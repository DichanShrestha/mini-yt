import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Step1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFilled, setisFilled] = useState(true);
  const navigate = useNavigate();

  const navigateNextStep = () => {
    if (email.trim() && password.trim()) {
      navigate("/stepTwo", { state: { email, password } });
    } else {
      setisFilled(false)
    }
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="w-full md:w-2/5 ml-4 md:pr-10 lg:pr-20 -mt-20 ">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-40 mr-2" src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg" alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow-md">
          <div className="p-6 space-y-4 md:space-y-6 rounded-md shadow-xl">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Step: 1 of 3</h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email*</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-style"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password*</label>
                <input
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input-style"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <a href="/" className="text-sm font-medium text-primary-600 hover:underline text-black">Forgot password?</a>
              </div>
              <button
                onClick={navigateNextStep}
                disabled={!isFilled}
                className="btn-style"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-3/5">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/man-watching-you-tube-6937231-5691359.png?f=webp" className="object-cover w-full h-full" alt="Illustration" />
      </div>
    </section>
  );
}

export default Step1;
