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
          modifyTitle={this.modifyTitle}
        />
      )
    })


    return (
      <div> {html} </div>
    );
  }

  modifyTitle = (e, data, context) => {
    let { collection } = this.state;

    console.log('data===>', data);
    console.log('e.target.innerText ===>', e.target.innerText);

    collection = collection.map(item => {
      if (item._id == data._id) item.title = e.target.innerText;

      return item;
    });

    this.props.setCollection(collection);
  }

  specialKeyPressed = (e, item, context) => {
    if (e.keyCode == 13) { //ENTER
      this.props.addNewItem(item, 13, context);
      e.preventDefault();
    }

    // else if (e.keyCode == 9) { //TAB
    //   this.props.addNewItem(item._id, item._id, 9, context);
    //   // e.preventDefault();
    // }
  }

  toggleExpansion = (title) => {
    let { collection } = this.state;

    collection = collection.map(item => {
      if (item.title == title) {
        item.expanded = !item.expanded;
      }
      return item;
    });

    this.props.setCollection({collection});
  }

  findTreeTitle = (node, data, title) => {
    let newTitle = (
      <span>
        <b onClick={() => this.navigate('')} style={{color: '#415158', cursor: 'pointer'}}> Home </b>
        <span style={{fontSize: '12px'}}> &nbsp;>>&nbsp; </span>
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
        <b onClick={() => this.navigate(name._id)} style={{color: '#415158', cursor: 'pointer'}}> {name.title} </b>
        <span style={{fontSize: '12px'}}> &nbsp;>>&nbsp; </span>
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
