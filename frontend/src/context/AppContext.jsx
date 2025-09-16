import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    const backendUrl = "https://mediconnect-backend-2o4q.onrender.com"

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(()=>{
        try{
            const token=localStorage.getItem('token')

            return token ? token : '';
        } catch(error){
            console.log(error)
            return '';
        }
    })

    const [userData, setUserData] = useState(false)


    const getDoctorsData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
      
          const response = await axios.get(`${backendUrl}/api/user/get-profile`, { headers });
      
          const { success, userData } = response.data;
      
          if (success) {
            setUserData(userData); //  finally setting it here!
          } else {
            setUserData(false);
            toast.error("Failed to load user data.");
          }
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
          setUserData(false);
        }
      };
      
    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token && token !== '') {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);
    

    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        token, 
        setToken,
        backendUrl,
        userData, 
        setUserData,
        loadUserProfileData,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
