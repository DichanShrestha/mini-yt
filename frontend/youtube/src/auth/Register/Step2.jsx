import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Step2() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [isFilled, setisFilled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;

  const navigateNextStep = () => {
    if ((username.trim() && fullname.trim()) !== '') {
      navigate("/stepThree", { state: { email, password, username, fullname } });
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Step: 2 of 3</h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Username*</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-style"
                  placeholder="aman369"
                  required
                />
              </div>

              <div>
                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Full Name*</label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  name="fullname"
                  id="fullname"
                  placeholder="eg: aman limbu"
                  className="input-style"
                  required
                />
              </div>
              <button
                onClick={navigateNextStep}
                className="btn-style"
                disabled={!isFilled}
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

export default Step2;
