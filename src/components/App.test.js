import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import {shallow, mount} from 'enzyme';

import App from './App';
import Search from './Search';
import Button from './Button';
import Table from './Table';

describe('App', () => {
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test('snapshots', () => {
    const component = renderer.create(
        <App/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

});

describe('Search', () => {
    it('renders', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Search>Hello</Search>, div);
    });

    test('snapshots', () => {
        const component = renderer.create(
            <Search>Search</Search>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('focus on Search', () => {
        const div = mount(
            <Search>Search</Search>
        );
        expect(div.find('input').node === document.activeElement)

    })

});

describe('Button', () => {
    it('renders', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button>TEST</Button>, div)
    });

    test('snapshots', () => {
        const component = renderer.create(
            <Button >MORE TEST</Button>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()
    })


});

describe('Table', () => {
    const props = {
        list: [
            {title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
            {title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'},
        ]
    };

    it('Shows two items in list', () => {
        const element = shallow(
            <Table {...props} />
        );

        expect(element.find('.table-row').length).toBe(2);
    });


    it('renders', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Table {...props}/>, div);
    });

    test('snapshots', () => {
        const component = renderer.create(
            <Table {...props}/>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot()
    })
});