import { useSelector, shallowEqual } from 'react-redux'
import FormModule from '../modules/form-module'
import { MainLayout } from '../components/MainLayout'

const Index = ({ data }) => {

  const initData = useSelector((state) => state.init.arr, shallowEqual)

  return (
    <MainLayout>
      <FormModule initData={initData} data={data} />
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/init`)
  const data = await res.json()

  return {
    props: data
  }
}

export default Index
