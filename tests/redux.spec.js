/* eslint-env mocha */

import { expect } from 'chai';
import { Store } from '../js/store/index.js';
import { getAngularScore } from '../js/store/angular.js';
import { getReactIssues } from '../js/store/react.js';
const store = new Store();
store.setInitialState();

let stateChanged = false;

describe('Redux store', function () {
  it('store should be an instance of the Store class', function () {
    expect(store instanceof Store).to.be.equal(true);
  });
  it('should have a state property', function () {
    expect(store).to.have.property('state');
  });
  it('state should be an object', function () {
    expect(typeof store.state).to.be.equal('object');
  });
  it('should have a prevState property', function () {
    expect(store).to.have.property('prevState');
  });
  it('prevState should be an object', function () {
    expect(typeof store.prevState).to.be.equal('object');
  });
  it('should have a subscribers list', function () {
    expect(store).to.have.property('subscribers');
  });
  it('subscribers should be an array', function () {
    expect(Array.isArray(store.subscribers)).to.be.equal(true);
  });
});

describe('Store methods', function () {
  it('store should have a dispatch method', function () {
    expect(store).to.have.property('dispatch');
  });
  it('dispatch should be a function', function () {
    expect(typeof store.dispatch).to.be.equal('function');
  });
  it('dispatch should accept an action and update state', function () {
    store.dispatch(getAngularScore(42));
    expect(store.state.angular.score).to.be.equal(42);
  });
  it('store should have a reduce method', function () {
    expect(store).to.have.property('reduce');
  });
  it('reduce should be a function', function () {
    expect(typeof store.reduce).to.be.equal('function');
  });
  it('reduce should take a current state, and an action, and return an updated state', function () {
    expect(
      store.reduce(store.state, getReactIssues(99)).react.issues
    ).to.be.equal(99);
  });
  it('store should have a subscribe method', function () {
    expect(store).to.have.property('subscribe');
  });
  it('subscribe should be a function', function () {
    expect(typeof store.subscribe).to.be.equal('function');
  });
  it('subscribe should add a function to the subscribers list', function () {
    store.subscribe(function changeDetector(prevState, state) {
      prevState !== state ? (stateChanged = true) : (stateChanged = false);
    });
    expect(store.subscribers.length).to.be.equal(1);
  });
  it('store should have a publish method', function () {
    expect(store).to.have.property('publish');
  });
  it('publish should be a function', function () {
    expect(typeof store.publish).to.be.equal('function');
  });
  it('publish should inform subscribers of changes in state', function () {
    store.publish(false, true);
    expect(stateChanged).to.be.equal(true);
  });
});
