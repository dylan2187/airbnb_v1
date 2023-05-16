import { getHomeGoodPriceData, getHomeHighScoreData } from '@/services'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchHomeDataAction = createAsyncThunk(
  'fetchdata',
  function (payload, { dispatch, getState }) {
    //这个函数的第二个参数是一个store对象，对它做解构

    getHomeGoodPriceData().then((res) => {
      dispatch(changeGoodPriceInfoAction(res))
    })
    getHomeHighScoreData().then((res) => {
      dispatch(changeHighScoreInfoAction(res))
    })

    //这样写不是很合理：因为这两个请求是没有先后顺序的，谁先有response就先用谁。async/await的话就两个同步了
    // const goodPrice = await getHomeGoodPrice()
    // const goodScore = await getHomeGoodScore()
    // return { goodPrice, goodScore }
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    currentPage: 1,
    goodPriceInfo: {},
    highScoreInfo: {},
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload
    },
    changeHighScoreInfoAction(state, { payload }) {
      state.highScoreInfo = payload
    },
  },
  extraReducers: {
    // [fetchHomeDataAction.fulfilled](state, { payload }) {
    //   const { goodPrice, goodScore } = payload
    //   state.goodPriceInfo = goodPrice
    //   state.goodScoreInfo = goodScore
    // },
  },
})

export const { changeGoodPriceInfoAction, changeHighScoreInfoAction } =
  homeSlice.actions
export default homeSlice.reducer
