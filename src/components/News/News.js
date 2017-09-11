import React, { Component } from 'react';
import './News.css'

class News extends Component {
    render() {
        return (
            <div className='main-content-wrapper'>
                <div className='ad-left'> </div>

                <div className='center-content'>
                    <img className='mid-season' alt='cs ad' src={require('./mid-season-recap.jpeg')}/>
                     
                </div>

                <div className='ad-right'> </div>
                
            </div>
        );
    }
}

export default News;