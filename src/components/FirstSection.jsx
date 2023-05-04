import logo from '../assets/images/bigRamy-removebg.png'


const FirstSection = () => {
  const handleClickScroll = () => {
    const element = document.getElementById('SecondSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <main className="flex items-center ">
        <section  style={{  animation: "animate 1s 1" , transition: "all 1s"}} className=" laptop:mt-20 flex flex-1 justify-center flex-col h-[99.9vh]">
          <div className="relative mobile:items-center justify-start desktop:h-[90%] flex flex-col gap-6 items-start">
            <h3 className="text-red-500 text-2xl font-medium">Fintness Club</h3>
            <h1 className="text-[45px] font-bold">
              Sweat, Smile <br /> And Repeat
            </h1>
            <p className="text-[15px]">
              Check out the most effective exercises personalized to you
            </p>
            <button onClick={() => {
                handleClickScroll()
            }} className="text-[18px] z-10 cursor-pointer w-fit text-gray-200 bg-red-600 rounded-sm py-[4px] px-[10px]">
              Explore Exercises
            </button>
          <h1  className=" mobile:text-[100px] mobile:text-center mobile:static tablet:text-[140px] laptop:text-[220px] laptop:ml-[-15px] text-red-100 leading-[0.8] ">
            Exercise
          </h1>
          </div>
        </section>
        <section className="hidden laptop:flex laptop:absolute laptop:top-[120px] laptop:right-[50px] ">
          <img
            className="h-[100vh] object-fill w-[100%] relative z-10"
            width={500}
            height={500}
            src={logo}
            alt="image"
          />
        </section>
      </main>

  )
}

export default FirstSection