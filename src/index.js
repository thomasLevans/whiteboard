import d3 from 'd3';

import Whiteboard from './whiteboard';

let config = {
  elem: '#whiteboard',
  width: 1100
};

let whiteboard = new Whiteboard(config);

whiteboard.init();

d3.select('#btnReset')
  .on('click', () => {
    whiteboard.reset();
  });
