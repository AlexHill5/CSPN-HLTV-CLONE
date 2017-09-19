import React, { Component } from 'react';
import axios from 'axios'
import './results.css'
import {Link} from 'react-router-dom'

class Results extends Component {
    constructor(){
        super();
        this.state={

        }
    }

    componentWillMount(){
        axios.get('/Results').then(res => {
            this.setState({
                results: res.data
            })
        })
    }


    render() {
        if (this.state.results){
            console.log(this.state.results)
        var results =  this.state.results.map( match => {
           let team1URL
            if( match){
                return (
              <Link  className='link' to={`/Match/Details/${match.id}`} key ={match.id} >   <div className='upcoming-container-results'>
                    <div className='upcoming-team1-name-results'>{match.team1.name} </div>  
                    <div className='upcoming-team2-name-results'> <span className='match-result'>{match.result}</span> {match.team2.name}</div>
                    <div className='upcoming-event-name-results'> Event: {match.event.name} </div>
                </div>
                </Link>
                ) 
            }
        })
        }
        return (
            <div className='main-content-wrapper'>
                <div className='ad-left'> </div>

                <div className='center-content-results'>
                <div className='results-section'> 
                    <div className='results-header'> RESULTS </div>
                        {results}

                    </div> 
                
                     
                </div>

                <div className='ad-right'> </div>
                
            </div>
        );
    }
}

export default Results;