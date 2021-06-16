import { useSelector } from 'react-redux'
import Layout from "../components/atoms/Layout";
import Auth from '../components/molecules/KlaytnContainer'
import Feed from '../components/organisms/Feed'

export default function Home(){

  return (
    <Layout>
      <Feed />
    </Layout>
  )
}