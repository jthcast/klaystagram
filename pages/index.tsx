import { useSelector } from 'react-redux'
import Layout from "../components/atoms/Layout";
import Auth from '../components/organisms/Auth'
import Feed from '../components/organisms/Feed'
import { RootState } from '../redux/modules'

export default function Home(){
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Layout>
      {/* {isLoggedIn && <Nav />} */}
      {isLoggedIn ? <Feed /> : <Auth />}
    </Layout>
  )
}