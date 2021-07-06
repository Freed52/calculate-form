import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setValueFormThunk, clearFormThunk } from '../actions'

type Props = {
  input: { name: string, field: string, value: number }
  newValue: number | null
  initData: any
}

const Input = ({ input, initData, newValue }: Props) => {

  const { name, field, value } = input
  const dispatch = useDispatch()

  const [currentValue, setCurrentValue] = useState()

  const onFocusForm = (event: any) => {
    event.preventDefault()
    if (newValue[0]) {
      return dispatch(clearFormThunk())
    }
    if (currentValue) {
      return setCurrentValue(null)
    }
  }

  const onBlurForm = (event: any) => {
    event.preventDefault()
    const { value } = event.target
    if (!!newValue[0]) {
      return dispatch(setValueFormThunk(Number(currentValue), field))
    }
    dispatch(setValueFormThunk(Number(value), field))
  }

  const onChangeForm = (event: any) => {
    event.preventDefault()
    const { value } = event.target
    return setCurrentValue(value)
  }

  useEffect(() => {
    if (newValue[0]) {
      return setCurrentValue(newValue[0])
    }
  }, [newValue[0]])

  useEffect(() => {
    if (initData[0]) {
      return setCurrentValue(initData[0][field])
    }
  }, [initData[0]])

  return (
    <>
      <label htmlFor={`${field}`}>{name}</label>
      <input
        onFocus={(event) => onFocusForm(event)}
        onBlur={(event) => onBlurForm(event)}
        onChange={(event) => onChangeForm(event)}
        id={`${field}`}
        name={`${field}`}
        type='number'
        value={!currentValue ? newValue : currentValue}
        autoComplete='off'
        placeholder={`${value}`} />
    </>
  )
}

export default Input
