import React, { Component } from 'react';
import Home from './HomeComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
// import DishDetail from "./DishdetailComponent";
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import {Switch, Route, Redirect} from 'react-router-dom'

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }
  }

  render() {
    const {dishes, promotions, leaders} = this.state;
    const HomePage = () => {
      return (
        <Home 
          dish={dishes.filter(dish => dish.featured)[0]} 
          leader={leaders.filter(leader => leader.featured)[0]}
          promotion={promotions.filter(promotion => promotion.featured)[0]}              
        />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route exact path='/contactus' component={Contact} />
          <Redirect to='/home' />
        </Switch>                   
        <Footer />
      </div>
    );
  }
}

export default Main;
