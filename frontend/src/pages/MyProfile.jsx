import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsedit] = useState(false)

  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {

    try {

      const formData=new FormData()

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append('image',image)

      console.log("Gender before submitting:", userData.gender);


      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsedit(false)
        setImage(false)
      } else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const isValidDate = (dateString) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  };

  
  return userData && (

    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit
          ? <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              {!image && (
                <div className="bg-gray-300 absolute bottom-8 right-8 rounded-full w-20 h-20 flex justify-center items-center">
                  <img  className="w-10" src={image ? "" : assets.upload_icon} alt=""/>
                </div>
              )}
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </div>
          </label>
          : <img className='w-36 rounded' src={userData?.image} alt="" />
      }

      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData?.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-8'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />

      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id: </p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone: </p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <p>
                <input className='bg-gray-50' type="text" value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                <br />
                <input className='bg-gray-50' type="text" value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
              </p>
              : <p className='text-gray-500'>
                {userData.address.line1}
                <br /> {userData.address.line2}
              </p>
          }
        </div>

        <div>
          <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>

          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>

            <p className='font-medium'>Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-50 max-w-20 border border-zinc-400 py-1 mb-4 px-2"
                name="gender"
                value={userData.gender}
                onChange={(e) =>
                setUserData((prev) => ({...prev,gender: e.target.value,}))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}

            <p className='font-medium'>Birthday:</p>

            {
              isEdit
                ? <input
                className='max-w-28 bg-gray-100'
                type="date"
                value={isValidDate(userData.dob) ? userData.dob : ""}
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              />
              
                : <p className='text-gray-400'>{userData.dob}</p>
            }

          </div>

        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition all' onClick={() => updateUserProfileData()}>Save Information</button>
            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition all' onClick={() => setIsedit(true)} >Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile;