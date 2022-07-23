import React, { useState,useEffect } from 'react'
// import sound from './audio.wav';

const axios = require("axios").default;

const Speaker = ({ messageSnippet, loadingMsg }) => {
    const [wavAudio, setWavAudio] = useState();

    useEffect(() => {
      retrieveWavData();
    }, []);

    useEffect(() => {
      console.log(wavAudio);
    });

    const retrieveWavData = () => {
        console.log('Retrieving Wav Data...');
    
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
            speech: `${messageSnippet}`,
            voicemodel_uuid: '9b0ed5fa-d7ae-4516-be76-23db89074dea'
          }
        };

        axios.request(options).then(function (response) {
            console.log('Wav Data Retrieved!')
            console.log(response.data);

            const wavFile = response.data;
            
            const blob = new Blob([wavFile], {
                type: 'audio/wav'
            });

            const url = URL.createObjectURL(blob);

            var audio = new Audio(url);
            setWavAudio(audio);
            // audio.load()
            // audio.play();
          }).catch(function (error) {
            console.error(error);
          });
      }

      const playAudio = () => {
        wavAudio.load()
        wavAudio.play();
      }

    return (
        <div>
            <button onClick={retrieveWavData}>RETRIEVE ME!</button>
            {wavAudio && <button onClick={playAudio}>PLAY ME!</button>}
        </div>
    )
}

export default Speaker
