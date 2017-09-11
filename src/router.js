import React from 'react'
import {Switch, Route} from 'react-router-dom'
import News from './components/News/News'
import Matches from './components/Matches/Matches'
import MatchDetails from './components/Match-Details/Match-Details'


export default (
    <Switch>
        <Route component={News} path='/' exact />
        <Route component={Matches} path='/Matches'/>
        <Route component={MatchDetails} path='/Match/Details/:id'/>

    </Switch>
)















{/*
// import React from 'react'
// import {Switch, Route} from 'react-router-dom'


// export default  (
//     <Switch> 
//         <Route component={'/'}/>

//     </Switch>

// )*/}








