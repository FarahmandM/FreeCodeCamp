/*
 * @author: Farahmand Moslemi
*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import Dungeon from 'random-dungeon-generator';
//const { Component } = React; // for codepen
//const exports = {}; // for codepen

// Random Dungeon Generator by Matthew Burfield | npm package: random-dungeon-generator | compressed by yuicompressor
// https://github.com/Matthew-Burfield/random-dungeon-generator
Object.defineProperty(exports, "__esModule", { value: true }); exports.sum = sum; function _toConsumableArray(a) { if (Array.isArray(a)) { for (var c = 0, b = Array(a.length); c < a.length; c++) { b[c] = a[c] } return b } else { return Array.from(a) } } var VERTICAL = "VERTICAL"; var HORIZONTAL = "HORIZONTAL"; function sum(d, c) { return d + c } var randomIndexBetweenValues = function randomIndexBetweenValues(b, a) { return Math.floor(Math.random() * (a - b + 1) + b) }; function randomDirection() { var b = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [VERTICAL, HORIZONTAL]; if (b.length === 0) { return "" } var a = b.length - 1; return b[randomIndexBetweenValues(0, a)] } function AddRoomBoundaries(c) { var b = c.length - 1; var a = c[0].length - 1; return c.map(function (e, d) { return e.map(function (g, f) { if (d === 0 || d === b || f === 0 || f === a) { return 1 } return g }) }) } var setDefaultValues = function setDefaultValues(a) { if (a) { return { width: a.width || 50, height: a.height || 50, minRoomSize: a.minRoomSize || 5, maxRoomSize: a.maxRoomSize || 20 } } return { width: 50, height: 50, minRoomSize: 5, maxRoomSize: 20 } }; var NewDungeon = exports.NewDungeon = function NewDungeon(d) { var k = { init: function m(q, o, p, n) { this.minRoomSize = 5; this.maxRoomSize = 20; this.counter = 1; this.tree = { level: Array.apply(null, { length: o }).map(function () { return Array.apply(null, { length: q }) }) }; this.split(this.tree); this.connectRooms(this.tree) }, split: function h(r) { var s = this; if (r.level.length > this.maxRoomSize || r.level[0].length > this.maxRoomSize) { var p = randomDirection(this.getSplitOptions(r.level.length, r.level[0].length)); var o = this.getIndexToSplit(p, r.level[0].length, r.level.length); var n = r.leftNode = {}; var q = r.rightNode = {}; r.splitDirection = p; r.splitIndex = o; if (p === VERTICAL) { n.level = r.level.map(function (t) { return t.slice(0, o) }); q.level = r.level.map(function (t) { return t.slice(o, t.length) }) } else { n.level = r.level.slice(0, o); q.level = r.level.slice(o, r.level.length) } this.split(n); this.split(q) } else { this.counter += 1; r.level = r.level.map(function (t) { return t.map(function () { return s.counter }) }); r.level = AddRoomBoundaries(r.level) } }, getSplitOptions: function j(p, n) { var o = []; if (p > this.maxRoomSize) { o.push(HORIZONTAL) } if (n > this.maxRoomSize) { o.push(VERTICAL) } return o }, getIndexToSplit: function b(p, o, r) { var q = this.minRoomSize; var n = p === VERTICAL ? o - q : r - q; return randomIndexBetweenValues(q, n) }, connectRooms: function f(t) { if (t.leftNode) { this.connectRooms(t.leftNode) } else { return } if (t.rightNode) { this.connectRooms(t.rightNode) } else { return } var p = t.leftNode.level; var r = t.rightNode.level; if (t.splitDirection === VERTICAL) { var q = randomIndexBetweenValues(1, p.length - 2); t.corridorIndex = q; p[q][p[0].length - 1] = 0; p[q][p[0].length - 2] = 0; r[q][0] = 0; r[q][1] = 0 } else { var s = randomIndexBetweenValues(1, p[0].length - 2); t.corridorIndex = s; p[p.length - 1][s] = 0; p[p.length - 2][s] = 0; r[0][s] = 0; r[1][s] = 0 } t.level = []; if (t.splitDirection === VERTICAL) { t.level = p.reduce(function (w, x, v) { var u = []; u.push.apply(u, _toConsumableArray(p[v])); u.push.apply(u, _toConsumableArray(r[v])); w.push(u); return w }, []) } else { var o, n; (o = t.level).push.apply(o, _toConsumableArray(p)); (n = t.level).push.apply(n, _toConsumableArray(r)) } } }; var c = Object.create(k); var i = setDefaultValues(d), a = i.width, l = i.height, g = i.minRoomSize, e = i.maxRoomSize; c.init(a, l, g, e); return c.tree.level };
const Dungeon = NewDungeon;

class Warrior {
  constructor(type = 'e', level = 0, health = 100) {
    this.type = type;
    this.level = level;
    this.health = health;
  }
  getCoefficient() {
    const level = this.level;
    return (0.1 * level ** 2 + 0.15 * level) * (this.type === 'e' ? 0.35 : 3.5);
  }

  isAlive() {
    return this.health > 0;
  }
}
class Player extends Warrior {
  constructor(type = 'p', level = 0, health = 100, nextLevelXp = 50, weapon = { name: 'stick', power: 1 }) {
    super(type, level, health);
    this.nextLevelXp = nextLevelXp;
    this.weapon = weapon;
  }

  getCoefficient() {
    const level = this.level;
    const weaponPower = this.weapon.power;
    return weaponPower * (0.16 * level ** 2 + 0.15 * level + 1);
  }
}

class Cell extends Component {
  render() {
    let cn;
    switch (this.props.val) {
      case 1:
        cn = 'wall';
        break;
      case 'p':
        cn = 'player';
        break;
      case 'e':
        cn = 'enemy';
        break;
      case 'b':
        cn = 'boss';
        break;
      case 'w':
        cn = 'weapon';
        break;
      case 'h':
        cn = 'healing';
        break;
      case 'd':
        cn = 'dark';
        break;
      default:
        cn = 'floor';
    }
    return (
      <td className={cn}></td>
    )
  }
}

class Scene extends Component {
  render() {
    const { size, data, darkness, playerPosition } = this.props;
    var tds = [];
    var tbody = [];
    var row = 0;
    for (let i = 0, numCells = size.rows * size.cols; i < numCells; i++) {
      let col = i % size.cols;
      let val = data[row][col];
      // if (darkness && (Math.abs(playerPosition.row - row) > 5 || Math.abs(playerPosition.col - col) > 5)) {
      // if (darkness && !(Math.abs(playerPosition.row - row) < 5 && Math.abs(playerPosition.col - col) < 5)) {
      // if (darkness && !((playerPosition.row - row) ** 2 + (playerPosition.col - col) ** 2 < 25)) {
      if (darkness && ((playerPosition.row - row) ** 2 + (playerPosition.col - col) ** 2 > 49)) {
        val = 'd';
      }

      tds.push(<Cell key={i} val={val}></Cell>);
      if ((i + 1) % size.cols === 0) {
        tbody.push(<tr key={row}>{tds}</tr>);
        tds = [];
        row++;
      }
    }

    return (
      <table>
        <tbody>
          {tbody}
        </tbody>
      </table>
    );
  }
}

class DL extends Component {
  render() {

    let elements = [];
    this.props.defs.forEach((item, index) => {
      elements.push(<dt key={`dt${index}`}>{item.dt}</dt>);
      elements.push(<dd key={`dd${index}`}>{item.dd}</dd>);
    });
    return (
      <dl>
        {elements}
      </dl>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
    this.updateByButton = this.updateByButton.bind(this);
    this.newGame = this.newGame.bind(this);
    this.toggleDarkness = this.toggleDarkness.bind(this);
    this.clearMouseDownId = this.clearMouseDownId.bind(this);

    //                      left up right down a   w   d   s   n   t
    this.availableKeyCodes = [37, 38, 39, 40, 65, 87, 68, 83, 78, 84];
    this.mouseDownId = null;
    this.gameOver = false;
    this.defaultMessage = { text: "Kill the boss in dungeon 4!", cn: '' };

    this.minRoomSize = 5;
    this.maxRoomSize = 8;
    this.numEnemies = 8;
    this.numHealings = 8;
    this.healthPower = 20;
    //this.sizes = [{ rows: 30, cols: 50 }, { rows: 60, cols: 100 }, { rows: 90, cols: 150 }, { rows: 120, cols: 200 }];
    //this.sizes = [{ rows: 30, cols: 50 }, { rows: 40, cols: 60 }, { rows: 50, cols: 70 }, { rows: 60, cols: 80 }];
    this.sizes = [{ rows: 26, cols: 36 }, { rows: 30, cols: 40 }, { rows: 40, cols: 50 }, { rows: 50, cols: 60 }];
    this.weapons = [{ name: 'knife', power: 1.25 }, { name: 'dagger', power: 1.5 }, { name: 'sword', power: 1.75 }, { name: 'axe', power: 2 }];

    const player = new Player();

    const dungeon = 1;
    this.state = { size: this.sizes[dungeon - 1], dungeon, darkness: true, player, message: this.defaultMessage };
  }

  componentWillMount() {
    this.generateScene();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.update);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.update);
  }

  newGame() {
    this.gameOver = false;
    const dungeon = 1;
    const size = this.sizes[dungeon - 1]
    const player = new Player();
    const message = this.defaultMessage;
    this.setState({ message });
    this.generateScene(dungeon, size, player);
  }

  generateScene(dungeon = this.state.dungeon, size = this.state.size, player = this.state.player) {
    const { minRoomSize, maxRoomSize } = this;
    const { rows, cols } = size;
    const matrix = new Dungeon({
      width: cols,
      height: rows,
      minRoomSize,
      maxRoomSize
    });

    while (true) {
      const [i, j] = [random(rows - 1, 1), random(cols - 1, 1)];
      if (matrix[i][j] !== 1) {
        player.position = `r${i}c${j}`;
        player.positionObj = { row: i, col: j };
        matrix[i][j] = 'p';
        break;
      }
    }

    while (true) {
      const [i, j] = [random(rows - 1, 1), random(cols - 1, 1)];
      if (matrix[i][j] !== 1 && matrix[i][j] !== 'p' && matrix[i][j] !== 'w') {
        matrix[i][j] = 'w';
        break;
      }
    }

    const enemies = {};
    let enemyCount = 0;
    while (enemyCount !== this.numEnemies) {
      const [i, j] = [random(rows - 1, 1), random(cols - 1, 1)];
      if (matrix[i - 1][j - 1] !== 1 &&
        matrix[i - 1][j] !== 1 &&
        matrix[i - 1][j + 1] !== 1 &&
        matrix[i][j - 1] !== 1 &&
        matrix[i][j] !== 1 &&
        matrix[i][j + 1] !== 1 &&
        matrix[i + 1][j - 1] !== 1 &&
        matrix[i + 1][j] !== 1 &&
        matrix[i + 1][j + 1] !== 1 &&
        matrix[i][j] !== 'p' && matrix[i][j] !== 'w' && matrix[i][j] !== 'e') {
        let pos = `r${i}c${j}`;
        if (enemyCount === this.numEnemies - 1) {
          matrix[i][j] = 'b';
          enemies[pos] = new Warrior('b', dungeon);
        }
        else {
          matrix[i][j] = 'e';
          enemies[pos] = new Warrior('e', dungeon);
        }
        enemyCount++;
      }
    }
    this.enemies = enemies;

    let healings = [];
    while (healings.length !== this.numHealings) {
      const [i, j] = [random(rows - 1, 1), random(cols - 1, 1)];
      if (matrix[i][j] !== 1 && matrix[i][j] !== 'p' && matrix[i][j] !== 'w' && matrix[i][j] !== 'e' && matrix[i][j] !== 'b' && matrix[i][j] !== 'h') {
        healings.push(`r${i}c${j}`);
        matrix[i][j] = 'h';
      }
    }
    healings = null;

    this.setState({ matrix, player, size, dungeon });
  }

  update(e) {
    //if (e.keyCode >= 37 && e.keyCode <= 40) {
    if (this.availableKeyCodes.includes(e.keyCode)) {
      e.preventDefault();
    } else {
      return;
    }
    // return console.log(e.keyCode, e.key);
    switch (e.keyCode) {
      case 37: // left
      case 65: // a, A
        this.move(0, -1); // (i, j) or (row, col)
        break;
      case 38: // up
      case 87: // w, W
        this.move(-1, 0);
        break;
      case 39: // right
      case 68:// d, D
        this.move(0, +1);
        break;
      case 40: // down
      case 83:// s, S
        this.move(+1, 0);
        break;
      case 78: // n
        this.newGame();
        break;
      case 84: // t
        this.toggleDarkness();
        break;
    }
  }

  updateByButton(e) {
    if (this.mouseDownId === null) {
      switch (e.target.id) {
        case 'up': // (i, j) or (row, col)
          this.mouseDownId = setInterval(() => { this.move(-1, 0) }, 50);
          break;
        case 'left':
          this.mouseDownId = setInterval(() => { this.move(0, -1) }, 50);
          break;
        case 'down': // down
          this.mouseDownId = setInterval(() => { this.move(+1, 0) }, 50);
          break;
        case 'right': // right
          this.mouseDownId = setInterval(() => { this.move(0, +1) }, 50);
          break;
      }
    } else {
      this.clearMouseDownId();
    }
  }

  clearMouseDownId() {
    clearInterval(this.mouseDownId);
    this.mouseDownId = null;
  }

  toggleDarkness() {
    this.setState({ darkness: !this.state.darkness });
  }

  move(row, col) {
    if (this.gameOver) return;
    const { matrix, player } = this.state;
    let { dungeon, message } = this.state;
    const { enemies } = this;
    const playerPosition = player.positionObj;
    let [newI, newJ] = [playerPosition.row + row, playerPosition.col + col];
    const newPosition = `r${newI}c${newJ}`;
    let removeCell = true;

    switch (matrix[newI][newJ]) {
      case 1:
        return;
        break;
      case 'e':
      case 'b':
        let enemy = this.enemies[newPosition];
        enemy.health -= ~~(player.getCoefficient() * random(15, 27));
        player.health -= ~~(enemy.getCoefficient() * random(16, 23));

        // console.log(player.type, player.health);
        // console.log(enemy.type, enemy.health);
        if (enemy.isAlive()) {
          removeCell = false;
        } else {
          player.nextLevelXp -= 10 * ~~(player.getCoefficient());
          if (player.nextLevelXp <= 0) {
            player.level++;
            player.nextLevelXp += 50 * ~~(player.getCoefficient() / player.weapon.power);
          }
          if (enemy.type === 'b' && player.isAlive()) {
            if (dungeon === 4) {
              // You win
              message = { text: "You win!", cn: 'success' };
              this.gameOver = true;
            } else {
              dungeon++;
              let size = this.sizes[dungeon - 1];
              this.generateScene(dungeon, size, player);
              return;
            }
          }
        }
        break;
      case 'w':
        player.weapon = this.weapons[dungeon - 1];
        break;
      case 'h':
        player.health += this.healthPower;
        break;
      default:
    }

    //console.log("P Level: ", player.level, "NextXp: ", player.nextLevelXp);
    if (!player.isAlive()) {
      // You lose
      message = { text: "You lose!", cn: 'error' };
      this.gameOver = true;
      removeCell = false;
      player.health = 0;
    }
    if (removeCell) {
      matrix[newI][newJ] = 'p';
      matrix[playerPosition.row][playerPosition.col] = '0';
      player.position = newPosition;
      player.positionObj = { row: newI, col: newJ };
    }

    this.setState({ player, message });
  }

  getPositionFromString(str) {
    let arr = str.split('c');
    return {
      row: parseInt(arr[0].slice(1)),
      col: parseInt(arr[1])
    }
  }

  removeClassName(queryAll) {
    document.querySelectorAll(queryAll).forEach(elem => {
      elem.className = '';
    });
  }


  render() {
    const { size, player, enemies, dungeon } = this.state;
    const defs = [
      { dt: 'Health', dd: player.health },
      { dt: 'Weapon', dd: player.weapon.name },
      { dt: 'Level', dd: player.level },
      { dt: 'Next Level', dd: player.nextLevelXp + ' XP' },
      { dt: 'Dungeon', dd: dungeon },
    ];

    return (
      <div>
        <h2 className={this.state.message.cn}>{this.state.message.text}</h2>
        <button onClick={this.newGame}>(N)ew Game</button>
        <button
          onClick={this.toggleDarkness}
          className={this.state.darkness ? 'active' : ''} >(T)oggle Darkness</button>
        <div className='btn-group'>
          <button onMouseDown={this.updateByButton} onMouseUp={this.clearMouseDownId} id="up">W<br />&#9650;</button>
          <button onMouseDown={this.updateByButton} onMouseUp={this.clearMouseDownId} id="left">A<br />&#9668;</button>
          <button onMouseDown={this.updateByButton} onMouseUp={this.clearMouseDownId} id="down">S<br />&#9660;</button>
          <button onMouseDown={this.updateByButton} onMouseUp={this.clearMouseDownId} id="right">D<br />&#9658;</button>
        </div>
        <DL defs={defs} />
        <Scene
          size={size}
          data={this.state.matrix}
          playerPosition={this.state.player.positionObj}
          darkness={this.state.darkness}
        />
        <table id="help">
          <thead><tr><th>You</th><th>Weapon</th><th>Healing</th><th>Enemy</th><th>Boss</th></tr></thead>
          <tbody><tr><td className="player-color">&#9632;</td><td className="weapon-color">&#9632;</td><td className="healing-color">&#9632;</td><td className="enemy-color">&#9632;</td><td className="boss-color">&#9632;</td></tr></tbody>
        </table>
      </div>
    );
  }
}

if (!Array.prototype.clone) {
  Array.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this));
  }
}

// Random number between min (included) and max (excluded)
const random = (max, min = 0) => ~~(Math.random() * (max - min)) + min;

ReactDOM.render(<App />, document.querySelector('#app'));