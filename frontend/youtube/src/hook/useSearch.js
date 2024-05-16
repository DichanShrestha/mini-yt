import axios from "axios";

const useSearch = async ({
    page = 1,
    limit = 10,
    sortBy = 'title',
    sortType = 'asc',
    query
}) => {
    const response = await axios.get(`http://localhost:8000/api/v1/videos?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType=${sortType}`,
        {
            headers: {
                "Content-Type": 'application/json'
            },
            withCredentials: true
        }
    )
    return response.data.data;
}

export default useSearch;