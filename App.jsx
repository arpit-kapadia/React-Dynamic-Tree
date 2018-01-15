import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 

import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import Tree from './Tree.jsx';
import uuidv4 from 'uuid/v4';

class App extends Component {
  constructor() {
    super();
    const initial_ids = [
      uuidv4(),
      uuidv4(),
      uuidv4(),
      uuidv4(),
      uuidv4(),
      uuidv4(),
    ];

    this.state = {
      collection: [
        {
          _id: '0',
          title: 'Home',
          expanded: true,
          children: [initial_ids[0], initial_ids[4]],
          parent: '',
        },
        {
          _id: initial_ids[0],
          title: 'first',
          expanded: true,
          children: [initial_ids[1], initial_ids[2]],
          parent: '0',
        },
        {
          _id: initial_ids[1],
          title: 'first\'s first child',
          expanded: true,
          children: [],
          parent: initial_ids[0],
        },
        {
          _id: initial_ids[2],
          title: 'first\'s second child',
          expanded: true,
          children: [initial_ids[3]],
          parent: initial_ids[0],
        },
        {
          _id: initial_ids[3],
          title: 'first\'s second child\'s first child',
          expanded: true,
          children: [],
          parent: initial_ids[2],
        },
        {
          _id: initial_ids[4],
          title: 'second',
          expanded: true,
          children: [],
          parent: '0',
        },
      ]
    }
  }

  addNewItem = (data, keyPressed) => {
    let currentPosition = window.getSelection().anchorOffset;
    let { parent, _id, title } = data;
    let { collection } = this.state;
    let newItemId = uuidv4();
    let newItem = {
      _id: newItemId,
      parent: parent,
      children: [],
      title: `${title.substr(0,currentPosition)}`,
    };

    let childIndex = -1;
    collection = collection.map((item, index) => {
      if (item._id == parent) {
        item.children.splice(item.children.indexOf(_id), 0, newItemId).join();
        if (keyPressed == 9) item.expanded = true;
      }
      
      if (item._id == _id) {
        childIndex = index;
        item.title = title.substr(currentPosition, title.length - currentPosition);
      }

      return item;
    });

    if (childIndex <= -1) return;

    collection.splice(childIndex, 0, newItem).join();
    this.setState({collection});

    $(`#id-${_id}`).attr("tabindex", -1).focus();
  }

  setCollection = (collection) => {
    this.setState({collection});
  }

  createTree = (_id) => {
    return (
      <Tree
        addNewItem={this.addNewItem}
        collection={this.state.collection}
        setCollection={this.setCollection}
        node={_id}
      />
    );
  }

  processRoutes = (data) => {
    return data.map((item, index) => {
      return (
        <Route
          exact path={`/${item._id}`}
          render={() => this.createTree(item._id)}
          key={`${item._id} ${item.parent} ${index}`}
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