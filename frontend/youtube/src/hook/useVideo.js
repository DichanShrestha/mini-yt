import axios from "axios";

const useVideo = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/videos", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response?.data.data
  } catch (error) {
    console.log(error, "error while extracting videos");
  }
}

const useVideoById = async ({ id }) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/videos/${id}`, {
      withCredentials: true,
    });
    return response?.data.data;
  } catch (error) {
    console.log(error, "error while extracting video by id");
  }
};

const useGetVideoUser = async ({ id }) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/videos/owner/${id}`, {
      withCredentials: true,
    });
    return response?.data.data[0];
  } catch (error) {
    console.log(error, "error while extracting video by id");
  }
}

export { useVideoById, useGetVideoUser }

export default useVideo;