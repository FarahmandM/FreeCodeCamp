/*
 * @author: Farahmand Moslemi
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Cell extends Component {
  handleClick(e) {
    const dataCell = {row: this.props.row, col: this.props.col};
    this.props.changeCellData(dataCell);
  }

  render() {
    const cn = this.props.val ? 'on' : '';
    return (
      <td className={cn} onClick={this.handleClick.bind(this)}></td>
    )
  }
}

class Board extends Component {
  handleCellClick(data) {
    this.props.toggleCellData(data);
  }

  render() {
    const size = this.props.size;
    const data = this.props.data;
    var tds = [];
    var tbody = [];
    var row = 0;
    for (let i = 0, numCells = size.rows * size.cols; i < numCells; i++) {
      let col = i % size.cols;
      tds.push(<Cell key={i} val={data[row][col]} col={col} row={row} changeCellData={this.handleCellClick.bind(this)}></Cell>);
      if((i + 1) % size.cols === 0){
        tbody.push(<tr key={row}>{tds}</tr>);
        tds = [];
        row++;
      }
    }

    return (
      <table className={this.props.className}>
        <tbody>
          {tbody}
        </tbody>
      </table>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.SLOW = 1000;
    this.FAST = 50;

    this.changeSize = this.changeSize.bind(this);

    this.boards = {
      small: {
        boardSize: { cols: 25, rows: 15 }
      },
      medium: {
        boardSize: { cols: 50, rows: 30 }
      },
      large: {
        boardSize: { cols: 100, rows: 60 }
      }
    }

    this.speed = this.FAST;

    let boardClass = 'small';
    let {boardSize} = this.boards[boardClass];

    this.state = {boardClass, boardSize, data: this.generateRandomData(boardSize.rows, boardSize.cols), generation: 0}
  }

  componentWillMount() {
   this.seed();
  }

  componentDidMount(){
    this.play();
  }

  clearInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  componentWillUnmount() {
    this.clear();
  }

  generateRandomData(numRows, numCols, empty = true) {
    let cols = [];
    let data = [];
    for (let i = 0, numCells = numRows * numCols; i < numCells; i++) {
      let col = i % numCols;
      let val = empty ? false : Math.random() < 0.25;
      cols.push(val);
      if((i + 1) % numCols === 0){
        data.push(cols);
        cols = [];
      }
    }
    return data;
  }

  seed() {
    let {boardSize} = this.state;
    let data = this.generateRandomData(boardSize.rows, boardSize.cols, false);
    if(document.querySelector('#pause')) {
      this.removeClassName('#control-btns button');
      document.querySelector('#pause').className = 'active';
    }
    this.clearInterval();
    this.setState({data, generation: 0});
  }
  
  clear() {
    let {boardSize} = this.state;
    let data = this.generateRandomData(boardSize.rows, boardSize.cols);
    let generation = 0;
    this.removeClassName('#control-btns button');
    document.querySelector('#pause').className = 'active';
    this.clearInterval();
    this.setState({data, generation});
  }

  updateData() {
    const {data} = this.state;
    let changedData = data.clone();

    const {rows, cols} = this.state.boardSize;
    let newLives = 0;

    for(let i = 0; i < rows; i++) {
		  for(let j = 0; j < cols; j++) {
        let liveNeighbours = 0;

        let topI = (i - 1 + rows) % rows;
        let bottomI = (i + 1) % rows;
        let leftJ = (j - 1 + cols) % cols;
        let rightJ = (j + 1) % cols;

        if (data[topI][leftJ]) liveNeighbours++;
        if (data[topI][j]) liveNeighbours++;
        if (data[topI][rightJ]) liveNeighbours++;
        if (data[i][leftJ]) liveNeighbours++;
        if (data[i][rightJ]) liveNeighbours++;
        if (data[bottomI][leftJ]) liveNeighbours++;
        if (data[bottomI][j]) liveNeighbours++;
        if (data[bottomI][rightJ]) liveNeighbours++;

        if (data[i][j]) {
          if (liveNeighbours < 2 || liveNeighbours > 3) changedData[i][j] = false;
        } else {
          if(liveNeighbours === 3) changedData[i][j] = true;
        }
        !changedData[i][j] || newLives++;
  	  }
		}
    if(newLives) {
      const generation = this.state.generation + 1;
      this.setState({data: changedData, generation});
    } else {
      this.clear();
    }
  }

  removeClassName(queryAll) {
    document.querySelectorAll(queryAll).forEach(elem => {
      elem.className = '';
    });
  }

  play() {
    this.removeClassName('#control-btns button');
    document.querySelector('#play').className = 'active';
    this.clearInterval();
    this.interval = setInterval(() => {
      this.updateData();
    }, this.speed);
  }

  pause() {
    this.removeClassName('#control-btns button');
    document.querySelector('#pause').className = 'active';
    this.clearInterval();
  }

  slow() {
    this.speed = this.SLOW;
    this.removeClassName('#speed-btns button');
    document.querySelector('#slow').className = 'active';
    if(this.interval) {
      this.play();
    }
	}

	fast() {
    this.speed = this.FAST;
    this.removeClassName('#speed-btns button');
    document.querySelector('#fast').className = 'active';
		if(this.interval) {
      this.play();
    }
	}

  changeSize(e) {
    //let boardClass = e.target.value;
    //e.target.className = "active";
    let boardClass = e.target.textContent.toLowerCase();
    let {boardSize} = this.boards[boardClass];
    //let data = this.generateRandomData(boardSize.rows, boardSize.cols, false);
    let data = this.generateRandomData(boardSize.rows, boardSize.cols);
    this.removeClassName('#control-btns button');
    document.querySelector('#pause').className = 'active';
    this.clearInterval();
    this.setState({boardClass, boardSize, data, generation: 0})
  }

  toggleCellData(cellData) {
    let data = this.state.data;
    const row = cellData.row;
    const col = cellData.col;
    data[row][col] = !data[row][col];
    this.setState({data});
  }

  render() {
    return (
      <div>
        <div className="btn-group">
          <button onClick={this.changeSize} className={this.state.boardClass === 'small' ? 'active' : ''}>Small</button>
          <button onClick={this.changeSize} className={this.state.boardClass === 'medium' ? 'active' : ''}>Medium</button>
          <button onClick={this.changeSize} className={this.state.boardClass === 'large' ? 'active' : ''}>Large</button>
        </div>

        <div className="btn-group">
          <button onClick={this.seed.bind(this)}>Seed</button>
          <button onClick={this.clear.bind(this)}>Clear</button>
        </div>

        <div id="control-btns" className="btn-group">
          <button id="play" onClick={this.play.bind(this)} className="active">Play</button>
          <button id="pause" onClick={this.pause.bind(this)}>Pause</button>
        </div>
        
        <div id="speed-btns" className="btn-group">
          {/* <button onClick={this.slow.bind(this)} className={this.speed === this.SLOW ? 'active' : ''}>Slow</button> */}
          {/* <button onClick={this.fast.bind(this)} className={this.speed === this.FAST ? 'active' : ''}>Fast</button> */}
          <button id="slow" onClick={this.slow.bind(this)}>Slow</button>
          <button id="fast" onClick={this.fast.bind(this)} className="active">Fast</button>
        </div>

        <h2>Generation: {this.state.generation}</h2>

        <Board
          size={this.state.boardSize}
          className={this.state.boardClass}
          data={this.state.data}
          toggleCellData={this.toggleCellData.bind(this)} />
      </div>
    );
  }
}

if (!Array.prototype.clone) {
  Array.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this));
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));