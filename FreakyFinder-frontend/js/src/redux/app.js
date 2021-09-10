export const appReducer = (state = [], action) => {
    switch (action.type) {
        case 'CONSOLE_LOG':
            return console.log(action.data);
        default:
            return state;
    }
};

export const reducerTester = (content) => {
    return {
        type: 'CONSOLE_LOG',
        data: content,
    };
};
