import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };

  }

  render() {

    const HomePage = () => {
      return(
          <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    return (
        <div>
          <Header />
            <Switch>
              <Route path="/home" component={HomePage} />
              {/* //exact path significa que a url tem que ser exatamente "/menu", sem nenhuma outra rota adicional */}
              {/* Para passar props num component Route, é necessário definir uma função (neste caso arrow function)*/}
              <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
              <Route exact path="/contactus" component={Contact} />
              <Redirect to="/home" />
            </Switch>
          <Footer />
        </div>
    );
  }
}

export default Main;
