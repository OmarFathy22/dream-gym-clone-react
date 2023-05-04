import styled from 'styled-components';
import forwardIcon from "../assets/icons/right-arrow.png";
import backwardIcon from "../assets/icons/left-arrow.png";
const MoveSlider = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: row-reverse;
  column-gap: 50px;
  z-index: 100000;
  

`;
// eslint-disable-next-line react/prop-types
const Move = ({handleNext , handlePrev} ) => {
  return (
    <div>
      <MoveSlider>
          <img
            className="cursor-pointer ease-in duration-150 hover:scale-[90%] active:scale-[90%] "
            onClick={handleNext}
            height={30}
            width={30}
            src={forwardIcon}
            alt="icon"
          />
          <img
            className="cursor-pointer ease-in duration-150 hover:scale-[90%] active:scale-[90%]"
            onClick={handlePrev}
            height={30}
            width={30}
            src={backwardIcon}
            alt="icon"
          />
        </MoveSlider>
    </div>
  )
}

export default Move;