import React, {Component} from 'react';
import './header.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Header extends Component {
    render(){
    return (
        <div className='main-container-header'>
          <Link to='/'>  <img className='hltv-logo' src={require('./hltv-logo.png')}/></Link>
               <Link to='/'> <h2 className='links'> NEWS </h2> </Link>
               <Link to='/Matches'> <h2 className='links'> MATCHES </h2> </Link>
               <Link to='/Results'> <h2 className='links'> RESULTS </h2> </Link>
                <h2 className='links'> LOGIN </h2>  
        </div>
    );
    }
};

export default Header;