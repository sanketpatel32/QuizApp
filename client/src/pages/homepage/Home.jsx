import { useContext } from "react"

import styles from './Home.module.css'

import MainPage from "../../components/MainPage/MainPage"
import SideBar from "../../components/SideBar/SideBar"
import Analytics from "../../components/Analytics/Analytics"

import { SideBarContext } from '../../context/SideBarContext'

const Home = () => {
  const { optionSelected, setOptionSelected } = useContext(SideBarContext);
  return (
    <div className={styles.container}>
      <SideBar />
      {
        optionSelected === "Dashboard" && <MainPage />
      }
      {
        optionSelected === "Analytics" && <Analytics />
      }
    </div>
  )
}

export default Home