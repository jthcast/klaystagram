import { useSelector } from 'react-redux'
import Layout from "../components/atoms/Layout";
import Auth from '../components/organisms/Auth'
import Feed from '../components/organisms/Feed'

export default function Home(){

  return (
    <Layout>
      <Feed />
    </Layout>
  )
}