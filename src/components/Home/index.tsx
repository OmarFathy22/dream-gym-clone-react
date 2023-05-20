import React, { useEffect } from 'react'
import FirstSection from "../FirstSection";
import SecondSection from "../SecondSection";
import ThirdSection from "../ThirdSection";
type Props = {}

const Home = (props: Props) => {
  return (
    <div>
      <FirstSection />
        <SecondSection />
        <ThirdSection />
    </div>
  )
}

export default Home;