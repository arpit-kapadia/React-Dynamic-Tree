import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          title: 'first',
          expanded: true,
          children: [
            {
              title: 'first\'s first child',
              expanded: true,
              children: [],
            },
            {
              title: 'first\'s second child',
              expanded: true,
              children: [
                {
                  title: 'first\'s second child\'s first child',
                  expanded: true,
                  children: [],
                }
              ],
            }
          ]
        },
        {
          title: 'second',
          expanded: true,
          children: [],
        },
      ],

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
    };

  }

  createNodalTree = (arg) => {
    let html = [];
    let data = arg.children;

    data.forEach(item => {
      let childHtml = '';

      if (item.children.length) {
        console.log('item.children.length==0 ===>', item.children);
        childHtml = this.createNodalTree(item);
      }

      html.push(
        <li key={'title = ' + item.title}>
          <h3>{item.title}</h3>
          {
            item.expanded ? childHtml : ''
          }
        </li>
      );
    });

    return <ul>{html}</ul>
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
      let key = 'title = ' + item.title + '-' + i;
      html.push(
        <li key={key} style={{margin: '5px', padding: '2px'}}>
          <button
            onClick={() => this.toggleExpansion(item.title)}
            style={{
              borderRadius: '50%',
              padding: '3px',
              paddingBottom: '5px !important',
              width: '25px',
              height: '25px',
              fontSize: '14px',
              fontWeight: 800
            }}
          >
            {item.expanded ? '-' : '+'}
          </button>
          {item.title}
          {item.expanded ? this.createTree(item._id, data) : ''}
        </li>
      );
    })

    html.push(
      <li key={'add-new-' + index} style={{margin: '5px', padding: '2px'}}>
        <button
          style={{
            padding: '3px',
            fontWeight: 600,
            fontSize: '10px',
            color: '#8181A1'
          }}
          onClick={() => this.addNewItem(index)}
        >
          Add-New
        </button>
      </li>
    )

    return (
      <ul style={{listStyle: 'none'}}> {html} </ul>
    );
  }

  addNewItem = (index) => {
    let _id = `${this.state.collection.length + 1}`;
    let newItem = {
      _id,
      parent: index,
      children: [],
      title: `new child of ${index} - element#${_id}`,
    };

    let { collection } = this.state;
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
    let content = this.createTree();

    return (
      <div style={{color: '#414141'}}>
        <h2><u> Tree View!!! </u></h2>
        {content}
      </div>
    );
  }
}

export default App;