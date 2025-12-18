import Home from './Home2.js';
import Month from './Month2.js';
import Tips from './Tips.js';
import Daily from './DailyGoals2.js';
import Login from './Login2.js';
import CreateAccount  from './CreateAccount2.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Response from './Response2.js';
import Progress from './Progress.js';
import DailyView from './DailyView.js';
import ChartEx from './ChartEx.js';
import MonthlyView from './MonthlyView.js';
import YearlyView from './YearlyView.js';
import MonthlySetGoals from './MonthlySetGoals2.js';
import MonthResponse from './MonthResponse2.js';
import Year from './Year2.js';
import YearGoals from './YearGoals2.js';
import YearlyRes from './YearlyRes2.js';
import About from './About.js';
import Chatbot from './Chatbot.js';
import ProtectRouters from './Components/ProtectRouters.js';
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
        <Route path='/ChartEx' element={<ProtectRouters element={<ChartEx />}/>}></Route>
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