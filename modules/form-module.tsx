import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import Input from '../components/MyInput'
import { setUserDataThunk } from '../actions'

import styles from '../components/styles/Form.module.css'

type Props = {
  initData: Array<Object>
  data: Array<Object>
}

const FormModule = ({ initData, data }: Props) => {

  const result = useSelector((state: any) => state.form.result, shallowEqual)

  const dispatch = useDispatch()

  const sendData = (event) => {
    event.preventDefault()
    const r = initData.map((a: any) => {
      const { value } = event.target[a.field]
      return { [a.field]: value }
    })
    dispatch(setUserDataThunk(r))
  }

  return (
    <div className={styles.formWrapper}>
      <form
        className={styles.form}
        onSubmit={(forms) => sendData(forms)}>
        {initData ? initData.map((input: any) =>
          <Input
            key={input.name}
            input={input}
            initData={data.filter((item: any) => {
              if (item[input.field]) {
                return Number(item[input.field])
              }
            })}
            newValue={result.map((item: any) => {
              if (!item) {
                return null
              }
              if (item[input.field]) {
                return Number(item[input.field])
              }
              return null
            })} />
        ) : 'Wait'}
        <button type='submit'>Отправить</button>
      </form>
    </div>
  )
}

export default FormModule
