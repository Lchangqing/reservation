/* eslint-disable radix */
import { getReByName, getSuitsById, getMenusById } from '../services/restaurant';
export default {

  namespace: 'searchRePage',

  state: {
    searchRes: [],
    searchWords: '',
    layout: null,
    menus: []
  },

  effects: {
    *getRestaurant(action, { call, put }) {
      try {
        const { searchWords } = action.payload;
        const result = yield call(getReByName, { where: { name: searchWords } });
        yield put({ type: 'save', payload: { searchRes: result, searchWords } });
      } catch (error) {
        console.log('報錯', error);
      }
      // if(result.code === 0){
      //   const {searchRes} = result
      //   console.log('searchRes',searchRes);
      //   yield put({type:'save',payload:{searchWords,searchRes}})
      // }
    },
    *getLayout(action, { call, put }) {
      try {
        const { id } = action.payload;
        let layout = yield call(getSuitsById, { id });
        layout.stables = layout.stables ? layout.stables.split(',').map(i => parseInt(i)) : [];
        layout.mtables = layout.mtables ? layout.mtables.split(',').map(i => parseInt(i)) : [];
        layout.ltables = layout.ltables ? layout.ltables.split(',').map(i => parseInt(i)) : [];
        layout.smoking = layout.smoking ? layout.smoking.split(',').map(i => parseInt(i)) : [];
        layout.no_smoking = layout.no_smoking ? layout.no_smoking.split(',').map(i => parseInt(i)) : [];
        layout.window = layout.window ? layout.window.split(',').map(i => parseInt(i)) : [];
        layout.no_window = layout.no_window ? layout.no_window.split(',').map(i => parseInt(i)) : [];
        layout.noon = layout.noon ? layout.noon.split(',').map(i => parseInt(i)) : [];
        layout.night = layout.night ? layout.night.split(',').map(i => parseInt(i)) : [];
        yield put({ type: 'save', payload: { layout } });
      } catch (error) {
        console.log('getSuits報錯', error);
      }
    },
    *getMenus(action, { call, put }) {
      try {
        const { id } = action.payload;
        let menus = yield call(getMenusById, { id });
        yield put({ type: 'save', payload: { menus } });
      } catch (error) {
        console.log('getSuits報錯', error);
      }
    }
  },

  reducers: {
    save(state, action) {
      const a = { ...state, ...action.payload };
      console.log('...state, ...action.payload', state, action.payload)
      return a;
    },
  },

};
