import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Years");
    const [fees, setFees] = useState("");
    const [about, setAbout] = useState("");
    const [speciality, setSpeciality] = useState("general-physician");
    const [degree, setDegree] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");

    const {backendUrl,aToken}=useContext(AdminContext)

    const onSubmitHandler=async(event)=>{
        event.preventDefault()

        try {
            
            if(!docImg){
                return toast.error('Image Not Selected')
            }

            const formData=new FormData()

            formData.append("image", docImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fees", Number(fees));
            formData.append("about", about);
            formData.append("speciality", speciality);
            formData.append("degree", degree);
            formData.append("address",JSON.stringify({line1:address1,line2:address2}));

            // consolelog form data
            formData.forEach((value,key)=>{
                console.log(`${key}:${value}`)
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})

            if(data.success){
                toast.success(data.message)
                setDocImg(false);
                setName("");
                setEmail("");
                setPassword("");
                setFees("");
                setAbout("");
                setDegree("");
                setAddress1("");
                setAddress2("");
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="m-4 w-full">
            <p className="mb-2 text-lg font-medium">Add Doctor</p>
            <div className="bg-white p-8 border rounded w-full max-w-4xl max-h-[90vh] overflow-y-scroll">
                <div className="flex items-center gap-5  mb-8 text-gray-500">
                    <label htmlFor="doc-img" className="cursor-pointer">
                        <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>setDocImg(e.target.files[0])} className="w-16 bg-gray-100 rounded-full cursor-pointer" type="file" id="doc-img" hidden />
                    <p>Upload doctor <br /> picture</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">

                        <div className="flex flex-col gap-1 flex-1">
                            <p>Doctor Name</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className="border rounded px-3 py-2" type="text" placeholder='name' required />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <p>Doctor Email</p>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="border rounded px-3 py-2" type="email" placeholder='email' required />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <p>Doctor Password</p>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="border rounded px-3 py-2" type="password" placeholder='password' required />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <p>Experience</p>
                            <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border rounded px-3 py-2" name="" id="">
                                <option value="1 Years">1 Years</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="5 Years">6 Years</option>
                                <option value="6 Years">7 Years</option>
                                <option value="7 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10 Years">10 Years</option>
                                <option value="10+ Years">10+ Years</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <p>Fees</p>
                            <input onChange={(e) => setFees(e.target.value)} value={fees} className="border rounded px-3 py-2" type="number" placeholder="Fees" required/>
                        </div>

                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex flex-col gap-1 flex-1">
                            <p>Speciality</p>
                            <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2" name="" id="">
                                <option value="General physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <p>Education</p>
                            <input onChange={(e) => setDegree(e.target.value)} value={degree} className="border rounded px-3 py-2" type="text" placeholder="Education" required/>
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <p>Address</p>
                            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="border rounded px-3 py-2" type="text" placeholder="address1" required/>
                            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="border rounded px-3 py-2" type="text" placeholder="address2" required/>
                        </div>

                    </div>
                </div>

                <div className='mt-4 mb-2'>
                    <p>About</p>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 py-2 border-r' placeholder="Write about doctor" rows={5} required/>
                </div>

                <button type="submit" className="bg-primary text-white text-sm  mt-4 mb-3 px-10 py-2 rounded-full">Add Doctor</button>
            </div>
    </form >
  )
}

export default AddDoctor