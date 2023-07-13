 
 
 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componentes/Home';
import SignIn from './componentes/SignIn';
import SignUp from './componentes/SignUp';
import Explore from './componentes/Explore';
import Account from './componentes/Account';
import Newrecipe from './componentes/Newrecipe.js';
import Newdessert from './componentes/Newdessert.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/account" element={<Account />} />
        <Route path="/newrecipe" element = {<Newrecipe />}/>
        <Route path="/newdessert" element = {<Newdessert/>}/>
      </Routes>
    </Router>
  );
}

export default App;