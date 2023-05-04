import React, {useState } from 'react'
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import { ExerciseCard, ExerciseName, ExercisesContainer, Target } from '../components/ThirdSection';
import { useDocument } from 'react-firebase-hooks/firestore';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import {Link, useParams} from "react-router-dom"
const SearchResults = () => {  
  const [value, loading, error] = useDocument(doc(db, "List of All Exercises", "res"));
  const {Id} = useParams()
  const Search = useSelector((state: any) => state.exercisename.value)
  const recordsNum = 6;
  const [selectedNum, setselectedNum] = useState(recordsNum)
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    setselectedNum((selected + 1) * recordsNum);
    window.scrollTo({ top: 1700, behavior: "smooth" });
  };
  if(error) console.log(error);;
  if(loading)return <Loading/>;
  const filtered = value?.data()?.Array?.filter((item: any) => {
    return (
      item?.name?.toLowerCase().includes(Search?.toLowerCase()) ||
      item?.bodyPart?.toLowerCase().includes(Search?.toLowerCase()) ||
      item?.target?.toLowerCase().includes(Search?.toLowerCase())
    )
  })
  return (
    <div>
      <ExercisesContainer>
          {filtered?.slice(selectedNum - recordsNum, selectedNum).map((item: any, index: number) => {
            return (
              <ExerciseCard key={index} onClick={async () => {
                await updateDoc(doc(db, "ITEM", "res"), {
                  SELECTEDITEM: item,
                });
              }}>
                <Link  to={'/exercises'} 
                  onClick={() => {
                    window.scrollTo({top:0})
                  }}
                >
                  <img 
                    
                    height={300}
                    width={300}
                    src={item?.gifUrl[4] === 's' ? item.gifUrl :  item.gifUrl.slice(0,4) + 's' + item.gifUrl.slice(4) }
                    alt={"icon"} />
                  <div className='flex  gap-2'>
                    <Target>{item?.target}</Target>
                    <ExerciseName>{item?.bodyPart}</ExerciseName>
                  </div>
                  <h1 className='font-bold p-2 text-center text-ellipsis overflow:hidden'>{item?.name}</h1>
                </Link>
              </ExerciseCard>
            )
          })}
          {filtered.length < 1 && <h1 className='text-2xl text-center mb-10 font-bold'>No Exercises Found</h1>}
        </ExercisesContainer>
        {filtered.length > 0  && <ReactPaginate
        className='py-7 flex justify-center items-center gap-3'
        containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousLabel="< "
        nextLabel=" >"
        breakLabel="..."
        onPageChange={handlePageClick}
        pageCount={Math.ceil(filtered.length / recordsNum)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        renderOnZeroPageCount={null}
        activeClassName='bg-red-400 text-white px-2 py-[2px] rounded-sm'
      />}
    </div>
  )
}

export default SearchResults