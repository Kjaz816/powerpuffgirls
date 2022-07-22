import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App"> 
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-client_id" content="777744513405-irfgt3aevra0cb2nre817c7j08uqfr4c.apps.googleusercontent.com"></meta>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
    
      Hello World
      
    </div>
  );
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

export default App;
