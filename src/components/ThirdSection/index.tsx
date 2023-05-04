import React from 'react'
import styled from 'styled-components';
import SearchResults from '../../components/SearchResults';
export const ExercisesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  position: relative;

`

export const ExerciseCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 420px;
  width: 320px;
  border-radius: 3px;
  background-color: white;
  border-top: 2px solid red;
`
export const Target = styled.button`
background-color: #ee8989;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
  font-weight: 500;
`
export const ExerciseName = styled.div`
  background-color: #f3d657;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  border-radius: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden; 
  flex:1;
  margin-right: 10px ;
  height: 2.2em;
  font-weight: bold;

`
export const ThirdSection = () => {
  return (
    <div id='ThirdSection' style={{  animation: "animate 1s 1" , transition: "all 1s ease-in-out"}}>
      <SearchResults/>
    </div>
  )
}

export default ThirdSection; 