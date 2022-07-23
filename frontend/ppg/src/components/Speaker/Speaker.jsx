import React from 'react'
// import sound from './audio.wav';

const axios = require("axios").default;

const options = {
  method: 'POST',
  url: 'https://api.uberduck.ai/speak-synchronous',
  responseType: 'arraybuffer',
  headers: {
    // Accept: 'application/json',
    'uberduck-id': 'anonymous',
    'Content-Type': 'audio/wav',
    Authorization: 'Basic cHViX3Bja2Zjc2Rjb3VwdmV3cmlzeDpwa19mMGQ0N2M0Ny1lZjAxLTRjMmItYWUzZS1hMGQ4YWE5MjU4N2Y='
  },
  data: {
    pace: 1,
    speech: 'Youre signed up to receive a daily report of some notifications from your Canvas account. Below is the report for 22 July. New group membership for BUSAN 302: Big Data and Machine Learning. Youve been added to a new group for the course BUSAN 302: Big Data and Machine Learning. The name of the group is LabGroup_Mon_11-1_B.',
    voicemodel_uuid: '9b0ed5fa-d7ae-4516-be76-23db89074dea'
  }
};


const Speaker = () => {
    const retrieveWavData = () => {
        alert('Hello World!');
    
        axios.request(options).then(function (response) {
            alert('im working')
            console.log(response.data);

            
            const wavFile = response.data;
            
            const blob = new Blob([wavFile], {
                type: 'audio/wav'
            });

            const url = URL.createObjectURL(blob);
            // var audio0 = new Audio(blobURL);

            var audio = new Audio(url);
            audio.load()
            audio.play();
          }).catch(function (error) {
            console.error(error);
          });
    }

    // const playAudio = () => {

    //     var audio = new Audio(sound);
    //     audio.play();
    //     /*
    //     var audioElement = new Audio('sponge.wav');
    //     audioElement.play();
    //     */
    // }

    return (
        <div>
            <button onClick={retrieveWavData}>RETRIEVE ME!</button>
            {/* <button onClick={playAudio}>PLAY ME!</button> */}
        </div>
    )
}

export default Speaker
