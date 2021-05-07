export const QUOTES_AVAILABLE = 'QUOTES_AVAILABLE';
export const ADD_QUOTE = 'ADD_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';

export const addQuotes = (quotes) => ({
    type: QUOTES_AVAILABLE,
    data: { quotes }
});

export const addQuote = (quote) => ({
    type: ADD_QUOTE,
    data: { quote }
});

export const updateQuote = (quote) => ({
    type: UPDATE_QUOTE,
    data: { quote }
});

export const deleteQuote = (id) => ({
    type: DELETE_QUOTE,
    data: { id }
});