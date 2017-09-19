require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const  HLTV = require('hltv')
const socketIo = require("socket.io");
const http = require('http')
const session = require('express-session');
const passport = require('passport');
const massive = require('massive')
const Auth0Strategy = require('passport-auth0');
const secrets = require('./secrets.js')

const app = express();
var server = http.createServer(app)

const io = socketIo(server);

let userid


app.use(cors())
app.use(bodyParser.json())
app.use(session({
  secret: '123412341234123412341234123assasdadsfasdfwa412341234124',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));

massive({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true
}).then( db => {
  app.set('db', db);
})




passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL
}, function(accessToken, refreshToken, extraParams, profile, done) {

    const db = app.get('db');
        db.find_user([  profile.emails[0].value ])
        .then( user => {
        if ( user[0] ) {
        db.coins([user[0].id]);
        userid = user[0].id
        return done( null, { id: user[0].id } );

        } else {

            db.create_user([profile.displayName, profile.emails[0].value, profile.picture, ])

            .then( user => {
            userid = user[0].id
                db.coins.sql([user[0].id]);
                return done( null, { id: user[0].id } );
            })

        }
        })



}));

app.get('/auth', passport.authenticate('auth0'));


passport.serializeUser(function(user, done) {
    console.log(user, 'its here!')
  return done(null, user);
});

passport.deserializeUser(function(obj, done) {
app.get('db').find_session_user([obj.id])
  .then( user => {
    return done(null, user[0]);
  })
});
app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/Matches',
  failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/auth/me', (req, res, next) => {
  if (!req.user) {
    return res.status(404).send('User not found');
  } else {
    return res.status(200).send(req.user);
  }
})

app.get('/getUser', (req, res) => {

    const db = req.app.get('db');
    db.get_coins([userid]).then( response => {
        res.status(200).send(response)
    })

})

app.get('/getCoins', (req, res) => {
        const db = req.app.get('db');
        db.all_coins([userid]).then( response2 => {
        res.status(200).send(response2)
    })
})



app.get('/auth/logout', (req, res) => {
  req.logOut();
  return res.redirect(302, 'http://localhost:3000/');
})
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

//Results
app.get('/Results', (req, res) => {
    HLTV.HLTV.getResults({startDate: '2017-09-17', endDate: '2017-09-29'}).then(response => {
        res.status(200).send(response)
    })
})

//Team
app.get('/GetTeam/:id', (req, res) => {
    
    HLTV.HLTV.getTeam({id: req.params.id}).then(response => {
          res.status(200).send(response)
    })
})





// DETAILED Match API CALL
app.get('/Match/Details/:id', (req, res) => {
    HLTV.HLTV.getMatch({id: req.params.id}).then( matchDetails => {
        res.status(200).send(matchDetails)
    })

})

// Match Stats
app.get('/test', (req, res) => {
HLTV.HLTV.getMatchesStats({id: 2314769}).then((response) => {
 
})
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
        if ( roomid.hasOwnProperty(matchId) ){
            io.to(matchId).emit('game-log-updates', {score: score, id: matchId})
        }
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