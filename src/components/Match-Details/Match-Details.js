import React, { Component } from 'react';
import axios from 'axios'
import './match-details.css'
import GameLog from './Game-Log/Game-Log.js'
import io from 'socket.io-client'
const socket = io('http://localhost:4000')

class MatchDetails extends Component {
        constructor(){
            super();
            this.state= {
            }
        }

        componentDidMount(){
            let test 
            let test1
            let test2
            axios.get(`http://localhost:4000/Match/Details/${this.props.match.params.id}`).then(res => {
                res.data.date = new Date(res.data.date)
                test = [res.data]
            }).then(response => {
                axios.get(`http://localhost:4000/TeamDetails1/${test['0'].team1.id}`).then( response2 => {
                    console.log(response2, 'waht the hell')
                    test1 = response2.data
                }).then(response => {
                axios.get(`http://localhost:4000/TeamDetails2/${test['0'].team2.id}`).then( response3 => {
                    test2 = response3.data
                    this.setState({
                        team1: test1,
                        match: test,
                        team2: test2,
                    })
                })
            })
            })

        }






    render() {
        let maps
        let streams
        let team1

        if(this.state.match){
            console.log(this.state.match, "match details")
            
    }


    if(this.state.match){

    maps = this.state.match["0"].maps.map( map => {
        switch (map.name){
            case 'mrg': return (<div key={map.name} className='maps'><div  className='maps-img-mrg'> {map.name = 'Mirage'}</div> <div>Results: {map.result} </div> </div>)
            case 'ovp': return (<div key={map.name} className='maps'><div  className='maps-img-ovp'> {map.name = 'Overpass'}</div> <div>Results: {map.result} </div> </div>)
            case 'trn': return (<div key={map.name} className='maps'><div  className='maps-img-trn'> {map.name = 'Train'}</div>   <div> Results: {map.result} </div> </div>)
            case 'cch': return (<div key={map.name} className='maps'><div  className='maps-img-cch'> {map.name = 'Cache'}</div>   <div>Results: {map.result} </div> </div>)
            case 'cbl': return (<div key={map.name} className='maps'><div  className='maps-img-cbl'> {map.name = 'Cobblestone'}</div> <div>Results: {map.result} </div> </div>)
            case 'nuke':return (<div key={map.name} className='maps'><div  className='maps-img-nuke'> {map.name = 'Nuke'}</div>   <div>Results: {map.result} </div> </div>)
            case 'inf':return (<div key={map.name} className='maps'><div  className='maps-img-inf'> {map.name = 'Inferno'}</div>   <div>Results: {map.result} </div> </div>)

            case 'tba': return (<div key={map.name} className='TBD' > {map.name = 'To Be Determined'} </div>)

            default: return (<div key={map.name}> {map.name} </div>)
        }

    })

    streams = this.state.match["0"].streams.map( stream => { 
        return <a href={stream.link} target="_blank"  key={stream.name}><div className='streams'> <div> {stream.name}</div> <div> {stream.viewers}</div> </div></a>
    }) 



}




        if(!this.state.match ){
        return (
            <div className='main-match-wrapper'>
                <div className='ad-left'> </div>

                <div className='center-content'>
                    <h1> LOADING....</h1>
                </div>

                <div className='ad-right'> </div>
                
            </div>
        );
        } else return(
            <div className='main-match-wrapper'>
                <div className='ad-left'> </div>

                <div className='center-content-detailed-match'>
                    <div className='match-banner-top'>

                        <div className='team1-left'>
                            <img className='team-logo' src={this.state.team1} /> 
                            <h1 className='team-name'>{this.state.match["0"].team1.name}</h1>
                        </div>

                        <div className='time-and-event'>
                            <h1>{this.state.match["0"].date.getHours()}:00</h1>
                            <h1>{this.state.match["0"].date.getMonth()+1}-{this.state.match["0"].date.getDate()}-{this.state.match["0"].date.getFullYear()}</h1>
                            <p>{this.state.match["0"].event.name}</p>
                        </div>

                        <div className='team2-right'>
                            <img className='team-logo' src={this.state.team2} />
                            <h1 className='team-name'>{this.state.match["0"].team2.name}</h1>
                        </div>

                    </div>

                    <div className='maps-livestreams-section'>
                        <div className='maps-left'>
                            <h1 className='map-stream-headers'> MAPS </h1>
                            {maps}
                        </div>

                        <div className='streams-right'>
                            <h1 className='map-stream-headers'> LIVESTREAMS </h1> 
                            {streams}
                        </div>
                    </div>
                    <div className='scoreboard-gamelog-section'>
                        <GameLog id={this.props.match.params.id} team1={this.state.team1} team2={this.state.team2} />
                    </div>

                </div>
  

                <div className='ad-right'> </div>
            </div>
        )
    }
}

export default MatchDetails;