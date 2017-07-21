import React, { Component } from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'react.com',
        author: 'React Reactington',
        num_comments: 6,
        points: 2,
        objectId: 0,
    },
    {
        title: 'Redux',
        url: 'reactredsux.com',
        author: 'Suzie Reduxly',
        num_comments: 88,
        points: 12,
        objectId: 1,
    }
];

function isSearched (searchTerm) {
    return item => !searchTerm || item.title.toLowerCase().includes( searchTerm.toLowerCase());
}

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            list,
            searchTerm: '',
        };

        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onDismiss(id) {
        const isNotId = item => item.objectId !== id;
        const updatedList = this.state.list.filter(isNotId);
        this.setState({ list: updatedList})
        }
    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value});
    }


  render() {
        const {searchTerm, list} = this.state;
    return (
      <div className="App">
          <Search
              value={searchTerm}
              onChange={this.onSearchChange}
          >
              Search
          </Search>
          <Table
              list={list}
              pattern={searchTerm}
              onDismiss={this.onDismiss}
          />
      </div>
    );
  }
}

class Search extends Component {
    render() {
        const { value, onChange, children} = this.props;
        return (
            <form>
                {children}
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </form>
        );
    }
}

class Table extends Component {
    render () {
        const {list, pattern, onDismiss} = this.props;
        return (
            <div>
                { list.filter(isSearched(pattern)).map( item =>
                    <div key={item.objectId}>
                        <span>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments} comments</span>
                        <span>{item.points} points</span>
                        <span>
                            <Button onClick={() => onDismiss(item.objectId)}>
                                Delete
                            </Button>
                        </span>
                    </div>
                )}
            </div>
        )
    }
}

class Button extends Component {
    render () {
        const {
            onClick,
            className = '',
            children
        } = this.props;

        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
                >
                {children}
            </button>
        )
    }
}
export default App;
