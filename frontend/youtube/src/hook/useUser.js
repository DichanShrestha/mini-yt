import axios from "axios"

const useUser = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/users/get-user", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        return response;
    } catch (error) {
        console.log(error, "error while retrieving user");
        throw error;
    }    
}

const useUserStats = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8000/api/v1/dash/stats",
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          return response?.data.data
    } catch (error) {
        console.log(error, "error while getting user stats");
    }
}

export default useUser;
export {useUserStats}