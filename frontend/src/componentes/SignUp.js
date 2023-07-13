

import React, {useState} from 'react';
import Explore from './Explore';
//import './SignUp.css'
/*
function SignUp() {
  return (
    <div>
      <h2>Sign Up</h2>
      { Your sign-up form }
    </div>
  );
}

export default SignUp;
*/

const SignUp =()=>{
  const [_username, setUsername] = useState('');
  const [_description, setDes] = useState('');
  const [_password, setPassword] = useState('');

  const [isSuccessful, setIsSuccessful] = useState(false);
 
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDesChange = (event) => {
    setDes(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username: _username,
      description: _description,
      password: _password,
    };

    // Realizar la solicitud HTTP POST al servidor
    fetch('http://127.0.0.1:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response ==='SUCCESS'){
        console.log("new user registered");
        setIsSuccessful(true);
        //se abre el explore
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // Resetear los campos de entrada
    setUsername('');
    setDes('');
    setPassword('');
    
  };

  if(isSuccessful){
    return<Explore/>
  }
  return(
    <div className="SignUp">
      <div className="container4">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type="username" value={_username} onChange={handleUsernameChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea value={_description} onChange={handleDesChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={_password} onChange={handlePasswordChange} required />
          </div>
          
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )

}

export default SignUp;