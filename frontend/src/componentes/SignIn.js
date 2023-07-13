
import { Route ,Link} from 'react-router-dom';
import React, {useState} from 'react';
import Explore from './Explore';
import SignUp from './SignUp';
/*
function SignIn() {
  return (
    <div>
      <h2>Sign In</h2>
      { Your sign-in form}
    </div>
  );
}
*/

const SignIn=()=>{
  const[ _username, setUsername] = useState('');
  const[ _password, setPassword] = useState('');
  
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event)  =>{
    event.preventDefault();
    const userData = {
      username: _username,
      password: _password,
    };
    

    //http find
    fetch('http://127.0.0.1:5000/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then((response)=>response.json())
    .then((data)=>{
      if (data.response ==='SUCCESS'){
        console.log("compatible user");
        setIsSuccessful(true);
        //se abre el explore
        
        }
        else{
          alert("sign up please");
          setShowSignUp(true);

          
        }
      
    })
    .catch((error)=>{
      console.error(error);
    });

    setUsername('');

    setPassword('');

  };

  if(isSuccessful){
    return<Explore/>
  }
 
  if(showSignUp){
    return<SignUp/>
  }
 
  return (
    <div className="SignIn">
      <div className="container4">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input type="username" value={_username} onChange={handleUsernameChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={_password} onChange={handlePasswordChange} required />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )

}

export default SignIn;