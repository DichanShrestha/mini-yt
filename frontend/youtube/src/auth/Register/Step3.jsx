import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Step3() {
  const [avatar, setAvatar] = useState(null);
  const [coverimg, setCoverimg] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { email, password, fullname, username } = location.state;

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleCoverImgChange = (e) => {
    setCoverimg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("fullName", fullname);
      formData.append("password", password);
      formData.append("avatar", avatar);
      formData.append("coverImage", coverimg);

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.success);
      console.log(response.data.success);
      console.log(response.status);
      console.log(response.statusCode);
      if (response.data.success || response.status === 201) {
        navigate("/signin", {
          state: {
            avater: response.data.avatar,
            coverImg: response.data.coverImage,
          },
        });
      }
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error while registering:", error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="w-full md:w-2/5 ml-4 md:pr-10 lg:pr-20 -mt-20 ">
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
          <div className="p-6 space-y-4 md:space-y-6 rounded-md shadow-xl">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Step: 3
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="avatar"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Avatar*
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  id="avatar"
                  className="input-style"
                  onChange={handleAvatarChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="coverimg"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="coverimg"
                  id="coverimg"
                  className="input-style"
                  onChange={handleCoverImgChange}
                />
              </div>
              <button type="submit" className="btn-style">
                Submit
              </button>
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

export default Step3;
