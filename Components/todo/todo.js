'use client'
import { db } from "@/utils/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {AiFillEdit,AiFillDelete} from "react-icons/ai"
import {BsFillSkipBackwardCircleFill} from "react-icons/bs"

const TodoPage = ()=>{
  const router = useRouter()
  const [id, setId] = useState("")
  const [inputs,setInputs]=useState("")
  const [show,setShow]= useState(false)
  const [val,setVal]= useState([])


  const handleSubmit = async(e)=>{
    e.preventDefault();
    await setDoc(doc(db,"todo",Date.now().toString()),{inputs:inputs})
};

const value = collection(db,"todo");

useEffect(()=>{
    const getData = async (e)=>{
        const dbVal = await getDocs(value);
        setVal(dbVal.docs.map((doc,key)=>({...doc.data(),key,id:doc.id})))
    };
    getData();
},[val]);
const handleEdit = async(e)=>{
  e.preventDefault();
  const updatateData = doc(db,"todo",id)
  await updateDoc(updatateData,{inputs:inputs})
  setShow(false)
  setInputs("")

}

const handleDelete = async (id) => {
  await deleteDoc(doc(db, "todo", id));
};

const handleUpdate=(id,inputs)=>{
  setInputs(inputs);
  setId(id);
  setShow(true);
}

    return (
      <>
        <div className="min-w-screen min-h-screen bg-blue-900">
          <div className="mb-4">
            <h1 className="text-white text-center text-3xl">TO-DO-LIST</h1>
          </div>
          <div className="flex justify-center items-center">
            <form>
              <label
                for="search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative w-96">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  value={inputs}
                  onChange={(e)=>setInputs(e.target.value)}
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
                {show?<button
                  type="submit"
                  onClick={handleEdit}
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>:
                <button
                type="submit"
                onClick={handleSubmit}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                ADD
              </button>}
              </div>
            </form>
          </div>
          <>
          <div className="flex items-center flex-col">
          {val.map((item, key) => {
          return (
            // <div className="mt-5 bg-white rounded-lg">
            //   <div>
            //     <div>
            //       <h1 key={key} className="text-xl">
            //         {item.inputs}
            //       </h1>
            //       <hr className="border-1"/>
            //       <div>
            //       <button className="bg-green-500 text-white  p-2 px-4 rounded-md" onClick={()=>handleUpdate(item.id,item.inputs)}>
            //         UPDATE
            //       </button>
            //       <button
            //         onClick={() => handleDelete(item.id)}
            //         className="bg-red-600 text-white p-2 rounded-md"
            //       >
            //         DELETE
            //       </button>
            //     </div>

            //     </div>
            //     {/* <div className="flex justify-center gap-2">
            //       <button className="bg-green-500 text-white  p-2 px-4 rounded-md" onClick={()=>handleUpdate(item.id,item.inputs)}>
            //         UPDATE
            //       </button>
            //       <button
            //         onClick={() => handleDelete(item.id)}
            //         className="bg-red-600 text-white p-2 rounded-md"
            //       >
            //         DELETE
            //       </button>
            //     </div> */}
            //   </div>
            // </div>
            <div className="mt-4 w-[30rem] bg-white flex justify-between p-1 rounded-lg">
              <h1 className="p-1 text-xl">{item.inputs}</h1>
              <hr className="border-1" />
              <div className="flex gap-4">
                <button
                  className="bg-black rounded-md"
                  onClick={() => handleUpdate(item.id, item.inputs)}
                >
                  <AiFillEdit className="text-white" size={30} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className=" bg-red-500 p-2 rounded-md"
                >
                  <AiFillDelete className="text-white" size={20} />
                </button>
              </div>
             
            </div>
            
          );
        })}
        
          </div>
          <div>
                <button
                  type="button"
                  onClick={() => router.push("/profile")}
                  className="text-gray-900 bg-gradient-to-r flex items-center gap-2 from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <BsFillSkipBackwardCircleFill size={30} />{" "}
                  <span className="text-xl">Back</span>
                </button>
              </div>
          </>
        </div>
        
        {/* <div classNameName="mt-10">
          <TodoMsg />
        </div> */}
      </>
    );
}

export default  TodoPage
