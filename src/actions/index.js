export  const updateSearch = (query, isSelected) => {
    return{
        type: 'QUERY_UPDATED',
        payload: {query, isSelected}
    };
};

export  const updateWordArray = (words) => {
    return{
        type: 'WORD_ARRAY_UPDATED',
        payload: words
    };
};