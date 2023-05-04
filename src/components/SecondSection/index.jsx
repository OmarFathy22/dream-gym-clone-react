import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import ForTesting from "../ForTesting";

const Main = styled.main`
  margin: 200px 0 150px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  @media (max-width: 768px) {
    justify-content: flex-start;
    height: fit-content;
    margin: 100px 0 100px 0;
  }
`;
const Text = styled.h1`
  font-size: 35px;
  width: 100%;
  font-weight: 500;
  text-align: center;
`;

export const CardsBox = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  justify-content: center;
`;
export const ExerciseCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  cursor: pointer;
  width: 300px;
  height: 100% !important;
  border: 1px solid #888;
  border-radius: 3px;
  margin-bottom: 60px;
`;
export const ExercisesName = styled.h1`
  font: 20px;
  font-weight: 700;
`;

export default function SecondSection() {

  return (
    <Main id="SecondSection" style={{  animation: "animate 1s 1" , transition: "all 1s"}}>
      <Text>
        Awesome Exercises You <br /> Should Know
      </Text>
      <CardsBox>
        <ForTesting/>
      </CardsBox>
    </Main>
  );
}

