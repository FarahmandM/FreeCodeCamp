/*
 * @author: Farahmand Moslemi
*/
import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
  render() {
    return <h1>Recipe Box - FreeCodeCamp</h1>;
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div id="footer" className="cf">
        <p>&copy; 2017&nbsp;
          <a href="https://www.freecodecamp.com/FarahmandM" title="FCC/~FarahmandM" target="_blank" rel="nofollow">Farahmand Moslemi</a>
          <br />All rights reserved.
        </p>
      </div>
    )
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.doNothing = this.doNothing.bind(this);
  }

  doNothing() {
    return;
  }

  render() {
    return (
      <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby={this.props.modalId + "Label"}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id={this.props.modalId + "Label"}>{this.props.modalTitle}</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipeName">Name</label>
                  <input type="text" className="form-control" id="recipeName" placeholder="Name" value={this.props.recipeName} onChange={this.props.changeName} />
                </div>
                <div className="form-group">
                  <label htmlFor="recipeIngredients">Ingredients</label>
                  <textarea className="form-control" id="recipeIngredients" placeholder="Ingredients" value={this.props.recipeIngredients} onChange={this.props.changeIngredients} />
                </div>
                <input type="hidden" id="recipeIndex" value={this.props.recipeIndex} onChange={this.doNothing} />
                <div className="btn-toolbar">
                  <button type="button" className="btn btn-default" data-dismiss="modal"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={this.props.save}><span className="glyphicon glyphicon-save" aria-hidden="true"></span> Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Recipes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const recipes = this.props.recipes;
    const list = recipes.map((item, index) =>
      <div key={index} className="panel panel-default">
        <div className="panel-heading" role="tab" id={"heading" + index}>
          <h4 className="panel-title">
            <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
              {item.name}
            </a>
          </h4>
        </div>
        <div id={"collapse" + index} className="panel-collapse collapse" role="tabpanel" aria-labelledby={"heading" + index}>
          <div className="panel-body">
            {/*<h2>Ingredients</h2>*/}
          </div>
          <div className="panel-actions btn-toolbar">
          <table className="table table-striped table-bordered">
            <thead>
                <tr><th>Ingredients</th></tr>
              </thead>
              <tbody>
                {item.ingredients.map(function(element, i) {
                  return <tr key={i}><td>{element}</td></tr>;
                })}
              </tbody>

            </table>
            <button className="btn btn-default btn-sm" data-index={index} onClick={this.props.edit.bind(null, index)} data-toggle="modal"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>
            <button className="btn btn-danger btn-sm" data-index={index} onClick={this.props.delete}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete</button>
          </div>
        </div>
      </div>
    );

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <button className="btn btn-primary" id="addBtn" onClick={this.props.add} data-toggle="modal"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add</button>
        </div>
        <div className="panel-group col-md-6 col-md-offset-3" id="accordion" role="tablist" aria-multiselectable="true">
          {list}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {recipes: JSON.parse(localStorage.getItem('__Farahmand_recipes')) ||
      [
        {name: 'Pizza', ingredients: ['Ground Beef', 'Onion', 'Dough', 'Mozzarella Cheese']},
        {name: 'Hamburger', ingredients: ['Ground Beef', 'Salt', 'Onion', 'Blue Cheese', 'Chives']},
        {name: 'Kabob', ingredients: ['Sirloin', 'Pepper', 'Salt']},
      ],
      modalTitle: 'Add New Recipe',
      recipeName: '',
      recipeIngredients: [],
      recipeIndex: -1,
    };

    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);

    this.changeName = this.changeName.bind(this);
    this.changeIngredients = this.changeIngredients.bind(this);
    this.save = this.save.bind(this);
  }

  add() {
    this.setState({
      modalTitle: 'Add New Recipe',
      recipeName: '',
      recipeIngredients: [],
      recipeIndex: -1,
    }, function() {
      jQuery('#recipeModal').modal('show');
    });
  }
  
  edit(index, e) {
    var recipes = this.state.recipes;
    this.setState({
      modalTitle: 'Edit Recipe: ' + recipes[index].name,
      recipeName: recipes[index].name,
      recipeIngredients: recipes[index].ingredients,
      recipeIndex: index,
    }, function() {
      jQuery('#recipeModal').modal('show');
    });
  }

  delete(e) {
    var index = parseInt(e.target.getAttribute('data-index'));
    var recipes = this.state.recipes.slice(0);
    recipes.splice(index, 1);

    localStorage.setItem('__Farahmand_recipes', JSON.stringify(recipes));

    this.setState({
      recipes: recipes
    }, function() {
      jQuery(".panel-collapse").collapse("hide");
    });

  }

  save() {
    var $modal = jQuery('#recipeModal');
    var index = parseInt($modal.find('#recipeIndex').val());
    var name = jQuery.trim($modal.find('#recipeName').val());
    var ingredients = jQuery.trim($modal.find('#recipeIngredients').val()).split(',');
    ingredients = ingredients.filter(function(item) {return item.trim() != '';});

    if(name == '' || ingredients.length == 0) {
      return alert('Recipe name and ingredients should not be empty!');
    }
    
    var recipes = this.state.recipes.slice(0);
    var recipe = {
      name: name,
      ingredients: ingredients
    };

    if(index === -1) {
      recipes.push(recipe);
    } else {
      recipes[index] = recipe;
    }

    localStorage.setItem('__Farahmand_recipes', JSON.stringify(recipes));

    this.setState({recipes: recipes}, function() {
      jQuery('#recipeModal').modal('hide');
    });
  }

  changeName(e) {
    this.setState({
      recipeName:  e.target.value,
    });
  }

  changeIngredients(e) {
    this.setState({
      recipeIngredients: e.target.value
    });
  }

  componentWillMount() {
    jQuery('#recipeModal').modal({show: false});
  }

  render() {
    return (
      <div>
        <Modal modalId="recipeModal"
          modalTitle={this.state.modalTitle}
          recipeName={this.state.recipeName}
          recipeIngredients={this.state.recipeIngredients}
          recipeIndex={this.state.recipeIndex}
          save={this.save}
          changeName={this.changeName}
          changeIngredients={this.changeIngredients} />
        <Header />
        <Recipes recipes={this.state.recipes} add={this.add} edit={this.edit} delete={this.delete}/>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));