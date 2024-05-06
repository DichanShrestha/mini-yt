import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Signout() {
    const navigate = useNavigate()
    useEffect(() => {
        const logout = async () => {
            const response = await axios.post('http://localhost:8000/api/v1/users/logout',
            null,
            {
                withCredentials: true
            }
            )
            if (response.status === 200) {
                navigate('/signin')
            }
        }
        logout();
    }, [])
  return ;
}

export default Signout
