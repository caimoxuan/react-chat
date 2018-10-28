export const Login = function() {
    let api = '/login';
    return {
        type: 'AJAX',
        payload: true,
        url: api,
    };
};
