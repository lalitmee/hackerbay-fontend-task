import React, { Component } from 'react';
import './App.css';

let items = [];
let noOfMoves;
let marioJump;
const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;

class Cell extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
  }
  render() {
    return (
      <div
        className={this.state.selected ? 'cell active' : 'cell'}
        id={this.props.id}
      />
    );
  }
}

function checkFinish() {
  let check = document.getElementsByClassName('active');
  if (check.length === 0) {
    let gameComplete = window.confirm(
      'You saved princess in moves: ' + noOfMoves
    );
    if (gameComplete === true) {
      window.location.reload();
    }
  }
}

class Box extends Component {
  constructor(props) {
    super(props);
    let c = [];
    for (let i = 1; i <= this.props.matrix; i++) {
      c.push(<Cell key={i} id={i} cells={c} />);
      items.push(i);
    }
    this.state = {
      cells: c
    };
  }
  render() {
    return <div> {this.state.cells} </div>;
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function movement(event) {
  if (event.keyCode === LEFT) {
    let mario = document.getElementsByClassName('mario');
    let marioId = mario[0].id;
    let move = document.getElementById(marioId - 1);
    if (move != null) {
      if (move.classList.contains('active')) {
        move.classList.toggle('active');
      }
      move.innerHTML = document.getElementById(marioId).innerHTML;
      document.getElementById(marioId).innerHTML = '';
      document.getElementById(marioId).classList.toggle('mario');
      move.classList.toggle('mario');
      marioId = marioId - 1;
    } else {
      noOfMoves = noOfMoves - 1;
    }
  }

  if (event.keyCode === RIGHT) {
    let mario = document.getElementsByClassName('mario');
    let marioId = mario[0].id;
    let moveRight = parseInt(marioId, 10) + 1;
    let move = document.getElementById(moveRight);
    if (move != null) {
      if (move.classList.contains('active')) {
        move.classList.toggle('active');
      }
      move.innerHTML = document.getElementById(marioId).innerHTML;

      document.getElementById(marioId).innerHTML = '';
      document.getElementById(marioId).classList.toggle('mario');
      move.classList.toggle('mario');
      marioId = marioId + 1;
    } else {
      noOfMoves = noOfMoves - 1;
    }
  }

  if (event.keyCode === UP) {
    let mario = document.getElementsByClassName('mario');
    let marioId = mario[0].id;
    let moveUp = parseInt(marioId, 10) - parseInt(marioJump, 10);
    let move = document.getElementById(moveUp);
    if (move != null) {
      if (move.classList.contains('active')) {
        move.classList.toggle('active');
      }
      move.innerHTML = document.getElementById(marioId).innerHTML;
      document.getElementById(marioId).innerHTML = '';
      document.getElementById(marioId).classList.toggle('mario');
      move.classList.toggle('mario');
      marioId = marioId - marioJump;
    } else {
      noOfMoves = noOfMoves - 1;
    }
  }

  if (event.keyCode === DOWN) {
    let mario = document.getElementsByClassName('mario');
    let marioId = mario[0].id;
    let moveUp = parseInt(marioId, 10) + parseInt(marioJump, 10);
    let move = document.getElementById(moveUp);
    if (move != null) {
      if (move.classList.contains('active')) {
        move.classList.toggle('active');
      }
      move.innerHTML = document.getElementById(marioId).innerHTML;
      document.getElementById(marioId).innerHTML = '';
      document.getElementById(marioId).classList.toggle('mario');
      move.classList.toggle('mario');
      marioId = marioId + marioJump;
    } else {
      noOfMoves = noOfMoves - 1;
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    let width = prompt('Enter width of game: ', 'e.g. 10,20,30');
    let height = prompt('Enter height of  game: ', 'e.g. 10,20,30');
    if (
      height == null ||
      width == null ||
      isNaN(width) === true ||
      isNaN(height) === true
    ) {
      height = 10;
      width = 10;
    }
    let matrixSize = height * width;
    marioJump = width;
    this.state = {
      matrixSize: matrixSize,
      width: width,
      height: height
    };
  }
  componentDidMount() {
    window.addEventListener(
      'load',
      this.handleLoad(this.state.width, this.state.height)
    );
  }

  handleLoad(width, height) {
    let matrix = document.getElementById('root');
    matrix.style.height = 40 * height + 'px';
    matrix.style.width = 40 * width + 'px';
    let shuffledData = shuffleArray(items);
    let truncatedData = shuffledData.slice(
      0,
      parseInt(this.state.matrixSize / 3, 10)
    );

    for (let i = 0; i < truncatedData.length; i++) {
      let elemPosition = document.getElementById(truncatedData[i]);
      elemPosition.innerHTML =
        "<img src='maria-mushroom.png' alt='mario' class='maze-image'/>";
      elemPosition.classList.toggle('active');
    }

    let uniqueData = shuffledData.filter(function(obj) {
      return truncatedData.indexOf(obj) === -1;
    });
    let item = uniqueData[Math.floor(Math.random() * uniqueData.length)];
    let marioPosition = document.getElementById(item);
    marioPosition.classList.toggle('mario');
    marioPosition.innerHTML =
      "<img src='mario.png' alt='mario' class='maze-image'/>";
  }

  onKeyPress(event) {
    if (
      event.keyCode === LEFT ||
      event.keyCode === UP ||
      event.keyCode === RIGHT ||
      event.keyCode === DOWN
    ) {
      if (noOfMoves === undefined) {
        noOfMoves = 0;
      }
      noOfMoves = noOfMoves + 1;
    }
    movement(event);
    checkFinish();
  }

  componentWillMount() {
    document.addEventListener('keydown', this.onKeyPress);
  }
  render() {
    return (
      <div className="App">
        <Box matrix={this.state.matrixSize} />
      </div>
    );
  }
}

export default App;
