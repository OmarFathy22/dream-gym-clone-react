import logo from '../assets/images/Logo.png'
import styled from 'styled-components'
const GymName = styled.h1`
    
 `
const Footer = () => {
  return (
    <div>
      <footer className='bg-white flex justify-center items-center mt-10   gap-3 py-5 rounded-md border-t-2 border-t-red-500 flex-col '>
        <div className='flex gap-2 items-end'>
          <img height={30} width={30} src={logo} alt='icon' />
          <GymName style={{ fontFamily: 'Abril Fatface', textTransform: 'lowercase' }} className='morata'> Way to Forma👀</GymName>
        </div>
        <div>
          <h3 style={{ fontFamily: 'Orbitron ,sans-serif,Abril Fatface , cursive' , fontWeight: '400' , color: "#f07408" }}>Made with ❤️ by Omar Fathy</h3>
    </div>
      </footer >
    </div >
  )
} 

export default Footer