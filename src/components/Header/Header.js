import React from 'react';
import './header.css'
import {Link} from 'react-router-dom'
const Header = () => {
    return (
        <div className='main-container-header'>
          <Link to='/'>  <img className='hltv-logo' src={require('./hltv-logo.png')}/></Link>

     
               <Link to='/'> <h2 className='links'> NEWS </h2> </Link>
               <Link to='/Matches'> <h2 className='links'> MATCHES </h2> </Link>
                <h2 className='links'> RESULTS </h2>
                <h2 className='links'> BETS </h2>
        </div>
    );
};

export default Header;