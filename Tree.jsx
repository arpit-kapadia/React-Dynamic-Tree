import React from 'react';
import PropTypes from 'prop-types';

import Li from './list-element.jsx';


class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: this.props.collection,
      node: this.props.node || '0',
      shiftKeyActive: false
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
          tabIndex={i+100}
          key={`${item.title} ${item._id} ${i}`}
          toggleExpansion={this.toggleExpansion}
          item={item}
          specialKeyPressed={this.specialKeyPressed}
          specialKeyReleased={this.specialKeyReleased}
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

    collection = collection.map(item => {
      if (item._id == data._id) item.title = e.target.innerText;
      return item;
    });

    this.props.setCollection(collection);
  }

  specialKeyReleased = () => this.setState({shiftKeyActive: false});

  specialKeyPressed = (e, item) => {
    if (e.keyCode == 16) this.setState({shiftKeyActive: true}); // SHIFT

    if (e.keyCode == 13) { // ENTER
      this.props.addNewItem(item, 13);
      e.preventDefault();
    }

    else if (e.keyCode == 9) { // TAB
      if (this.state.shiftKeyActive) {
        console.log('[shift + tab] is pressed');
        return;
      }

      let {collection} = this.props;
      let newParent = item.parent;

      collection = collection.map(element => {
        if (element._id == item.parent) {
          let itemIndex = element.children.indexOf(item._id);
          if (itemIndex > 0) {
            newParent = element.children[itemIndex-1];
            element.children.splice(itemIndex, 1);
          }
        }
        return element;
      });

      collection = collection.map(element => {
        if (element._id == item._id) {
          element.parent = newParent;
        }

        if (element._id == newParent) {
          element.expanded = true;
          if (element.children.length) element.children.push(item._id);
          else element.children = [item._id];
        }
        return element;
      });

      this.props.setCollection(collection);
      e.preventDefault();
    }

    else if (e.keyCode == 8) {  // BACKSPACE
      if (window.getSelection().anchorOffset == 0) {
        let { collection } = this.props;
        let doNothing = false;
        let trivialElement = false;

        collection = collection.map(element => {
          if (element._id == item.parent) {
            const itemIndex = element.children.indexOf(item._id);
            console.log('itemIndex = ', itemIndex)
            
            if (itemIndex <= 0) doNothing = true;
            // if (element.children[itemIndex - 1].children.length != 0) doNothing = true;

            collection.forEach(obj => {
              if (obj._id == element.children[itemIndex - 1]) {
                if (obj.children.length != 0) doNothing = true;
              }
            });

            if (!doNothing) {
              
              trivialElement = element.children[itemIndex - 1];
              element.children.splice(itemIndex, 1);
            }
          }
          return element;
        });

        if (doNothing) {
          console.log('Nothing can be done!');
          
          return;
        };

        collection = collection.filter(element => {
          if (element._id == item._id) return false;
          return true;
        });

        collection = collection.map(element => {
          if (element._id == trivialElement) {
            
            element.children = item.children;
            element.title = element.title + item.title;
          }
          return element;
        });

        if (item.children.length != 0) {
          collection = collection.map(element => {
            let isElementChild = item.children.indexOf(element._id);
            if (isElementChild >= -1) {
              element.parent = trivialElement;
              item.children.splice(isElementChild, 1);
            };
            return element;
          });
        }

        this.props.setCollection(collection);
        e.preventDefault();
      }
    }

    console.log('key code = ', e.keyCode)
  }

  toggleExpansion = (title) => {
    let { collection } = this.state;

    collection = collection.map(item => {
      if (item.title == title) {
        item.expanded = !item.expanded;
      }
      return item;
    });

    this.props.setCollection(collection);
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
