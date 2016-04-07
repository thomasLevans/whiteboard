import d3 from 'd3';
import uuid from 'uuid';

import DEF_CONFIG from './config.js';

export default class Whiteboard {

  constructor(config = DEF_CONFIG) {
    this.elem = config.elem || DEF_CONFIG.elem;
    this.width = config.width || DEF_CONFIG.width;
    this.height = config.height || DEF_CONFIG.height;

    this.board = undefined;
    this.input = undefined;
    this.drawStack = [];
    this.editBuffer = [];

    d3.select(this.elem)
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    this.board = d3.select('svg')
      .call(d3.behavior.drag()
        .on('dragstart', this._drawingStart)
        .on('drag', this._drawing)
        .on('dragend', this._drawingStop));
  }

  /**
  * resets the whiteboard
  *
  * @method
  */
  reset() {
    d3.selectAll('.line')
      .remove();
  }

  /**
  * undo last input to the whiteboard
  *
  * @method
  */
  undo() {
    let inputToUndo = this.drawStack.pop();

    // inputToUndo = d3.select('#' + inputToUndo);

    this.editBuffer.push(inputToUndo);

    // inputToUndo.remove();
  }

  /**
  * redoes last input to the whiteboard
  *
  * @method
  */
  redo() {
    let inputToRedo = this.editBuffer.pop();

    this.drawStack.push(inputToRedo);
  }

  /**
  * user starts drawing
  *
  * @method
  */
  _drawingStart() {
    let id = uuid.v4();

    this.input = d3.select('svg')
      .append('path')
      .datum([])
      .attr('class', 'line')
      .attr('id', id);

    this.drawStack.push(id);
  }

  /**
  * user is drawing
  *
  * @method
  */
  _drawing() {
    let _renderInput = d3.svg.line()
      .x((d) => { return d[0]; })
      .y((d) => { return d[1]; })
      .interpolate('basis');

    this.input.datum()
      .push(d3.mouse(this));

    this.input.attr('d', _renderInput);
  }

  /**
  * user stop drawing
  *
  * @method
  */
  _drawingStop() {
    this.input = undefined;
  }
}
