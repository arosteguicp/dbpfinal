
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenid@ a Poustres</h1>
      <img src="/caratula.jpeg" alt="caratula" />
      <div>
        <Link to="/signin" >Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        
      </div>
    </div>
  );
}

export default Home;