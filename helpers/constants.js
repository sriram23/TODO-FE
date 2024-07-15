export default {
    BASE_URL: 'https://todo-be-1.vercel.app',
    LOGIN: {
        method: 'post',
        path: '/auth/login',
    },
    SIGNUP: {
        method: 'post',
        path: '/auth/signup',
    },
    ADD: {
        method: 'post',
        path: '/add'
    },
    get: {
        method: 'get',
        path: '/get'
    },
    COMPLETE: {
        method: 'put',
        path: '/complete'
    },
    DELETE: {
        method: 'put',
        path: '/delete'
    }
}