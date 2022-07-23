import logo from './logo.svg';
import { useEffect, useState} from 'react';
// @ts-ignore  
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  const [ user, setUser ] = useState({})

  function handleCallbackResponse(response){
    console.log("Econoded JWT ID token: " + response.credential);
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    console.log("ID: " + userObject.sub);
     console.log('Full Name: ' + userObject.name);
     console.log('Given Name: ' + userObject.given_name);
     console.log('Family Name: ' + userObject.family_name);
     console.log("UserID: " + userObject.sub);
     console.log("Email: " + userObject.email);
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "777744513405-2rvtat7snd0men32u5cc84l6rt9hsmq1.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App"> 
      <div id="signInDiv"></div>
      { Object.keys(user).length !== 0 &&
        <button onClick={ (e) => handleSignOut(e)}> Sign Out</button>
      }
      
      { user &&
       <div>
        <img src={user.picture}></img>
        <h3>{user.name}</h3>
        </div>
      }
      </div>
  );
}

export default App;
