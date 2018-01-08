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
      subDivHeight: 0,
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
      // width: '30px',
      // height: '30px',
      // paddingBottom: '2px',
      fontSize: '16px',
      fontWeight: '600',
      color: 'rgba(0,0,0,0.17)'
    };
    let linkStyle = {
      // height: '20px',
      // width: '20px',
      padding: '2px',
      borderRadius: '50%',
      // marginRight: '8px',
      color: '#414141',
      fontSize: '16px',
      background: '#414141',
      border: '6px solid #DDDDDD'
    }
    let { item } = this.props;
    let key = `key-${item._id}`;

    if (this.state.buttonHover) {
      buttonStyle.color = '#313131'
    }

    if (this.state.linkHover) {
      linkStyle.border = '6px solid #BEBEBE';
    }

    else if (item.expanded) {
      linkStyle.border = '6px solid white';
    }

    const subDivId = `id-sublist-${item._id}`;
    const subDivElement = document.getElementById(subDivId);
    let subDivHeight = (subDivElement && subDivElement.clientHeight) || 0;
    if (subDivHeight) subDivHeight -= 10;

    return (
      <div
        key={key}
        id={key}
        style={{
          // minHeight: '30px',
          // paddingRight: '30px',
          // marginLeft: '30px',
          // padding: '1px',
          background: 'rgba(0,0,0,0.08)'
          // minWidth: '400px!important'
        }}
      >
        <div className={'inline-block'} style={{verticalAlign: 'top', textAlign: 'right', height: '100%', background: 'rgba(225,220,100,0.8)'}}>
          <div
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
              background: 'rgba(255,0,0,0.1)',
              // margin: '0 auto',
              // paddingBottom: '2px',
              // paddingLeft: '1px',
            }}
          >
            <button
              onClick={() => this.props.toggleExpansion(item.title)}                       
              style={buttonStyle}
              onMouseEnter={() => this.toggleHover('buttonHover')}
              onMouseLeave={() => this.toggleHover('buttonHover')}
            >
              { item.expanded ? '-' : '+' }
            </button>
          </div>

          <div
            style={{
              display: 'inline-block',
              background: 'rgba(0,255,0,0.1)',
              height: '100%',
              textAlign: 'center',
              // paddingBottom: '0px!important',
              // paddingBottom: '3px',
              // paddingLeft: '2px',
            }}
          >
            <div>
              <button
                onClick={() => this.navigate(item._id)}
                style={linkStyle}
                onMouseEnter={() => this.toggleHover('linkHover')}
                onMouseLeave={() => this.toggleHover('linkHover')}
              >
              </button>
            </div>
            <div className={'outer'} style={{height: subDivHeight}}>
              <div className={'inner'}></div>
            </div>
            { /*
              item.expanded
              ? <div className={'outer'} style={{height: subDivHeight}}>
                  <div className={'inner'}></div>
                </div>
              : ''
            */}
          </div>
        </div>

        <div className={'inline-block'} style={{textAlign: 'left'}}>
          <div
            id={`id-${item._id}`}
            tabIndex={this.props.tabIndex}
            className={'title-div'}
            style={{
              background: 'rgba(0,0,255,0.1)',
              minWidth: '300px',
              // minHeight: '30px'
              height: 'auto',
            }}
            key={item.title + item._id + item._id}
            contentEditable={true}
            suppressContentEditableWarning
            onKeyDown={(e) => this.props.specialKeyPressed(e, item)}
            onKeyUp={() => this.props.specialKeyReleased()}
            onBlur={(e) => this.props.modifyTitle(e, item)}
          >
            { item.title }
          </div>

          <div id={subDivId}>
            { item.expanded ? this.props.createTree(item._id, this.props.data) : '' }
          </div>
        </div>
      </div>
    );
  }

}

Li.contextTypes = {
  router: PropTypes.object.isRequired
}

export default Li;