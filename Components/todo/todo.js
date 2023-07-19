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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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




// <>
// <section className="relative block h-500-px" key={key}>
// <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
//   backgroundImage:` url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')`
// }}>
// <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
// </div>
// <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px transform translate-x-0">
// <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
// <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
// </svg>
// </div>
// </section>
// <section className="relative py-16 bg-blueGray-200">
// <div className="container mx-auto px-4">
// <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
// <div className="px-6">
// <div className="flex flex-wrap justify-center">
//   <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
//     <div className="relative">
//       <Image src={item.image} alt="..." className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
//     </div>
//   </div>
//   <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
//     <div className="py-6 px-3 mt-32 sm:mt-0">
//       <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
//         Connect
//       </button>
//     </div>
//   </div>
//   <div className="w-full lg:w-4/12 px-4 lg:order-1">
//     <div className="flex justify-center py-4 lg:pt-4 pt-8">
//       <div className="mr-4 p-3 text-center">
//         <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
//       </div>
//       <div className="mr-4 p-3 text-center">
//         <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
//       </div>
//       <div className="lg:mr-4 p-3 text-center">
//         <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
//       </div>
//     </div>
//   </div>
// </div>
// <div className="text-center mt-12">
//   <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
//     Jenna Stones
//   </h3>
//   <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
//     <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
//     Los Angeles, California
//   </div>
//   <div className="mb-2 text-blueGray-600 mt-10">
//     <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
//   </div>
//   <div className="mb-2 text-blueGray-600">
//     <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
//   </div>
// </div>
// <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
//   <div className="flex flex-wrap justify-center">
//     <div className="w-full lg:w-9/12 px-4">
//       <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
//         An artist of considerable range, Jenna the name taken by
//         Melbourne-raised, Brooklyn-based Nick Murphy writes,
//         performs and records all of his own music, giving it a
//         warm, intimate feel with a solid groove structure. An
//         artist of considerable range.
//       </p>
//       <a href="#pablo" className="font-normal text-pink-500">Show more</a>
//     </div>
//   </div>
// </div>
// </div>
// </div>
// </div>
// <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
// <div className="container mx-auto px-4">
// <div className="flex flex-wrap items-center md:justify-between justify-center">
// <div className="w-full md:w-6/12 px-4 mx-auto text-center">
// <div className="text-sm text-blueGray-500 font-semibold py-1">
// Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
// </div>
// </div>
// </div>
// </div>
// </footer>
// </section>
// </>