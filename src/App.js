import './App.css';
import { useState, useEffect } from 'react';

import {RiBook2Line, RiMoonLine, RiSearchLine} from "react-icons/ri"

function App() {

  const [darkModeIsOn, setDarModeIsOn] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")



  const [data, setData] = useState(null)
  const [Term, setTerm] = useState()
  const [nounGender, setnounGender] = useState()
  const [meanings, setMeaning] = useState()
  const [etymology, setEtymology] = useState()
  

  const handleSubmit = (e) => {

    e.preventDefault()

      const loadData = async() => {
  
      const res = await fetch(`https://dicio-api-ten.vercel.app/v2/${searchTerm}`)
      .then(resp => resp.json())
      .then(data => {
        setTerm(searchTerm)
        console.log(searchTerm, nounGender, etymology, meanings)
        setnounGender(data[0].partOfSpeech)
        setMeaning(data[0].meanings)
        setEtymology(data[0].etymology)
      })
      .catch(err => console.log(err))
  
      setData(res)
  
      }
  
      loadData()

  }


  return (
    <div className={darkModeIsOn ? "DarkMode" : "WhiteMode"}>
      <div className="DicionaryContent">
        <nav> 
          <div> <RiBook2Line className='icon-book'/> </div>
          <div>
            <button className={darkModeIsOn ? "btnDarkModeOn": 'btnDarkModeOff'} onClick={() => setDarModeIsOn(!darkModeIsOn)}/>
            <RiMoonLine className='icon-moon'/>
          </div>
        </nav>
        <form className='SearchContent' onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder="Pesquisar" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit"><RiSearchLine className='icon-search'/></button>
        </form>
        <section className='DicionaryDescription'>
          <div className='WordContent'> 
              <h1>{Term && Term.toLowerCase()}</h1>
              <p>{nounGender}</p>
          </div>
          
        </section>
      </div>
    </div>
  );
}

export default App;
