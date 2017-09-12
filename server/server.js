const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const  HLTV = require('hltv')
const socketIo = require("socket.io");
const http = require('http')

const app = express();
var server = http.createServer(app)

const io = socketIo(server);



app.use(cors())
app.use(bodyParser.json())


// LIVE MATCHES
let liveMatches = [] 
app.get('/Matches/Live', (req, res) => {
    HLTV.default.getMatches().then( response =>
        liveMatches = response.filter(e => {
            if (e.live) return e
        })
    ).then( response2 => (liveMatches === []) ? res.status(200).send('eat it') : res.status(200).send(liveMatches ) )
})

// UPCOMING 
app.get('/Matches/Upcoming', (req, res) => {
    HLTV.default.getMatches().then( response =>
        allMatches = response.filter(e => {
            if (!e.live) return e
        })
    ).then(response => res.status(200).send(allMatches))
})

// DETAILED API CALL
app.get('/Match/Details/:id', (req, res) => {
    HLTV.HLTV.getMatch({id: req.params.id}).then( matchDetails => {
        res.status(200).send(matchDetails)
    })

})

// SCOREBOT
app.get(`/Match/Score/:id`, (req, res) => {
    console.log(req.params.id)
    HLTV.default.connectToScorebot({id: req.params.id, onScoreboardUpdate: (data) => {
    res.status(200).send(data)
}, onLogUpdate: (data) => {
    console.log('hi')

}})
}).get(`/Match/Score/:id`, (req, res) => {
    console.log(req.params.id)
    HLTV.default.connectToScorebot({id: req.params.id, onScoreboardUpdate: (data) => {
    res.status(200).send(data)
}, onLogUpdate: (data) => {
    console.log('hi')

}})
})

// TEAM ROSTER/ PLAYER API CALLS

app.get(`/TeamDetails1/:id`, (req, res) => {
    HLTV.HLTV.getTeam({id: req.params.id}).then(response => {
       return  res.status(200).send(response.logo)
    })
})

app.get(`/TeamDetails2/:id`, (req, res) => {
    HLTV.HLTV.getTeam({id: req.params.id}).then(response => {
      return   res.status(200).send(response.logo)
    })
})







// SOCKETS ///////


const getApiAndEmit = socket => {
  app.get(`/Match/Score/:id`, (req, res) => {
    console.log(req.params.id)

})
}

let connections = [];
let roomid = {}
let matchId
let test



io.on("connection", socket => {
    console.log('socket connected')
    connections.push(socket);

    socket.on('room', data => {
        socket.join(data.id);
        roomid[data.id] = {}
        console.log(`joined room ${data.id}`)
        console.log(roomid, 'room array')
    })

    socket.on('leave room', data => {
        socket.leave(data)
        delete roomid[data]
        console.log('TERMINATED ROOM')
        console.log(roomid, 'spliced roomid')
    })


socket.on("Scorebot", (matchId) => {
    console.log(matchId, 'match id')
    HLTV.default.connectToScorebot({id: matchId, onScoreboardUpdate: (score) => {
        if ( roomid.hasOwnProperty(matchId) ){
            io.to(matchId).emit('live-scores', {score: score, id: matchId})
        } else return null
            }, onLogUpdate: (score) => {
                
            }})
})



    socket.on('disconnect', function () {
        console.log('asdlfjasdf')
    connections.splice(connections.indexOf(socket), 1);
     });

    socket.on('end the socket', () => {
        connections.splice(0,1)
    })











})






server.listen(4000, console.log('listening on 4000'))