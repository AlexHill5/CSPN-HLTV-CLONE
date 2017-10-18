import React, { Component } from 'react';
import './gameUpdates.css'
import io from 'socket.io-client'
let socket

class gameUpdates extends Component {
    constructor(){
        super();
        this.state={
            gameLog: []
        }
    }

    componentDidMount(){
    socket =  io('http://localhost:4000');

    socket.on('game-log-updates', data => {
        if(this.props.id === data.id){
           var temp = (this.state.gameLog).concat(data.score) 
           if(this.state.gameLog.indexOf(data.score) === -1){
           {this.setState({gameLog: temp})
        }
        }

    }

})

    socket.emit('room', { id: this.props.id})
    socket.emit("Game Logs", this.props.id);
    }



    render() {
        console.log(this.state.gameLog, 'game log')



        if (this.state.gameLog){

         var logs = this.state.gameLog.reverse().map( (log, i) => {
             if(log.log[0].Kill){
                return <div className='kill'> <span className={`${log.log[0].Kill.killerSide}`}>{log.log[0].Kill.killerName}</span> killed <span className={`${log.log[0].Kill.victimSide}`}>{log.log[0].Kill.victimName}</span> with {log.log[0].Kill.weapon} </div>
            } else if(log.log[0].RoundStart){
                return <div className='round-started'> Round Started </div>
            } else if(log.log[0].RoundEnd){
                return <div className='round-ended'> Round Over - <span className='CT'> CT:{log.log[0].RoundEnd.counterTerroristScore}</span> / <span className='TERRORIST'>T:{log.log[0].RoundEnd.terroristScore}</span> </div>
            } else if (log.log[0].PlayerJoin){
                return <div className='player-joined'> Player Joined: {log.log[0].PlayerJoin.playerName} </div>
            } else if (log.log[0].PlayerQuit){
                return <div className='player-quit'> Player Quit: <span className={`${log.log[0].PlayerQuit.PlayerSide}`}>{log.log[0].playerQuit.playerName} </span></div>
            } else if (log.log[0].BombPlanted){
                return <div className='kill'><span className='TERRORIST'> {log.log[0].BombPlanted.playerName}</span> planted bomb. (<span className='CT'>{log.log[0].BombPlanted.ctPlayers}</span> vs <span className='TERRORIST'> {log.log[0].BombPlanted.tPlayers})</span>  </div>
            } else if(log.log[0].BombDefused){
                return <div className='kill'> <span className='CT'>{log.log[0].BombDefused.playerName}</span> defused the bomb </div>
            }
            })

        }

        return (
            <div className='game-updates-container'>
            {logs}
                
            </div>
        );
    }
}

export default gameUpdates;