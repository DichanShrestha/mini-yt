import axios from 'axios'

const useHistory = async({videoId}) => {
    const response = await axios.post("http://localhost:8000/api/v1/users/addhistory",
        {videoId}, 
        {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }
    )
    return response.data.data
}

export default useHistory;