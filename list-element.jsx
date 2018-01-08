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
      lineHover: false,
      subDivHeight: 0,
    }
    this.checkingInterval = (elementId) => {
      setInterval(() => this.checkHeightUpdate(elementId), 10)
    };
  }

  checkHeightUpdate = (elementId) => {
    const element = document.getElementById(elementId);
    let subDivHeight = (element && element.clientHeight) || 0;

    if (subDivHeight != this.state.subDivHeight) {
      this.setState({subDivHeight});
    }
  }

  toggleHover = (element) => {
    this.setState({[element]: !this.state[element]});
  }

  navigate = (id) => {
    this.context.router.history.push(`/${id}`);
  }

  componentWillMount() {
    let { item } = this.props;
    const subDivId = `id-sublist-${item._id}`;
    const mainKey = `key-${item._id}`;

    this.checkingInterval(subDivId);

    this.setState({
      mainKey,
      subDivId,
    })
  }

  render() {
    let buttonStyle = {
      borderRadius: '50%',
      background: 'rgba(0,0,0,0)',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      color: 'rgba(0,0,0,0.17)'
    };
    let linkStyle = {
      padding: '3px',
      borderRadius: '50%',
      color: '#414141',
      fontSize: '16px',
      background: '#414141',
      border: '6px solid #DDDDDD'
    }
    let addNewStyle = {
      display: 'none',
      borderRAdius: '15px',
      minHeight: '15px',
      minWidth: '15px',
      top: '-17px!important',
      background: 'black',
    };

    let { item } = this.props;    
    const {subDivHeight, subDivId, mainKey} = this.state;

    if (this.state.buttonHover) {
      buttonStyle.color = '#313131';
    }

    if (this.state.lineHover) {
      addNewStyle.display = 'block';
    }

    if (this.state.linkHover) {
      linkStyle.border = '6px solid #BEBEBE';
    } else if (item.expanded) {
      linkStyle.border = '6px solid white';
    }


    return (
      <div
        key={mainKey}
        id={mainKey}
        style={{
          background: 'rgba(0,0,0,0.08)'
        }}
      >
        <div
          className={'inline-block'}
          style={{
            verticalAlign: 'top',
            textAlign: 'right',
            padding: '0px!important',
            background: 'rgba(25,80,150,0.2)'
          }}
        >
          <div
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
              background: 'rgba(0,0,255,0.1)',
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
              background: 'rgba(255,0,100,0.1)',
              textAlign: 'center',
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
            <div
              className={'outer'}
              style={{height: subDivHeight}}
              onMouseEnter={() => this.toggleHover('lineHover')}
              onMouseLeave={() => this.toggleHover('lineHover')}
            >
              <div className={'inner'}></div>
            </div>
            <div>
              <button
                onClick={() => this.navigate(item._id)}
                style={addNewStyle}
                onMouseEnter={() => this.setState({lineHover: true})}
                onMouseLeave={() => this.setState({lineHover: false})}
              >
              </button>
            </div>
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
              height: '100%',
              paddingLeft: '10px',
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

          <div id={subDivId} style={{minHeight: 0,}}>
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