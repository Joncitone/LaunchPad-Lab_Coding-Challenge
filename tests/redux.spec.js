/* eslint-env mocha */

import { expect } from 'chai';
import { Store } from '../js/store/index.js';
const store = new Store();
store.setInitialState();

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
  it('should have a dispatch method', function () {
    expect(store).to.have.property('dispatch');
  });
  it('dispatch should be a function', function () {
    expect(typeof store.dispatch).to.be.equal('function');
  });
  it('should have a reduce method', function () {
    expect(store).to.have.property('reduce');
  });
  it('reduce should be a function', function () {
    expect(typeof store.reduce).to.be.equal('function');
  });
  it('should have a subscribe method', function () {
    expect(store).to.have.property('subscribe');
  });
  it('subscribe should be a function', function () {
    expect(typeof store.subscribe).to.be.equal('function');
  });
  it('should have a publish method', function () {
    expect(store).to.have.property('publish');
  });
  it('publish should be a function', function () {
    expect(typeof store.publish).to.be.equal('function');
  });
});
