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

export default useUser;
