const express = require('express')
const app = express()




app.get('/', (req, res) => {
    console.log('Hellow');
    const { getAudioUrl } = require('uberduck-api');
    getAudioUrl( 
        'pub_pckfcsdcoupvewrisx', 
        'pk_f0d47c47-ef01-4c2b-ae3e-a0d8aa92587f', 
        '0de662e2-f529-4549-916b-e63490338e1f', 
        'Hello world')
    .then(i => {
        console.log(i)
    })

    
    res.send('sup dawg')
})

app.listen(5000)