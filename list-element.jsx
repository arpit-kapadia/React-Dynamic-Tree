import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import MakeTree from './App.jsx';


class Li extends Component {
  constructor() {
    super();
    this.state = {
      buttonHover: false,
      linkHover: false,
    }
  }

  toggleHover = (element) => {
    this.setState({[element]: !this.state[element]});
  }

  navigate = (id) => {
    this.context.router.history.push(`/${id}`);
  }

  render() {
    let buttonStyle = {
      borderRadius: '50%',
      background: 'rgba(0,0,0,0)',
      border: 'none',
      width: '30px',
      height: '30px',
      padding: '2px',
      fontSize: '23px',
      fontWeight: '600',
      color: 'rgba(0,0,0,0.17)'
    };
    let linkStyle = {
      minheight: '20px',
      minWidth: '20px',
      height: '20px',
      width: '20px',
      padding: '1px',
      marginBottom: '2px',
      borderRadius: '50%',
      marginRight: '8px',
      background: '#414141',
      border: '6px solid white'
    }
    let { item } = this.props;
    let key = 'title = ' + item.title + '-' + item._id;

    if (this.state.buttonHover) {
      buttonStyle.color = '#313131'
      buttonStyle.fontWeight = '800';
    }

    if (this.state.linkHover) {
      linkStyle.border = '6px solid #CCCCCC';
    }

    return (
      <li
        key={key}
      >
        <button
          onClick={() => this.props.toggleExpansion(item.title)}
          style={buttonStyle}
          onMouseEnter={() => this.toggleHover('buttonHover')}
          onMouseLeave={() => this.toggleHover('buttonHover')}
        >
          { item.expanded ? '-' : '+' }
        </button>

        <button
          onClick={() => this.navigate(item._id)}
          style={linkStyle}
          onMouseEnter={() => this.toggleHover('linkHover')}
          onMouseLeave={() => this.toggleHover('linkHover')}
        >
        </button>

        <span
          key={item.title + item._id + item._id}
          contentEditable={true}
          onKeyDown={(e) => this.props.specialKeyPressed(e, item)}
        >
          { item.title }
        </span>

        <span>
          { item.expanded ? this.props.createTree(item._id, this.props.data) : '' }
        </span>
      </li>
    );
  }

}

Li.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Li;