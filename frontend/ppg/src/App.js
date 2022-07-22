import { useEffect, useState} from 'react';
// @ts-ignore  
import jwt_decode from "jwt-decode";
import './App.css';
import Speaker from './components/Speaker/Speaker';
import EmailContainer from './components/EmailContainer/EmailContainer';

function App() {
  const [ user, setUser ] = useState({})

  
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    console.log(userObject)
    document.getElementById("signInDiv").hidden = true;
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
      <EmailContainer user={user}/>
      <Speaker />
      </div>
  );
}

export default App;
