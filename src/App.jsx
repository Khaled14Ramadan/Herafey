import './App.scss';
import { useSelector } from 'react-redux'
import NavBar from './components/NavBar/index';
import {Routes , Route} from 'react-router-dom';
import Home from './components/Home/index';
import Profile from './components/Profile/index';
import Jobs from './components/Jobs/index';
import Messaging from './components/Messaging/index';
import Notification from './components/Notification/index';
import NotFound from './components/NotFound/index';
import Friends from './components/Friends/index';
import Sidebar from './components/Jobs/users/Sidebar';


function App() {
  const test = useSelector((state) => state.lang.lang)

  return (
    <div className={test === "en" ? "english" : "arabic"}>
      <NavBar/>
      <Sidebar/>
      <Routes>
        <Route path='home'  element={<Home />} />
        <Route path='/'  element={<Home />} />
        <Route path='profile'  element={<Profile />} />
        <Route path='friends'  element={<Friends />} />
        <Route path='jobs'  element={<Jobs />} />
        <Route path='messaging'  element={<Messaging />} />
        <Route path='notification'  element={<Notification />} />
        <Route path='*'  element={<NotFound />} />
        
      </Routes>
    </div>
  );
}

export default App;
