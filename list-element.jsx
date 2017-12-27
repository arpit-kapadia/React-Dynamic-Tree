import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import MakeTree from './App.jsx';

// const Li = (props) => {
//   let { item } = props;
//   let key = 'title = ' + item.title + '-' + item._id;
  
//   return (
//     <li
//       key={key}
//       style={{margin: '5px', padding: '2px'}}
//     >
//       <button
//         onClick={() => props.toggleExpansion(item.title)}
//         style={{
//           borderRadius: '50%',
//           padding: '3px',
//           paddingRight: '10px',
//           background: 'rgba(0,0,0,0)',
//           paddingBottom: '5px !important',
//           width: '25px',
//           height: '25px',
//           fontSize: '14px',
//           fontWeight: 800
//         }}
//       >
//         { item.expanded ? '-' : '+' }
//       </button>

//       <span
//         key={item.title + item._id + item._id}
//         contentEditable={true}
//         onKeyDown={(e) => props.specialKeyPressed(e, item)}
//       >
//         { item.title }
//       </span>

//       <span>
//         { item.expanded ? props.createTree(item._id, props.data) : '' }
//       </span>
//     </li>
//   );
// }

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
    console.log('navigate calledddddddd')
    this.context.router.history.push(`/${id}`);
  }

  render() {
    let buttonStyle = {
      borderRadius: '50%',
      // padding: '3px',
      marginRight: '10px',
      background: 'rgba(0,0,0,0)',
      border: 'none',
      width: '24px',
      height: '24px',
      fontSize: '23px',
      fontWeight: '600',
      color: 'rgba(0,0,0,0.2)'
    };
    let linkStyle = {
      minheight: '15px',
      minWidth: '15px',
      height: '20px',
      width: '15px',
      borderRadius: '50%',
      marginRight: '8px',
      background: '#414141',
      border: '5px solid white'
    }
    let { item } = this.props;
    let key = 'title = ' + item.title + '-' + item._id;

    if (this.state.buttonHover) {
      // buttonStyle.background = 'rgba(0,0,0,0.2)';
      buttonStyle.color = '#313131'
      buttonStyle.fontWeight = '800';
    }

    if (this.state.linkHover) {
      linkStyle.border = '5px solid #CCCCCC';
    }

    return (
      <li
        key={key}
        style={{margin: '5px', padding: '2px'}}
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