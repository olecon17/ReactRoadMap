import React, {Component} from 'react';
import './App.css';
import Search from './Search';
import Table from './Table';
import Button from './Button';
import Loading from './Loading';
import PropTypes from 'prop-types';

import {
    DEFAULT_QUERY,
    DEFAULT_PAGE,
    DEFAULT_HPP,

    PATH_BASE,
    PATH_SEARCH,
    PARAM_PAGE,
    PARAM_SEARCH,
    PARAM_HPP
} from "../constants/index"

class App extends Component {


    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            isLoading: false,
        };
// bindings
        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    setSearchTopStories(result) {
        const {hits, page} = result;
        const {searchKey, results} = this.state;

        const oldHits = results && results[searchKey] ?
            results[searchKey].hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            },
            isLoading: false
        })
    }

    fetchSearchTopStories(searchTerm, page) {
        this.setState({isLoading: true});
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(e => e);
    }

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm]
    }


    onDismiss(id) {
        const {searchKey, results} = this.state;
        const {hits, page} = results[searchKey];

        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);

        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            }
        })
    }

    onSearchChange(event) {
        this.setState({searchTerm: event.target.value});

    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});

        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
        }

        event.preventDefault();
    }

//  lifecycle methods
    componentDidMount() {
        const {searchTerm} = this.state;
        this.setState({searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }


    render() {
        const {searchTerm, results, searchKey, isLoading} = this.state;
        const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page) || 0;

        const list = (
            results &&
            results[searchKey] &&
            results[searchKey].hits
        ) || [];

        const withLoading = (Component) => (props) =>
            props.isLoading ? <Loading/> : <Button onClick={() =>
                this.fetchSearchTopStories(searchKey, page + 1)}>
                More
            </Button>;
        const ButtonWithLoading = withLoading(Button);

        return (
            <div className="page">

                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>


                    <Table
                        list={list}
                        onDismiss={this.onDismiss}
                    />
                </div>
                <div className="interactions">
                    <ButtonWithLoading
                        isLoading={isLoading}
                        onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
                        More
                    </ButtonWithLoading>
                </div>

            </div>
        );
    }
}

App.PropTypes = {
    results: PropTypes.array,
    searchKey: PropTypes.string,
    searchTerm: PropTypes.string,
};

export default App;


// LEFT OFF ON PAGE 56 OF TUTORIAL