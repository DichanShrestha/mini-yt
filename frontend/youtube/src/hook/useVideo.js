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

export default useVideo;