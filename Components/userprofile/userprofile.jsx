'use client'
import { app, db } from '@/utils/firebase'
import { data } from 'autoprefixer'
import Image from 'next/image'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const UserProfile = () => {
    const router = useRouter()
    const [val,setVal]= useState([])
    const auth = getAuth(app)
    const user = auth.currentUser;
    // const email = user.email;
    console.log(user);

    console.log(val);
    useEffect(()=>{
        userPost()
    },[])

    const userPost = async()=>{
        if(user!==null){
            setVal([])
            const q = query(collection(db, "data"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                // doc.data() is never undefined for query doc snapshots
                setVal((user)=>[...user,data])
                console.log(doc.id, " => ", doc.data());
});
        }
    
    }


  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      {val.map((item,key)=>{
        return (
          <div className="w-[32rem] bg-gray-100 rounded-lg flex items-center flex-col gap-3">
            <Image
              src={item.image}
              alt="image"
              width={30}
              height={30}
              className="w-32 h-32 rounded-md"
            />
            <h1>
              <span className="font-bold">Name:</span>
              {item.Name}
            </h1>
            <h1>
              <span className="font-bold">Email:</span>
              {item.email}
            </h1>
            <div className='flex'>
            <button
              type="button"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={()=>router.push("/profile/todo")}
            >
             Message 
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
             Share My Profile
            </button>
           
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default UserProfile;
