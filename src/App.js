import { useEffect,useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [data,setData] = useState([]);

  const showCountries = async () =>{
   try{

     const response = await axios.get('https://xcountries-backend.azurewebsites.net/all');
     setData(response.data)
     console.log(response.data);
   }
   catch(err){
    console.error("Error fetching data:" + err)
   }
  }
  useEffect(()=>{
    showCountries()
  },[])
  return (
    <div className="App">
      {/* <h2>hello</h2> */}
      <div className='cardwrap'>
        {data.map((val)=>{
          return(

          <div className='each-card' key={val.name}>
            <figure>
              <img className='card-img' src={val.flag} alt={val.abbr}/>
            </figure>
            <h3>{val.name}</h3>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
