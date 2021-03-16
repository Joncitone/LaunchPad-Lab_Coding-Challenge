import react from './react.js';
import angular from './angular.js';
import ember from './ember.js';
import vue from './vue.js';

export class Store {
  constructor() {
    this.state = {};
    this.prevState = {};
    this.subscribers = [];
  }
  setInitialState() {
    this.state = this.reduce(this.state, {});
  }

  getState() {
    return this.state;
  }

  getPrevState() {
    return this.prevState;
  }

  dispatch(action) {
    this.prevState = this.state;
    this.state = this.reduce(this.state, action);
    this.publish();

    return action;
  }

  reduce(state = this.state, action) {
    return {
      react: react(state.react, action),
      angular: angular(state.angular, action),
      ember: ember(state.ember, action),
      vue: vue(state.vue, action),
    };
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  publish() {
    this.subscribers.forEach(
      function (subscriber) {
        subscriber(this.prevState, this.state);
      }.bind(this)
    );
  }
}

const store = new Store();

export default store;
export * from './react.js';
export * from './angular.js';
export * from './ember.js';
export * from './vue.js';
