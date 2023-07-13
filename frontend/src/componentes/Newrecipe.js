import React, {useState, useEffect} from 'react';
import Explore from './Explore';
//after registering recipe, go back to explore

const Newrecipe=()=>{
  const [_name, setName] = useState('');
  const [_description, setDes] = useState('');
  const [_ingredients, setIngre] = useState('');
  const[_dessert, setDessert] = useState('');
  const desserts_list = ["lemon_pie", "cramble", "apple_pie", "pudin"]
  const [postres, setPostres] = useState([]);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDesChange = (event) => {
    setDes(event.target.value);
  };
  const handleDessertChange = (event) => {
    setDessert(event.target.value);
  };

  const handleIngreChange = (event) => {
    setIngre(event.target.value);
  };

 
  

  

const handleSubmit = (event) =>{
  event.preventDefault();

  const recipeData = {
    name : _name,
    description : _description,
    ingredients : _ingredients,

  };

  //post al servidor
  fetch('http://127.0.0.1:5000/recipe',{
    method:'POST',
    headers:{
      'Content-Type' : 'application/json',
    },
    body:JSON.stringify(recipeData),
  })
  .then((response) => response.json())
      .then((data) => {
        if (data.response ==='SUCCESS'){
        console.log("new user registered");
        //setIsSuccessful(true);
        //se abre el explore
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setName('');
    setDes('');
    setIngre('');

};

return(
  <div className="SignUp">
      <div className="container4">
        <h1>My new recipe</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Recipe name:</label>
            <input type="username" value={_name} onChange={handleNameChange} required />
          </div>
          <div>
    <h1>Avaible desserts:</h1>
    <ul>
      {desserts_list.map((dessert, index) => (
        <li key={index}>{dessert}</li>
      ))}
    </ul>
  </div>
          <div className="form-group">
            <label>Dessert selected:</label>
            <textarea value={_dessert} onChange={handleDessertChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea value={_description} onChange={handleDesChange} required />
          </div>
          <div className="form-group">
            <label>Ingredients:</label>
            <input type="ingredients" value={_ingredients} onChange={handleIngreChange} required />
          </div>
          
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
)

}

export default Newrecipe;