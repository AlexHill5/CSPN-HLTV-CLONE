import React, { Component } from 'react';
import './News.css'

class News extends Component {
    render() {
        return (
            <div className='main-content-wrapper'>
                <div className='ad-left'> </div>

                <div className='center-content'>
                    <div className='news-header'> LATEST NEWS </div>
                    <a href='https://www.hltv.org/news/21260/olofmeister-joins-faze-replaces-kioshima' target='_blank'><div className='olaf-news'>
                        <div className='olaf-picture'>
                        </div>
                        <div className='olaf-text'>
                        <h1 className='headers-news'> OlofMeister To Faze! </h1>
                          After a 3-year-long tenure in fnatic, Olof "olofmeister"
                            Kajbjer has parted ways with the Swedish team and will be joining FaZe.
                            Fabien "kioShiMa" Fiey is the player that will be removed from the active lineup of the international squad to make room for the incoming Swede.
                        </div> 
                    </div></a>
                   <a href='https://www.hltv.org/news/21532/niko-were-going-to-try-to-win-every-event-possible-now-we-have-everything-to-do-that' target="_blank"> <div className='niko-news'>
                        <div className='niko-text'>
                        <h1 className='headers-news'> Can NiKo Put Faze At The Top? </h1>
                         NIKO: "WE'RE GOING TO TRY TO WIN EVERY EVENT POSSIBLE, NOW WE HAVE EVERYTHING TO DO THAT"

                        </div>

                        <iframe className='niko-liquid' src="https://www.youtube.com/embed/8Aw-WnqsHvs?ecver=2" allowfullscreen>
                        </iframe>
                    </div></a>
                   <a href='http://epicenter.gg/en' target="_blank"> <div className='epicenter-ad'></div> </a>

                </div> 

                <div className='ad-right'> </div>
                
            </div>
        );
    }
}

export default News;
