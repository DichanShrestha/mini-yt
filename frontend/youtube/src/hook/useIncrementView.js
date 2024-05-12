import axios from "axios";

const useIncrementView = async ({ videoId }) => {
    try {
        const response = axios.post("http://localhost:8000/api/v1/videos/views",
            { videoId },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        )
    } catch (error) {
        throw new Error("Error while incrementing views")
    }
}

export default useIncrementView;