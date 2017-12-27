import React from 'react';
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

  addNewItem = (parent, child) => {
    let _id = `${this.state.collection.length + 1}`;
    let newItem = {
      _id,
      parent: parent,
      children: [],
      title: `new child of ${parent} - element#${_id}`,
    };

    let { collection } = this.state;

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

  render() {
    let content = this.createTree(this.state.node);

    return (
      <div
        style={{
          padding: '10px',
          margin: '10px',
          color: '#414141',
        }}
      >
        <h2><u> {this.state.node} </u></h2>
        {content}
      </div>
    );
  }
}

export default Tree;
