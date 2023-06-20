import React, { useEffect, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import axios from "axios";
import {
  ExerciseCard,
  ExerciseName,
  ExercisesContainer,
  Target,
} from "../components/ThirdSection";
import { useDocument } from "react-firebase-hooks/firestore";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";

import { Storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
} from "firebase/firestore";
// Import Firebase configuration

// Initialize Firebase app

// Get Firebase Storage client
const CollectionName = "List of All Exercises"; ///////// 1
const SearchResults = () => {
  const [start, setStart] = useState(false);
  const [myArray, setMyArray] = useState([]);
  const [value, loading, error] = useDocument(
    doc(db, "List of All Exercises", "res")
  );


  //  if(start)
  //  {
  //   console.log("omar in effect");
  //   console.log("yes");
  //   console.log(value?.docs);
  //   async function updateObjectsWithDownloadURLs(objectsArray, folderPath , item ) {
  //     let Arrray = [{}];
  //     const folderRef = ref(Storage, folderPath);
  //     const fileList = await listAll(folderRef);
  //     const firstFiveFiles = fileList.items; // Get the first five files in the list

  //     for (let i = 0; i < firstFiveFiles.length; i++) {
  //       const file = firstFiveFiles[i];
  //       const downloadURL = await getDownloadURL(file);

  //       // Find the object in the array with matching ID
  //       const objectToUpdate = objectsArray.find(
  //         (object) => object.id === file.name.split(".")[0]
  //       );
  //       if (objectToUpdate) {
  //         // If object is found, update the migUrl property with the download URL
  //         objectToUpdate.gifUrl = downloadURL;
  //         console.log(objectToUpdate);
  //         console.log(Arrray);
  //         // If the ID of the object matches the name of the migUrl image, add the object to the beginning of the array
  //         if (objectToUpdate.id === file.name.split(".")[0]) {
  //           // objectsArray.unshift(objectToUpdate);
  //           Arrray.push(objectToUpdate);
  //         }
  //       }
  //     }

  //     // console.log(objectsArray); // Log the updated array to the console
  //     Arrray.shift();
  //     console.log(Arrray);
  //     const SendData = async () => {
  //       await updateDoc(doc(db, CollectionName, item), {
  //         firstArray: Arrray,
  //       });
  //       console.log("done db");
  //     };
  //     SendData();
  //     localStorage.setItem("currArray" , JSON.stringify(Arrray))
  //     console.log("doneee local storage");
  //   }
  //   // const arrayFromLocalStorage = localStorage.getItem('currArray');
  //   // const TempArray = JSON.parse(arrayFromLocalStorage)||[];
  //   // const SendData = async () => {
  //   //   await updateDoc(doc(db, CollectionName, "back"), {
  //   //     firstArray: TempArray,
  //   //   });
  //   //   console.log("done db");
  //   // };
  //   // SendData();
  //   // console.log("TempArray",TempArray);

  

  //   // Example array of objects
    
  //     for(let item2 of List_of_target)
  //     {
        
  //     for(let item of value?.docs || [])
  //     {
  //       if(item?.data()?.firstArray[0].target === item2)
  //      {
  //       updateObjectsWithDownloadURLs(
  //         item?.data()?.firstArray,
  //         "List of All Exercises",
  //         item2
  //       );
        
  //      }
  //      }
  //     }
    
  
    
  //  }
    


  //     async function uploadGifToStorage(gifUrl, folderName , item ) {
  //       // Get the GIF image data
  //       const response = await fetch(gifUrl);
  //       const gifData = await response.arrayBuffer();

  //       // Define the filename for the GIF image
  //       const fileId =item.id;
  //       const fileExtension = gifUrl.split('.').pop();
  //       const fileName = `${fileId}`;
  //       const destinationPath = `${folderName}/${fileName}`;

  //       // Upload the GIF image to Firebase Storage
  //       const storageRef = ref(Storage, destinationPath);
  //       const snapshot = await uploadBytes(storageRef, gifData, { contentType: 'image/gif' });

  //       // Get the public URL of the uploaded image
  //       const downloadURL = await getDownloadURL(snapshot.ref);

  //       // Return the ID and URL of the file
  //       return { fileId, downloadURL };
  //     }
  //     const folderName = 'List of All Exercises';

  // // Iterate over the objects and upload the GIF images to Firebase Storage
  // async function uploadGifs() {
  //   let counter = 0;
  //   for (let obj of List_of_all_Exercises) {
  //     const gifUrl = obj.gifUrl;
  //     const { fileId, downloadURL } = await uploadGifToStorage(gifUrl, folderName , obj);
  //     console.log(counter , " " , fileId);
  //     counter += 1;
  //   }

  // uploadGifs().then(() => {
  //   console.log('GIFs uploaded successfully!');
  // }).catch((error) => {
  //   console.error('Error uploading GIFs:', error);
  // });

  const { Id } = useParams();
  const Search = useSelector((state: any) => state.exercisename.value);
  const recordsNum = 6;
  const [selectedNum, setselectedNum] = useState(recordsNum);
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    setselectedNum((selected + 1) * recordsNum);
    window.scrollTo({ top: 1700, behavior: "smooth" });
  };
  if (error) console.log(error);
  if (loading) return <Loading />;
  const filtered = value?.data()?.firstArray?.filter((item: any) => {
    return (
      item?.name?.toLowerCase().includes(Search?.toLowerCase()) ||
      item?.bodyPart?.toLowerCase().includes(Search?.toLowerCase()) ||
      item?.target?.toLowerCase().includes(Search?.toLowerCase())
    );
  });
  return (
  
   <div>
  
   <ExercisesContainer>
     {filtered
       ?.slice(selectedNum - recordsNum, selectedNum)
       .map((item: any, index: number) => {
         return (
           <ExerciseCard
             key={index}
             onClick={async () => {
               await updateDoc(doc(db, "ITEM", "res"), {
                 SELECTEDITEM: item,
               });
             }}
           >
             <Link to={"/exercises"}>
               <img
                 height={300}
                 width={300}
                 src={
                   item?.gifUrl[4] === "s"
                     ? item.gifUrl
                     : item.gifUrl.slice(0, 4) + "s" + item.gifUrl.slice(4)
                 }
                 alt={"icon"}
               />
               <div className="flex  gap-2">
                 <Target>{item?.target}</Target>
                 <ExerciseName>{item?.bodyPart}</ExerciseName>
               </div>
               <h1 className="font-bold p-2 text-center text-ellipsis overflow:hidden">
                 {item?.name}
               </h1>
             </Link>
           </ExerciseCard>
         );
       })}
     {filtered?.length < 1 && (
       <h1 className="text-2xl text-center mb-10 font-bold">
         No Exercises Found
       </h1>
     )}
   </ExercisesContainer>
   {filtered?.length > 0 && (
     <ReactPaginate
       className="py-7 flex justify-center items-center gap-3"
       containerClassName="pagination"
       pageClassName="page-item"
       pageLinkClassName="page-link"
       previousLabel="< "
       nextLabel=" >"
       breakLabel="..."
       onPageChange={handlePageClick}
       pageCount={Math.ceil(filtered.length / recordsNum)}
       pageRangeDisplayed={3}
       marginPagesDisplayed={2}
       renderOnZeroPageCount={null}
       activeClassName="bg-red-400 text-white px-2 py-[2px] rounded-sm"
     />
   )}
 </div>
  );
};

export default SearchResults;

