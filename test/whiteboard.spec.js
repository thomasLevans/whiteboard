import {expect} from 'chai';
import d3 from 'd3';

import Whiteboard from '../src/whiteboard';

describe('Whiteboard', () => {

  it('has properties...', () => {
    let whiteboard = new Whiteboard();

    expect(whiteboard).to.have.property('width');
    expect(whiteboard).to.have.property('height');
    expect(whiteboard).to.have.property('elem');
    expect(whiteboard).to.have.property('board');
    expect(whiteboard).to.have.property('input');
    expect(whiteboard).to.have.property('drawStack');
    expect(whiteboard).to.have.property('editBuffer');
  });

  it('has methods...', () => {
    let whiteboard = new Whiteboard();

    expect(whiteboard).to.have.property('reset');
    expect(whiteboard).to.have.property('_drawingStart');
    expect(whiteboard).to.have.property('_drawingStop');
    expect(whiteboard).to.have.property('_drawing');
  });

  it('can be instantiated using default config', () => {
    let whiteboard = new Whiteboard();

    let svg = d3.select('svg');

    expect(whiteboard.width).to.equal(800);
    expect(whiteboard.height).to.equal(600);
    expect(whiteboard.elem).to.equal('body');
    expect(whiteboard.board).to.deep.match(svg);
  });

  it('can be instantiated w/ some config specified', () => {
    let myConfig = {
      elem: 'div#whiteboard'
    };
    let whiteboard = new Whiteboard(myConfig);

    let svg = d3.select('svg');

    expect(whiteboard.width).to.equal(800);
    expect(whiteboard.height).to.equal(600);
    expect(whiteboard.elem).to.equal('div#whiteboard');
    expect(whiteboard.board).to.deep.match(svg);
  });

  it('can be instantiated using specific config', () => {
    let myConfig = {
      elem: 'div#whiteboard',
      width: 600,
      height: 300
    };
    let whiteboard = new Whiteboard(myConfig);

    let svg = d3.select('svg');

    expect(whiteboard.width).to.equal(600);
    expect(whiteboard.height).to.equal(300);
    expect(whiteboard.elem).to.equal('div#whiteboard');
    expect(whiteboard.board).to.deep.match(svg);
  });

  it('can undo drawing', () => {
    let whiteboard = new Whiteboard();

    whiteboard.drawStack = [
      'input1',
      'input2',
      'input3'
    ];

    whiteboard.undo();

    expect(whiteboard.drawStack).to.deep.match(['input1','input2']);
  });

  it('can redo drawing', () => {
    let whiteboard = new Whiteboard();

    whiteboard.drawStack = [
      'input1',
      'input2',
      'input3'
    ];

    whiteboard.undo();
    whiteboard.undo();
    whiteboard.redo();
    whiteboard.redo();

    expect(whiteboard.drawStack).to.deep.match(['input1','input2','input3']);
  });

  afterEach(() => {
    d3.select('svg')
      .remove();
  });

});
