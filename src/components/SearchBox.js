import React from 'react';
import { connect } from 'react-redux';

import {  updateSearch } from '../actions';
import SearchListItem from './SearchListItem';

import content from '../locale/translationsource';

class SearchBox extends React.Component {

    state = {
        active: false,
        searchableArray: [],
        filteredList: [],
        placholderText: ""
    }

    constructor(props){
        super(props)
        this.state.searchableArray = props.searchableArray || [];
        this.state.filteredResults = props.searchableArray || [];
    }

    setCssClassByState() {
        let style = "ui fluid search selection dropdown";
        if(this.state.active)
        {
            style += " active visible";
        }
        return style;
    }

    setMenuCssClassByState() {
        let style = "menu";
        if(this.state.active)
        {
            style += " transition visible"
        }
        return style;
    }

    searchClicked = () => {
        this.setState({
            active: true
        });
    }

    onBlur = () => {
        this.setState({
            active: false
        });
    }

    getsearchableArray() {
        if(this.state.filteredResults.length > 0)
        {
             return this.state.filteredResults.map((result, index) => {
                return <SearchListItem key={index} result={result} updateSearch={this.props.updateSearch}/>
            });
        }
        else
        {
            return <div className="item">{content.initialDropDownText}</div>
        }

    }

    componentDidUpdate = (previousProps, prevState, snapshot) => {
        if(this.props.searchableArray.length !== previousProps.searchableArray.length)
        {   
            this.setState({
                searchableArray: this.props.searchableArray,
                filteredResults: this.props.searchableArray,
                placholderText: content.searchPlaceholder
            });
        }

        //apply query if one is found
        if (this.props.query !== previousProps.query) {
            let query = this.props.query.toLowerCase();
            const filteredResults = this.state.searchableArray.filter((word) => {
                return word.name.toLowerCase().includes(query);
            });
            this.setState({filteredResults: filteredResults});
        }
    }

    render() {
        return (
            <div className={this.setCssClassByState()} onClick={this.searchClicked} onBlur={this.onBlur} >
                <i className="dropdown icon"></i>
                <input name="wordQuery" type="hidden" value={this.props.query.name} />
                <input value={this.props.query} className="search" autoComplete="off" name="wordQuery" placeholder={this.state.placholderText} onChange={(event) => {this.props.updateSearch(event.target.value);}}/>
                <div className={this.setMenuCssClassByState()} style={{display: (this.state.active) ? "block!important" : "none"}}>
                    {this.getsearchableArray()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchableArray: state.wordsLoader,
        query: state.searchQuery
    };
};

export default connect(mapStateToProps, {updateSearch})(SearchBox);