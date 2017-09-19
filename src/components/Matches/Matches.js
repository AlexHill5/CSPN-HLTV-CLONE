import React, { Component } from 'react';
import axios from 'axios'
import './matches.css'
import {Link} from 'react-router-dom'

class Matches extends Component {
    constructor(){
        super();
        this.state={
        }
    }

    componentWillMount(){
        axios.get('/Matches/Live').then(response => {
            this.setState({liveMatches: response.data})
    }).then(response => console.log(this.state.liveMatches))
        axios.get('/Matches/Upcoming').then(res => {
            this.setState({upcomingMatches: res.data})

    })
    







    }


    render() {



        if(this.state.liveMatches && this.state.upcomingMatches){
        var live = this.state.liveMatches.map( live => {
            if(live.team1 && live.team2){
           var maps = live.maps.map( map =>{
                    return <div className='live-map-names'> {map} </div>
                 })
                return (
                <Link to={`/Match/Details/${live.id}`}  key={live.id}>
                <div  className='live-match-container'>
                    <div className='live-event'> {live.event.name}</div>
                        <div className='live-match-content-section'>
                            <div className='format-maps-container-live'>
                                <div className='format-live-match'>{live.format}</div> 
                                <div className='live-maps-container'> {maps} </div>
                            </div>
                            <div className='team-names-scores'>
                                <div className='team-name-live'> {live.team1.name} </div>
                                <div className='team-name-live'> {live.team2.name} </div>


                            </div>
                        </div>
                </div></Link>
                ) 
           
        }
        })

       var matches =  this.state.upcomingMatches.map( match => {
        let team1URL
            if( match.team1 && match.team2){
                var date = new Date (match.date)
                var month = date.getUTCMonth() + 1; //months from 1-12
                var day = date.getUTCDate();
                var year = date.getUTCFullYear();
                var newdate = month + "/" + day + "/" + year ;

            return (
            <Link  className='link' to={`/Match/Details/${match.id}`} key ={match.id} >
                <div className='upcoming-container'>
                    <div className='upcoming-team1-name'><span className='upcoming-date'>{ newdate }</span> {match.team1.name} </div>  
                    <div className='upcoming-team2-name'> <span className='upcoming-vs'>VS</span> {match.team2.name}</div>
                    <div className='upcoming-event-name'> {match.event.name} </div>
                </div>
                </Link>                  
                ) 
       }
        })
        }
        if(!this.state.liveMatches){
            
        return (
            <div className='main-content-wrapper'>
                <div className='ad-left'> </div>
                <div className='center-content-matches'>
                        <h1 className='matches-header'> UPCOMING MATCHES </h1>
                        {matches}
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
                    <div className='flex-wrap-live-matches'>
                        {live}
                    </div>
                    <div className='flex-wrap-upcoming-matches'>
                    <h1 className='matches-header'> UPCOMING MATCHES </h1>
                    <div className='upcoming-matches-section'> 
                        {matches}

                    </div> 
                </div>
                </div>
                <div className='ad-right'> </div>
                
            </div>
        )
    }
}

export default Matches;