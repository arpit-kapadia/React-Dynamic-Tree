import React, { Component } from 'react';
import ReactDOM from 'react-dom'; 

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

  addNewItem = (data, keyPressed, context) => {
    // console.log('textcontent ===>', ReactDOM.findDOMNode(context).textContent);

    let currentPosition = window.getSelection().anchorOffset;
    let { parent, _id, title } = data;
    let { collection } = this.state;
    let newItemId = `${this.state.collection.length + 1}`;
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