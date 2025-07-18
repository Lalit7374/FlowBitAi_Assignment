import { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const[cards,setCards]=useState([])
  const [userLogin,setUserLogin]=useState(null)
  const token=localStorage.getItem("token")


  useEffect(()=>{
    if(token){
   setUserLogin(true)
    
    fetch("http://localhost:8080/",{
      headers:{"authorization":`Bearer ${token}`}
    })
      .then(rawData =>rawData.json())
      .then(res=> { 
        setCards(res)
      })
        
        
      }
      else{
        setUserLogin(false)
        setCards([])
      }
    
  },[])
  // const cards = [
  //   {
  //     title: 'Advanced Learning',
  //     description: 'Experience cutting-edge educational methodologies and interactive learning environments designed for the modern student.',
  //   },
  //   {
  //     title: 'Industry Integration',
  //     description: 'Bridge the gap between academia and industry with real-world projects and industry collaboration opportunities.',
  //   },
  //   {
  //     title: 'Innovation Hub',
  //     description: 'Access state-of-the-art facilities and resources to transform your innovative ideas into impactful solutions.',
  //   },
  // ];

  return (
    <div className="home">
      <div className="container">
        <h1>Welcome to 6CSE1</h1>
        <div className="cards">
          {userLogin ?(
            cards.map((card, index) => (
              <div key={index} className="card">
                <h2>FirstName: {card.firstName}</h2>
                <p>Username: {card.userName}</p>
                <p>Email: {card.email}</p>
              </div>
             ) )
          ):<h2>LOG IN TO VIEW THIS PAGE</h2>}
        </div>
      </div>
    </div>
  );
};

export default Home;