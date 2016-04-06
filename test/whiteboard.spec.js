import {expect} from 'chai';

import Whiteboard from '../src/whiteboard';

describe('Whiteboard', () => {

  it('has properties...', () => {
    let whiteboard = new Whiteboard();

    expect(whiteboard).to.have.property('width');
    expect(whiteboard).to.have.property('height');
    expect(whiteboard).to.have.property('elem');
    expect(whiteboard).to.have.property('board');
    expect(whiteboard).to.have.property('input');
  });

  it('has methods...', () => {
    let whiteboard = new Whiteboard();

    expect(whiteboard).to.have.property('init');
    expect(whiteboard).to.have.property('reset');
    expect(whiteboard).to.have.property('_drawingStart');
    expect(whiteboard).to.have.property('_drawingStop');
    expect(whiteboard).to.have.property('_drawing');
  });

  it('can be instantiated using default config', () => {
    let whiteboard = new Whiteboard();

    expect(whiteboard.width).to.equal(800);
    expect(whiteboard.height).to.equal(600);
    expect(whiteboard.elem).to.equal('body');
  });

  it('can be instantiated w/ some config specified', () => {
    let myConfig = {
      elem: 'div#whiteboard'
    };
    let whiteboard = new Whiteboard(myConfig);

    expect(whiteboard.width).to.equal(800);
    expect(whiteboard.height).to.equal(600);
    expect(whiteboard.elem).to.equal('div#whiteboard');
  });

  it('can be instantiated using specific config', () => {
    let myConfig = {
      elem: 'div#whiteboard',
      width: 600,
      height: 300
    };
    let whiteboard = new Whiteboard(myConfig);

    expect(whiteboard.width).to.equal(600);
    expect(whiteboard.height).to.equal(300);
    expect(whiteboard.elem).to.equal('div#whiteboard');
  });

});
