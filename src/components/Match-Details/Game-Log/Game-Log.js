import React, { Component } from 'react';
import './gamelog.css'
import io from 'socket.io-client'
const socket = io('http://localhost:4000')

class GameLog extends Component {
    constructor(){
        super();
        this.state = {

        }
        socket.on('live-scores', data => {
        if(this.props.id === data.id){
            console.log(data, 'updates-front end')
           {this.setState({score: [data.score]}); }
        }
        })
    }
    componentDidMount(){
        socket.emit('room', { id: this.props.id})
        socket.emit("Scorebot", this.props.id);
    }

    componentWillUnmount(){
        socket.emit('leave room', this.props.id);
    }


    render() {

        console.log(this.state.score)
        if (this.state.score){
        let ctPlayers = this.state.score["0"].CT.map( player => {
            switch (player.alive){
            case true: return (
             <div key={player.dbId} className='player-stats-alive'> 
                 <div className='team-identity-ct'> {player.name} </div>
                 <div className='stats'> ${player.money}</div>
                 <div className='stats'> {player.score}</div>
                 <div className='stats'> {player.assists}</div>
                 <div className='stats'> {player.deaths}</div>
                 <div className='stats'> {Math.floor(player.damagePrRound)}</div>
             </div>
             )
            case false: return (
            <div   key={player.dbId}  className='player-stats-dead'> 
                <div className='team-identity-ct'> {player.name} </div>
                <div className='stats'> ${player.money}</div>
                <div className='stats'> {player.score}</div>
                <div className='stats'> {player.assists}</div>
                <div className='stats'> {player.deaths}</div>
                <div className='stats'> {Math.floor(player.damagePrRound)}</div>
             </div>
            )
        }
    })
    
            let tPlayers = this.state.score["0"].TERRORIST.map( player => {
            switch (player.alive){
            case true: return (
             <div  key={player.dbId} className='player-stats-alive-t'> 
                 <div className='team-identity-ct'> {player.name} </div>
                 <div className='stats'> ${player.money}</div>
                 <div className='stats'> {player.score}</div>
                 <div className='stats'> {player.assists}</div>
                 <div className='stats'> {player.deaths}</div>
                 <div className='stats'> {Math.floor(player.damagePrRound)}</div>
             </div>
             )
            case false: return (
            <div key={player.dbId} className='player-stats-dead-t'> 
                <div className='team-identity-ct'> {player.name} </div>
                <div className='stats'> ${player.money}</div>
                <div className='stats'> {player.score}</div>
                <div className='stats'> {player.assists}</div>
                <div className='stats'> {player.deaths}</div>
                <div className='stats'> {Math.floor(player.damagePrRound)}</div>
             </div>
            )
        }
        })

        let ctRoundEventsFirstHalf = this.state.score['0'].ctMatchHistory.firstHalf.map( element => {
            switch (element.type){
                case 'Terrorists_Win': return <img key={element.roundOrdinal} className='round-event-image' src={require('./images/t_win.svg')} />;
                case 'CTs_Win': return  <img key={element.roundOrdinal} className='round-event-image'src={require('./images/ct_win.svg')} />
                case 'lost' : return <div key={element.roundOrdinal} className='round-event-image'> </div>;
                case 'Bomb_Defused': return <img  key={element.roundOrdinal} className='round-event-image'src={require('./images/bomb_defused.svg')} />
                case 'Target_Bombed':return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/bomb_exploded.svg')} />;
                case 'Target_Saved': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/stopwatch.svg')}/>
            }
        })

        let tRoundEventsFirstHalf = this.state.score['0'].terroristMatchHistory.firstHalf.map( element => {
            switch (element.type){
                case 'Terrorists_Win': return <img key={element.roundOrdinal} className='round-event-image' src={require('./images/t_win.svg')} />;
                case 'CTs_Win': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/ct_win.svg')} />
                case 'lost' : return <div key={element.roundOrdinal} className='round-event-image'> </div>;
                case 'Bomb_Defused': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/bomb_defused.svg')} />
                case 'Target_Bombed': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/bomb_exploded.svg')} />
                case 'Target_Saved': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/stopwatch.svg')} />;
            }
        })

        let ctRoundEventsSecondHalf = this.state.score['0'].ctMatchHistory.secondHalf.map( element => {
            switch (element.type){
                case 'Terrorists_Win': return <img key={element.roundOrdinal} className='round-event-image' src={require('./images/t_win.svg')} />;
                case 'CTs_Win': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/ct_win.svg')} />
                case 'lost' : return <div key={element.roundOrdinal} className='round-event-image'> </div>;
                case 'Bomb_Defused': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/bomb_defused.svg')} />
                case 'Target_Bombed':return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/bomb_exploded.svg')} />;
                case 'Target_Saved': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/stopwatch.svg')}/>
            }
        })

        let tRoundEventsSecondHalf = this.state.score['0'].terroristMatchHistory.secondHalf.map( element => {
            switch (element.type){
                case 'Terrorists_Win': return <img key={element.roundOrdinal} className='round-event-image' src={require('./images/t_win.svg')} />;
                case 'CTs_Win': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/ct_win.svg')} />
                case 'lost' : return <div key={element.roundOrdinal} className='round-event-image'> </div>;
                case 'Bomb_Defused': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/bomb_defused.svg')} />
                case 'Target_Bombed': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/bomb_exploded.svg')} />
                case 'Target_Saved': return <img key={element.roundOrdinal} className='round-event-image'src={require('./images/stopwatch.svg')} />;
            }
        })

        return (
            <div className='game-log-wrapper'>

                <div className='scoreboard'>
                    <div className='score-round'>
                        <h1 className='current-round'> CR: {this.state.score["0"].currentRound} </h1>
                        <div className='score-container'><h1 className='ct-scoreboard-score'>  {this.state.score['0'].counterTerroristScore}</h1> : <h1 className='t-scoreboard-score'>{this.state.score['0'].terroristScore}  </h1></div>
                        <img className='bomb-icon' src={require('./bomb-hltv.png')}/>
                    </div>
                    <div className='ct-score'>
                        <div className='counterTerrorists-team-name'>
                            <div className='team-identity-ct'> <img className='scoreboard-team-img' src={this.props.team1} />{this.state.score["0"].ctTeamName}</div>
                            <div className='stats'> $ </div>
                            <div className='stats'> K </div>
                            <div className='stats'> A </div>
                            <div className='stats'> D </div>
                            <div className='stats'> ADR </div> 
                        </div>
                        <div className='players-stats-container'>
                            {ctPlayers}
                        </div>
                        <div className='round-ending'>
                            {ctRoundEventsFirstHalf}
                            <div className='round-event-divider'> </div>
                            {ctRoundEventsSecondHalf}
                        </div>     
                    </div>
                    
                    <div className='t-score'>
                        <div className='round-ending'>
                            {tRoundEventsFirstHalf}
                            <div className='round-event-divider'> </div>
                            {tRoundEventsSecondHalf}
                        </div>   
                        <div className='terrorist-team-name'>
                            <div className='team-identity-t'><img className='scoreboard-team-img' src={this.props.team2} />{this.state.score["0"].terroristTeamName}</div>
                            <div className='stats'> $ </div>
                            <div className='stats'> K </div>
                            <div className='stats'> A </div>
                            <div className='stats'> D </div>
                            <div className='stats'> ADR </div> 
                        </div>
                        <div className='players-stats-container'>
                            {tPlayers}
                        </div>
                        </div> 
                    </div>
                
            </div>
        )}
        else return (
                        <div className='game-log-wrapper'>
                <div className='scoreboard'>
                    <div className='score-round'>
                        Live updates are for live games only!
                    </div>
                    <div className='ct-score'> </div>
                    <div className='t-score'>  </div> 
                </div>
                
            </div>

        )
    }
}

export default GameLog;