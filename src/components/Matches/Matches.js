import React, { Component } from 'react';
import axios from 'axios'
import './matches.css'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

class Matches extends Component {
    constructor(){
        super();
        this.state={
            upcomingMatches: [],
            liveMatches: [],
        }
    }

    componentWillMount(){

        axios.get('http://localhost:4000/Matches/Live').then(response => {
            this.setState({liveMatches: response.data})
    }).then(response => console.log(this.state.liveMatches))

        axios.get('http://localhost:4000/Matches/Upcoming').then(res => {
            this.setState({upcomingMatches: res.data})

    })







    }


    render() {
        var live = this.state.liveMatches.map( live => {
            if(live.team1 && live.team2){
                return (
                <Link to={`/Match/Details/${live.id}`}  key={live.id}><div  className='live-match-container'>
                        <div className='live-event'>{live.event.name}</div>
                        <h1> {live.team1.name}</h1>
                        <h1> {live.team2.name} </h1>
                        
                    </div></Link>
                ) 
            } 
        })

       var matches =  this.state.upcomingMatches.map( match => {
            if(match.team1 && match.team2){
                return (
                <Link to={`/Match/Details/${match.id}`} key ={match.id} ><div className='upcoming-matches-li'>
                    <h1> {match.team1.name} </h1> 
                    <h3> VS </h3>  
                    <h1> {match.team2.name}</h1>
                </div></Link>                  
                ) 
            }
        })

        if(this.state.upcomingMatches <= 0 && this.state.liveMatches <= 0){
        return (
            <div className='main-content-wrapper'>
                <div className='ad-left'> </div>

                <div className='center-content'>
                    LOADING......
                </div>

                <div className='ad-right'> </div>
                
            </div>
        )}
        else 
        return (
            <div className='main-content-wrapper'>
                <div className='ad-left'> </div>
                <div className='center-content-matches'>
                    <h1 className='matches-header'> LIVE MATCHES </h1>
                    <div className='flex-wrap-matches'>
                        {live}
                    </div>
                        <h1 className='matches-header'> UPCOMING MATCHES </h1>
                        {matches}
                </div>

                <div className='ad-right'> </div>
                
            </div>
        )
    }
}

export default Matches;