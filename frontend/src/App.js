import { useEffect, useState } from "react";
import "./App.css";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import duck from "./components/Images/duck.png";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    console.log(emails);
  }, [emails]);

  /* global gapi */
  function authenticate() {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          "https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly",
      })
      .then(
        function () {
          console.log("Sign-in successful");
          setSignedIn(true);
          getEmails();
        },
        function (err) {
          console.error("Error signing in", err);
        }
      );
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyAjlSDRDAKuXZGq880CWj6Bp5yE-WE5_mk"); // API key
    return gapi.client
      .load("https://gmail.googleapis.com/$discovery/rest?version=v1")
      .then(
        function () {
          console.log("GAPI client loaded for API");
        },
        function (err) {
          console.error("Error loading GAPI client for API", err);
        }
      );
  }

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "777744513405-2rvtat7snd0men32u5cc84l6rt9hsmq1.apps.googleusercontent.com", // client ID
      scope: "email",
      ux_mode: "popup",
      plugin_name: "chat",
    });
  });

  const handleLogin = (event) => {
    authenticate().then(loadClient());
  };

  function getResponse() {
    return gapi.client.gmail.users.messages
      .list({
        userId: "me",
        maxResults: 5,
      })
      .then(
        function (response) {
          console.log("Response:", response.result);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }

  function getEmails() {
    var request = gapi.client.gmail.users.messages.list({
      userId: "me",
      maxResults: 5,
    });
    request.execute(function (response) {
      var msg = response.messages;
      if (msg.length > 0) {
        for (var i = 0; i < msg.length; i++) {
          let id = msg[i].id;
          getMessage(id);
        }
      }
    });
  }

  function getMessage(id) {
    var request = gapi.client.gmail.users.messages.get({
      userId: "me",
      id: id,
      format: "full",
    });
    request.execute(function (response) {
      setEmails((emails) => {
        const newEmails = [...emails, response.result];
        return newEmails;
      });
    });
  }

  function markRead(id) {
    var request = gapi.client.gmail.users.messages.modify({
      userId: "me",
      id: id,
      resource: {
        removeLabelIds: ["UNREAD"],
      },
    });
    request.execute(function (response) {
      console.log("Marked as read:", response);
    });
  }

  return (
    <div className="App">
      <div className="buttons-container">
        <img className="quack" src={duck} />
        <button className="btn" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
      <MessageContainer messages={emails} />
      {/* currently only get snippet, need to get whole body through payload */}
    </div>
  );
}

export default App;
