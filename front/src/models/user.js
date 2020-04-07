import { getUsers, geCtOrderByid } from '../services/user';
export default {
    namespace: 'user',
    state: {
        userinfo: null,
        userOrders: []
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
    effects: {
        *getUsersInfo(action, { call, put }) {
            try {
                const { name, password } = action.payload;
                const result = yield call(getUsers, { name, password });
                if (result.length) {
                    const userinfo = result.shift();
                    yield put({ type: 'save', payload: { userinfo } })
                }
            } catch (error) {
                console.log('getUsersInfo報錯', error);
            }
        },
        *getUserOrders(action, { call, put }) {
            try {
                const { uid } = action.payload;
                const result = yield call(geCtOrderByid, { uid });
                if (result.length) {
                    yield put({ type: 'save', payload: { userOrders: result } })
                }
            } catch (error) {
                console.log('getUsersInfo報錯', error);
            }
        },
    },

}