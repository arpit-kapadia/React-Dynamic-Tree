import React from 'react';
import PropTypes from 'prop-types';

import Li from './list-element.jsx';


class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: this.props.collection,
      node: this.props.node || '0',
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      collection: props.collection,
      node: props.node || '0',
    });
  }

  navigate = (id) => {
    this.context.router.history.push(`/${id}`);
  }

  createTree = (index = '0', collection = this.state.collection) => {
    let html = [];
    let data = collection;
    let level = [];

    data = data.filter((item, i) => {
      if (item.parent == index) {
        level.push(item);
        return false;
      }

      return true;
    });

    level.forEach((item, i) => {
      let key = 'title = ' + item.title + '-' + i + item._id;

      html.push(
        <Li
          key={`${item.title} ${item._id} ${i}`}
          toggleExpansion={this.toggleExpansion}
          item={item}
          specialKeyPressed={this.specialKeyPressed}
          createTree={this.createTree}
          data={data}
        />
      )
    })


    return (
      <ul style={{listStyle: 'none'}}> {html} </ul>
    );
  }


  specialKeyPressed = (e, item) => {
    if (e.keyCode == 13) { //ENTER
      console.log('e ===>', e);
      console.log('e ===>', e.currentTarget);
      this.props.addNewItem(item.parent, item._id);
      e.preventDefault();
    }

    else if (e.keyCode == 9) { //TAB
      console.log('e ===>', e);
      console.log('e ===>', e.currentTarget);
      this.props.addNewItem(item._id, item._id);
      e.preventDefault();
    }
  }

  toggleExpansion = (title) => {
    let { collection } = this.state;

    collection = collection.map(item => {
      if (item.title == title) {
        item.expanded = !item.expanded;
      }
      return item;
    });

    this.setState({collection});
  }

  findTreeTitle = (node, data, title) => {
    let newTitle = (
      <span>
        <b onClick={() => this.navigate('')} style={{color: '#415158'}}> Home </b>
        >>
        <b> {title} </b>
      </span>
    );

    if (node == '0') return newTitle;

    let name;
    data.forEach(item => {
      if (item._id == node) {
        name = item;
      }
    });

    newTitle = (
      <span>
        <b onClick={() => this.navigate(name._id)} style={{color: '#415158'}}> {name.title} </b>
        >>
        <b> {title} </b>
      </span>
    );

    return this.findTreeTitle(name.parent, data, newTitle);      
  }

  render() {
    let content = this.createTree(this.state.node);
    let TreeName = this.findTreeTitle(this.props.node, this.props.collection, '');

    return (
      <div
        style={{
          padding: '10px',
          margin: '10px',
          color: '#414141',
        }}
      >
        <h3> {TreeName} </h3>
        {content}
      </div>
    );
  }
}

Tree.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Tree;
