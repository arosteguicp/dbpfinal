import React, {useState, useEffect} from 'react';
import Explore from './Explore';
//after registering recipe, go back to explore

const Newdessert = ()=>{

  const [_name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
  
    const dessertData = {
      name : _name,
      
  
    };
  
    //post al servidor
    fetch('http://127.0.0.1:5000/desserts',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify(dessertData),
    })
    .then((response) => response.json())
        .then((data) => {
          if (data.response ==='SUCCESS'){
          console.log("new  postre registered");
          //setIsSuccessful(true);
          //se abre el explore
          }
        })
        .catch((error) => {
          console.error(error);
        });
  
      setName('');
      
  
  };

  return(
    <div className="SignUp">
      <div className="container4">
        <h1>New dessert</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Dessert name:</label>
            <input type="username" value={_name} onChange={handleNameChange} required />
          </div>
          
          
          <button type="submit">Public dessert</button>
        </form>
      </div>
    </div>
  )
}

export default Newdessert;