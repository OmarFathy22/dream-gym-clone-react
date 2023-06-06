import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { EffectCards } from "swiper";
import "swiper/swiper-bundle.min.css";
import { EXERCISENAME } from "./features/exerciseName";
import { useDispatch } from "react-redux";
import chest from '../assets/exercises/chest.png'
import shoulder from '../assets/exercises/shoulder.png'
import arms from '../assets/exercises/arms.png'
import back from '../assets/exercises/back.jpg'
import legs from '../assets/exercises/legs.jpg'
import waist from '../assets/exercises/waist.jpg'
import cardio from '../assets/exercises/cardio.jpeg'
import neck from '../assets/exercises/neck.jfif'

const ForTesting = () => {
  const [Value] = useDocument(
    doc(db, "List of bodyparts", "result")
  );
  const dispatch = useDispatch();
  const handleClickScroll = () => {
    const element = document.getElementById('ThirdSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper-1 justify-center items-center flex"
      >
        {Value?.data()?.firstArray?.map((exercise, index) => { 
          let exerciseImage = '';
          if(exercise === 'chest'){
            exerciseImage = chest;
          }
          if(exercise === 'back'){
            exerciseImage = back;
          }
          if(exercise === 'shoulders'){
            exerciseImage = shoulder;
          }
          if(exercise === 'neck'){
            exerciseImage = neck;
          }
          if(exercise === 'waist'){
            exerciseImage = waist;
          }
          if(exercise === 'cardio'){
            exerciseImage = cardio;
          }
          if(exercise === 'upper arms' || exercise === 'lower arms'){
            exerciseImage = arms;
            exercise = 'arms'
          }
          if(exercise === 'upper legs' || exercise === 'lower legs'){
            exerciseImage = legs;
            exercise = 'legs'
          }
      
          return (
            <SwiperSlide
              onClick={() => {
                handleClickScroll()
                dispatch(EXERCISENAME(exercise));
              }}
              className="swiper-slide-1 !flex !justify-center !items-center relative"
              key={index}
            >
              <h1 className="absolute text-white text-[45px]">{exercise}</h1>
              <img src={exerciseImage} alt="image" className="object-cover h-full w-full opacity-[0.3]"/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ForTesting;
