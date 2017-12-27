import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import Tree from './Tree.jsx';

class App extends Component {
  constructor() {
    super();

    this.state = {
      collection: [
        {
          _id: '1',
          title: 'first',
          expanded: true,
          children: ['2', '3'],
          parent: '0',
        },
        {
          _id: '2',
          title: 'first\'s first child',
          expanded: true,
          children: [],
          parent: '1',
        },
        {
          _id: '3',
          title: 'first\'s second child',
          expanded: true,
          children: ['4'],
          parent: '1',
        },
        {
          _id: '4',
          title: 'first\'s second child\'s first child',
          expanded: true,
          children: [],
          parent: '3',
        },
        {
          _id: '5',
          title: 'second',
          expanded: true,
          children: [],
          parent: '0',
        },
      ]
    }
  }

  addNewItem = (parent, child) => {
    let { collection } = this.state;
    let _id = `${this.state.collection.length + 1}`;
    let newItem = {
      _id,
      parent: parent,
      children: [],
      title: `new child of ${parent} - element#${_id}`,
    };

    collection = collection.map(item => {
      if (item._id == parent) {
        item.children.splice(item.children.indexOf(child), 0, _id);
        item.children.join();
      }
      
      return item;
    })

    collection.push(newItem);
    this.setState({collection});
  }

  createTree = (_id) => {
    return (
      <Tree
        addNewItem={this.addNewItem}
        collection={this.state.collection}
        node={_id}
      />
    );
  }

  processRoutes = (data) => {
    return data.map(item => {
      return (
        <Route
          exact path={`/${item._id}`}
          render={() => this.createTree(item._id)}
        />
      )
    });
  }

  render() {
    return (
      <Switch>
        <Route
          exact path='/'
          render={() => this.createTree('0')}
        />
        {this.processRoutes(this.state.collection)}
      </Switch>
    );
  }
}

export default App;