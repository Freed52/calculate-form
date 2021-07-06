import { combineReducers } from 'redux'

const initialFieldState = {
  result: [],
  init: []
}

const formReducer = (state = initialFieldState, { type, payload }) => {
  switch (type) {
    case 'SET-PRICE':
      return {
        ...state,
        result: !state.result.length ? [...state.result, { [payload.field]: payload.value }]
          : state.result.map((f) => {
            if (f['total']) {
              let result = f['total'] / payload.value
              return { ['quantity']: result }
            }
            if (f['quantity']) {
              let result = f['quantity'] * payload.value
              return { ['total']: result }
            }
          })
      }
    case 'SET-QUANTITY':
      return {
        ...state,
        result: !state.result.length ? [...state.result, { [payload.field]: payload.value }]
          : state.result.map((f) => {
            if (f['total']) {
              let result = f['total'] / payload.value
              return { ['price']: result }
            }
            if (f['price']) {
              let result = payload.value * f['price']
              return { ['total']: result }
            }
          })
      }
    case 'SET-TOTAL':
      return {
        ...state,
        result: !state.result.length ? [...state.result, { [payload.field]: payload.value }]
          : state.result.map((f) => {
            if (f['price']) {
              let result = payload.value / f['price']
              return { ['quantity']: result }
            }
            if (f['quantity']) {
              let result = payload.value / f['quantity']
              return { ['price']: result }
            }
            return f
          })
      }
    case 'INIT-DATA':
      return {
        ...state,
        init: payload
      }
    case 'RESET':
      return {
        ...state,
        result: []
      }
    default:
      return state
  }
}

const initiData = {
  arr: [
    { name: 'Цена', field: 'price', value: '0' },
    { name: 'Количество', field: 'quantity', value: '0' },
    { name: 'Сумма', field: 'total', value: '0' }
  ]
}

const initDataReducer = (state = initiData, { type, payload }) => {
  switch (type) {
    case 'INIT-DATA':
      return {
        ...state
      }
    default:
      return state
  }
}

// COMBINED REDUCERS
const reducers = {
  init: initDataReducer,
  form: formReducer
}

export default combineReducers(reducers)
