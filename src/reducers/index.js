import { combineReducers } from 'redux';

let wordsArray = [];
let selectedWord = "";
const updateSearchQueryReducer = (query = null, action) => {
    let selection = query || "";
    if(action.type === 'QUERY_UPDATED')
    {
        selection = action.payload.query;

        if(action.payload.isSelected)
        {
            selectedWord = action.payload.query
        }
    }
    return selection;
}

const updateWordArray = (foundWords = null, action) => {
    let selection = foundWords || wordsArray;
    if(action.type === 'WORD_ARRAY_UPDATED')
    {
        selection = action.payload;
    }
    return selection;
}

const selectedWordReducer = () =>{
    return selectedWord;
}

const resultsReducer = () => {
    return wordsArray;
}

export default combineReducers({
    results: resultsReducer,
    searchQuery: updateSearchQueryReducer,
    wordsLoader: updateWordArray,
    selectedWord: selectedWordReducer
})