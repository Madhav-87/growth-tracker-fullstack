import Home from './pages/Dashboard/Home2.js';
import Month from './pages/Dashboard/Month2.js';
import Tips from './pages/Tips/Tips.js';
import Daily from './pages/Goals/Daily/DailyGoals2.js';
import Login from './pages/Auth/Login2.js';
import CreateAccount  from './pages/Auth/CreateAccount2.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Response from './pages/Goals/Daily/Response2.js';
import Progress from './pages/Progress/Progress.js';
import DailyView from './pages/Goals/Daily/DailyView.js';
import MonthlyView from './pages/Goals/Monthly/MonthlyView.js';
import YearlyView from './pages/Goals/Yearly/YearlyView.js';
import MonthlySetGoals from './pages/Goals/Monthly/MonthlySetGoals2.js';
import MonthResponse from './pages/Goals/Monthly/MonthResponse2.js';
import Year from './pages/Dashboard/Year2.js';
import YearGoals from './pages/Goals/Yearly/YearGoals2.js';
import YearlyRes from './pages/Goals/Yearly/YearlyRes2.js';
import About from './pages/About/About.js';
import Chatbot from './pages/Chatbot/Chatbot.js';
import ProtectRouters from './components/common/ProtectRouters.js';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/About" element={<ProtectRouters element={<About/>}/>}></Route>
        <Route path="/Year/Response" element={<ProtectRouters element={<YearlyRes />}/>}></Route>
        <Route path="/Year/goals" element={<ProtectRouters element={<YearGoals />}/>}></Route>
        <Route path="/Year" element={<ProtectRouters element={<Year />}/>}></Route>
        <Route path="/Month/Response" element={<ProtectRouters element={<MonthResponse />}/>}></Route>
        <Route path="/Monthly/Goals" element={<ProtectRouters element={<MonthlySetGoals />}/>}></Route>
        <Route path="/YearlyView" element={<ProtectRouters element={<YearlyView />}/>}></Route>
        <Route path="/MonthlyView" element={<ProtectRouters element={<MonthlyView />}/>}></Route>
        <Route path='/response' element={<ProtectRouters element={<Response />}/>}></Route>
        <Route path='/chatbot' element={<ProtectRouters element={<Chatbot />}/>}></Route>
        <Route path='/check-progress' element={<ProtectRouters element={<Progress />}/>}></Route>
        <Route path='/DailyView' element={<ProtectRouters element={<DailyView />}/>}></Route>
        <Route path='/create-account' element={<CreateAccount/>}></Route>
        <Route path='/tips' element={<ProtectRouters element={<Tips />}/>}></Route>
        <Route path="/Month" element={<ProtectRouters element={<Month />}/>}></Route>
        <Route path="/daily-goals" element={<ProtectRouters element={<Daily />}/>}></Route>
        <Route path="/Home" element={<ProtectRouters element={<Home/>}/>}></Route>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;