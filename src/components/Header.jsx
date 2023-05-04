import  {  useRef } from 'react'
import logo from '../assets/images/Logo.png'
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { EXERCISENAME } from './features/exerciseName';
import searchIcon from '../assets/icons/icons8-search-50.png'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const SearchBox = styled.form`
  display: flex;
  flex:1  ;
  margin-top:20px;
  border: 2px solid red;
  border-radius: 10px;
`;
const SearchBar = styled.input`
  width: 50px;
  flex: 9;
  padding: 5px;
  color: #888;
  border-radius: 20px;
  &:focus {
    outline: none;
    color: black;
  }
  @media (min-width:200px) and (max-width:500px)  {
    font-size: 13px;
  }
`;


function Header() { 
  const Ref = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation()



  
  const handleSearch = (e) => {
    e.preventDefault();
      dispatch(EXERCISENAME(Ref?.current?.value));
      Ref.current.value = "";
      window.scrollTo({ top: 1400, behavior: "smooth" });
   }

  return (
    <header style={{transition:"all 0.5s"}}  className={'flex items-center fixed top-0 bg-white  right-[5%] left-[5%] !z-[1000] border-b-2 border-b-red-500 rounded-b-2xl h-[80px]'}>
    <div className='flex pl-5 w-[250px] items-center'>
        <Link  to={"/"} className='mr-10 200screen:mr-7' > 
          <img className='w-[50px] h-[50px]' height={70} width={70} src={logo} alt='logo' />
        </Link>
        <div className='mt-4'>
          <Link   to={"/"} className={(location.pathname == '/' ? "border-b-2 border-b-red-500 font-bold mr-7" : " font-bold mr-7 text-red") } >Home</Link>
          <Link   className={(location.pathname == '/exercises' ? "border-b-2 border-b-red-500 font-bold" : " font-bold  text-red") } to="/exercises" >Exercises</Link>
        </div>
    </div >
    <div className='hidden laptop:flex-[0.2] laptop:block'></div>
    <SearchBox className='200screen:mx-[8px] mx-[50px]' onSubmit={handleSearch}>
        <SearchBar className='' ref={Ref} placeholder="Search.." />
        <div style={{borderTopRightRadius:"7px" , borderBottomRightRadius:"7px" , backgroundColor:"red"}} className=' 200screen:flex-[2]  px-2 flex justify-center items-center '>
          <img className=' w-5 h-5' src={searchIcon} width={20} height={20} alt='search icon'/>
        </div>
      </SearchBox>

    </header>
  )
}

export default Header