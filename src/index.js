import React from 'react';
import satnav from 'satnav';
import app from 'oolon-startapp'
import ReactDOM from 'react-dom';
import './index.css';

const init = {location: {page: "Home"}}

const update = {
  goto: (state, location) => [{...state, location}]
}

const App = ({state, msg}) => {
  return (
    <div>
      <h1>{state.location.page} {state.location.user || ""}</h1>
      <nav>
        <div><a href="#home">Home</a></div>
        <div><a href="#users/andreas">Andreas</a></div>
        <div><a href="#users/raj">Raj</a></div>
      </nav>
    </div>
  );
};
const render = (state, msg) => ReactDOM.render(<App state={state} msg={msg}/>, document.getElementById('root'));


app({
  init,
  update, 
  render,
  hooks: {
    "onUpdate": (state) => console.log(state),
    "onInit": (state, msg) => {
      satnav({})
        .navigate({
          path: "home",
          title: "Home",
          directions: () => msg.goto({page: "Home"})
        })
        .navigate({
          path: "users/{user}",
          title: "User",
          directions: ({user}) => msg.goto({page: "User", user})
        })
        .go()
    }
  }
})
