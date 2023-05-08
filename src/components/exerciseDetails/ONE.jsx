import bodyPartlogo from "../../assets/icons/body-part.png";
import equipmentlogo from "../../assets/icons/equipment.png";
import targetlogo from "../../assets/icons/target.png";
import styled from "styled-components";
import Loading from "../Loading";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase";
import  {Suspense, lazy} from 'react'

const SimilarbyTarget = lazy(() => import('./SimilarbyTarget'));
const SimilarByEquipment = lazy(() => import('./SimilarByEquipment'));
// const SimilarYoutube = lazy(() => import('./SimilarYoutube'));

// import SimilarbyTarget from "./SimilarbyTarget";
// import SimilarByEquipment from "./SimilarByEquipment";
// import SimilarYoutube from "./SimilarYoutube";
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  flex: 1;
  gap: 30px;
`;
const ParentSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  align-items: center;
  justify-content: center;
`;
const Main = styled.main`
  animation: animate 1s 1;
  transition: all 1s ease-in-out;

`
const arrayData = [bodyPartlogo , equipmentlogo , targetlogo]
const Details = () => {  
  const [value, loading, error] = useDocument(doc(db, "ITEM", 'res'));
  if (error) console.log(error);
  if(loading){
    return <Loading/>
  }
  return (
  
  <div className="pt-20">
     {value?.data() &&
<Suspense fallback={<Loading/>}>
    <div>
         <ParentSection>
         <Main className="flex items-center">
           <Section  style={{  animation: "animate 1s 1" , transition: "all 1s"}} >
             <h1 className="text-[40px] font-bold  ">{value?.data()?.SELECTEDITEM.name}</h1>
             {value?.data()?.SELECTEDITEM.gifUrl && (
               <img     
                 className="max-h-[500px] w-[800px]"
                 width={550}
                 height={500}
                 src={value.data()?.SELECTEDITEM.gifUrl}
                 alt="image"
               />
             )}
             <p>
               Exercieses Keep you strong. {value?.data()?.SELECTEDITEM.name} is one of the best.
               exercieses to target your {value?.data()?.SELECTEDITEM.target}.It will help you improve
               your mood and gain energy
             </p>
             <article className="flex  gap-[30px] w-full">
               {arrayData.map((item , index) => {
                 return(
                   <div key={index} className="flex w-full flex-col justify-center gap-3 items-center">
                 <div className="bg-yellow-100 rounded-full p-5">
                   <img width={40} height={40} src={item} alt="icon" />
                 </div>
                 <h4 className="font-semibold">{
                  index === 0 ? value?.data()?.SELECTEDITEM?.bodyPart : index === 1 ? value?.data()?.SELECTEDITEM?.equipment : value?.data()?.SELECTEDITEM?.target
                 }</h4>
               </div>
                 )
               })}
             </article>
           </Section>
         </Main>
      
           {value && <SimilarbyTarget target={value?.data()?.SELECTEDITEM?.target}  />}
           {value && <SimilarByEquipment equipment={value?.data()?.SELECTEDITEM?.equipment} />}
           {/* {value && <SimilarYoutube NameOfExercise={value?.data()?.SELECTEDITEM?.name} />} */}
       </ParentSection>
    </div>
</Suspense >
     }
      
  </div>
  );
};

export default Details;
