import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from '../containers/Home';
import Search from '../containers/SearchBooksPage';
class AppRouter extends React.Component{
render(){
  return(
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/search'
      component={Search}/>

    </Router>
  );
};

}
export default AppRouter;
