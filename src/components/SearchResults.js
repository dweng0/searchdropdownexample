import React from 'react';
import { connect } from 'react-redux';

import content from '../locale/translationsource';
class SearchResults extends React.Component {
    state = {
       selectedWord: {}
    }

    componentDidUpdate = (previousProps, prevState, snapshot) => {
        if(this.props.selectedWord && this.props.selectedWord.name)
        {
            this.setState({ selectedWord: this.props.selectedWord});
        }
    }

     renderResults() {
        if(this.state.selectedWord)
        {
            let pluralOrSingularTime = (this.state.selectedWord.timesUsed > 1) ? 'times' : 'time';
            return <div className="header">{content.wordSelected(this.state.selectedWord, pluralOrSingularTime)} </div>
        }
        else
        {
            return <div className="header"></div>
        }

    }

    render(){
        return (
            <div className="ui middle aligned animated list">
                <div className="item">
                    <div className="content">
                    {this.renderResults()}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        selectedWord: state.selectedWord
    };
};

export default connect(mapStateToProps)(SearchResults);