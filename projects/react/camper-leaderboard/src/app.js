/*
 * @author: Farahmand Moslemi
*/
import React from 'react';
import ReactDOM from 'react-dom';

class DataTableBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    const rows = [];

    for (var i = 0; i < data.length; i++) {
      rows.push(
        <tr key={i + 1}>
          <td>{i + 1}</td>
          <td><a href={"https://freecodecamp.org/" + data[i].username} title={data[i].username} target="_blank"><img src={data[i].img} alt={data[i].username} /> {data[i].username}</a></td>
          <td>{data[i].recent}</td><td>{data[i].alltime}</td>
        </tr>
      );
    }

    return <tbody>{rows}</tbody>;
  }
}

class DataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table className="table table-striped table-bordered">
        <thead className="thead-inverse ">
          <tr>
            <th rowSpan={2}>#</th>
            <th rowSpan={2}>Camper</th>
            <th colSpan={2}>Points</th>
          </tr>
          <tr>
          <th id="recent" className={"clickable " + this.props.recentClassName} onClick={this.props.setData}>In Past 30 Days</th>
          <th id="alltime" className={"clickable " + this.props.alltimeClassName} onClick={this.props.setData}>All Time</th>
          </tr>
        </thead>
        <DataTableBody data={this.props.data} />
      </table>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {data: [], recentClassName: 'active', alltimeClassName: ''}

    this.setData = this.setData.bind(this)
  }

  setData(e) {
    var data = [], id = e.target.id;
    if(id === 'recent') {
      data = this.recentData;
      this.setState({recentClassName: 'active', alltimeClassName: ''});
    } else if(id === 'alltime') {
      data = this.alltimeData;
      this.setState({recentClassName: '', alltimeClassName: 'active'});
    }

    this.setState({data: data});
  }

  componentWillMount() {
    var $this = this;

    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent', {
      method: 'get'
    }).then(res => res.json()).then(data => {
      $this.recentData = data;
      $this.setState({data: data});
    }).catch(function(err) {
      alert(err);
    });

    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', {
      method: 'get'
    }).then(res => res.json()).then(data => {
      $this.alltimeData = data;
    }).catch(function(err) {
      alert(err);
    });
  }
  render() {
    return (
        <DataTable
          data={this.state.data}
          setData={this.setData}
          recentClassName={this.state.recentClassName}
          alltimeClassName={this.state.alltimeClassName} />
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
