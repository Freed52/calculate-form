import * as types from './types'
import { requests } from './lib/api'

export const setValueFormThunk = (value, field) => async (dispatch) => {
  const typeIs = types.SET_FORM_DATA[field]
  await dispatch({ type: typeIs, payload: { value: value, field: field } })
}

export const clearFormThunk = () => async (dispatch) => {
  await dispatch({ type: types.RESET })
}

export const setUserDataThunk = (arr) => async (dispatch) => {
  let userData = { data: arr }
  const response = await requests.sendUserData(userData)
}