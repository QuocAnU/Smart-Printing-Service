const initialState = {
    showHeader: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HIDE_HEADER':
            return { ...state, showHeader: false };
        case 'SHOW_HEADER':
            return { ...state, showHeader: true };
        case 'LOGOUT':
            return { ...state, showHeader: true }; // Đảm bảo rằng showHeader sẽ là true khi người dùng đăng xuất
        default:
            return state;
    }
};
export default reducer;