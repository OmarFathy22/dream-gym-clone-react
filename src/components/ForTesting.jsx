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
          return (
            <SwiperSlide
              onClick={() => {
                handleClickScroll()
                dispatch(EXERCISENAME(exercise));
              }}
              className="swiper-slide-1 !flex !justify-center !items-center"
              key={index}
            >
              <h1>{exercise}</h1>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ForTesting;
