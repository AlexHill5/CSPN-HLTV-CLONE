import React, { Component } from 'react';
import './Team.css'
import axios from 'axios'
import {Bar, Line, Pie} from 'react-chartjs-2'





class Team extends Component {
    constructor(){
        super();
        this.state={}
    }

    componentDidMount(){
        axios.get(`/GetTeam/${this.props.match.params.id}`).then(response => {
            this.setState({ team: response.data})
          
        })
    }


    render() {

    console.log(this.state.team)
    if(this.state.team ){
    let data
    let test = []
    let dataIWant = ['cbl', 'cch', 'inf', 'mrg', 'ovp', 'trn', 'nuke']

    let mapStatistics = this.state.team.mapStatistics
    for (var i = 0; i < dataIWant.length; i++){
        let map = dataIWant[i]
        if(!mapStatistics.hasOwnProperty(map)){
            mapStatistics[map] = { winningPercentage: 0}
        }
    }



    data = {
    labels: ['Cache', 'cobblestone', 'Inferno', 'Mirage', 'Nuke', 'Train', 'Overpass'],
    datasets: [
        {
        label: 'Map Win Percentage',
        data: [this.state.team.mapStatistics.cch.winningPercentage, this.state.team.mapStatistics.cbl.winningPercentage, this.state.team.mapStatistics.inf.winningPercentage, this.state.team.mapStatistics.mrg.winningPercentage, this.state.team.mapStatistics.nuke.winningPercentage, this.state.team.mapStatistics.trn.winningPercentage, this.state.team.mapStatistics.ovp.winningPercentage],
        backgroundColor: [ 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)']
    }
    ]
        };

        var players = this.state.team.players.map( player => {
            return (
                <div key={player.id} className='player-wrapper'> 
                    <img className='player-img' src='https://static.hltv.org/images/playerprofile/blankplayer.svg' />
                    <div className='player-name'> {player.name} </div>
                </div>
            )
        })
        return (
        <div className='main-match-wrapper'>
            <div className='ad-left'> </div>

            <div className='center-content' >
                <div className='team-banner '>
                    <img className='team-logo-team-page'src={this.state.team.logo}/>
                    <div className='team-name-team-stats'> Team {this.state.team.name} </div>
                    <span className='team-rank'>Rank #{this.state.team.rank}</span>
                    <div className='team-location-img'>
                        <div className='pin-container'> <img className='location-pin' src={require('./location-pin.png')} /> {this.state.team.location} </div>
                    </div>
                </div>

                <div className='roster-container'> 
                    {players}
                </div>
                <Bar 
                    data={data}
                    width={400}
                    height={150}
                    options={{
                        title: {
                            display: true,
                            text: 'Map Win Percentage',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            positions: 'right'
                        }
                    }}
                />
            </div>
                <div className='ad-right'> </div>
            </div>
        );
    } else return <div> Loading! </div>
    }
}

export default Team;