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
      fontSize: '28px',
      fontWeight: '600',
      color: 'rgba(0,0,0,0.17)'
    };
    let linkStyle = {
      height: '20px',
      width: '20px',
      padding: '2px',
      borderRadius: '50%',
      marginRight: '8px',
      color: '#414141',
      background: '#414141',
      border: '6px solid #DDDDDD'
    }
    let { item } = this.props;
    let key = 'title = ' + item.title + '-' + item._id;

    if (this.state.buttonHover) {
      buttonStyle.color = '#313131'
    }

    if (this.state.linkHover) {
      linkStyle.border = '6px solid #BEBEBE';
    }

    else if (item.expanded) {
      linkStyle.border = '6px solid white';
    }

    return (
      <div
        className={'row container-fluid'}
        key={key}
        style={{
          minHeight: '35px',
          paddingRight: '30px',
          marginLeft: '30px',
          minWidth: '400px!important'
        }}
      >
        <div className={''} style={{display: 'inline-block'}}>
          <button
            onClick={() => this.props.toggleExpansion(item.title)}                       
            style={buttonStyle}
            onMouseEnter={() => this.toggleHover('buttonHover')}
            onMouseLeave={() => this.toggleHover('buttonHover')}
          >
            { item.expanded ? '-' : '+' }
          </button>
        </div>

        <div className={''} style={{display: 'inline-block', paddingBottom: '0px!important', paddingBottom: '3px', paddingLeft: '2px', marginRight: '2px'}}>
          <button
            onClick={() => this.navigate(item._id)}
            style={linkStyle}
            onMouseEnter={() => this.toggleHover('linkHover')}
            onMouseLeave={() => this.toggleHover('linkHover')}
          >
          </button>
        </div>

        <div
          id={`id-${item._id}`}
          tabIndex={this.props.tabIndex}
          className={'title-div'}
          style={{display: 'inline-block', paddingTop: '3px', minWidth: '300px', minHeight: '100%',}}
          key={item.title + item._id + item._id}
          contentEditable={true}
          suppressContentEditableWarning
          onKeyDown={(e) => this.props.specialKeyPressed(e, item)}
          onKeyUp={() => this.props.specialKeyReleased()}
          onBlur={(e) => this.props.modifyTitle(e, item)}
        >
          { item.title }
        </div>

        <div>
          { item.expanded ? this.props.createTree(item._id, this.props.data) : '' }
        </div>
      </div>
    );
  }

}

Li.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Li;