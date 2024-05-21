import { useContext } from "react"
import MainPage from "../../components/MainPage/MainPage"
import SideBar from "../../components/SideBar/SideBar"
import styles from './Home.module.css'
import { SideBarContext } from '../../context/SideBarContext'
import Analytics from "../../components/Analytics/Analytics"
import CreateQuiz from "../../components/CreateQuiz/CreateQuiz"
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
      {
        optionSelected === "CreateQuiz" && <CreateQuiz />
      }
    </div>
  )
}

export default Home