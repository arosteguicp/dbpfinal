
import React, {useState} from 'react';
import { Route ,Link} from 'react-router-dom';



const Account = ()=>{
  return(
    <div className  ="page">
      <div className = "right">
      <div className = "photo-account">
        <img src = "/profile_pic.jpeg"/>
        </div>
          <div className = "name">
             Account_owners_name
          </div>
          <div className  =" description">Step into my kitchen and experience the magic of a mom's cooking. With my app, you'll have access to a diverse range of recipes that cater to every palate. From quick and easy weeknight dinners to decadent desserts, I'm here to inspire you with simple yet delicious creations that will make you feel like a culinary pro</div>
        </div>

      <div className  = "left">
        <button type="submit"> <Link to='/newrecipe'>Public new recipe</Link></button>
      </div>
      <div>
        <button type="submit">Edit my profile</button>
        </div>
      <div>My Recipes:</div>

    </div>
  )

}


export default Account;