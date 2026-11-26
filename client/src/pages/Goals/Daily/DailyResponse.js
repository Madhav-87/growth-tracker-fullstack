import { useEffect, useState } from 'react';
import axios from 'axios';
import addTask from '../../../assets/images/addTask.svg';
import { toast, ToastContainer } from 'react-toastify';
import '../../../styles/Panel.css';
import '../../../styles/Response.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drawer from '../../../components/common/Drawer.jsx';
import Footer from '../../../components/layout/Footer.jsx';
import Header from '../../../components/layout/Header.jsx';
import Loader from '../../../components/common/Loader.jsx';

export default function DailyResponse() {
  const token = localStorage.getItem('token');
  const [database, setDatabase] = useState([]);
  const [dailyMarks, setDailyMarks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  useEffect(() => {
    let isActive = true;
    axios.get(`${process.env.REACT_APP_API_URL}/send-goals`, {
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (!isActive) return;
        const goals = Array.isArray(res.data.message) ? res.data.message : [];
        setDatabase(goals);
        setDailyMarks(Number(res.data.marks) || 0);
      })
      .catch(() => {
        if (isActive) toast.error('Could not load today’s tasks. Please try again.');
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => { isActive = false; };
  }, [token]);

  async function updateCompletion(task, isComplete) {
    setUpdatingTaskId(task.ID);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/daily-goals/${task.ID}/completion`,
        { isComplete },
        { headers: { authorization: `Bearer ${token}` } }
      );

      setDatabase((current) => current.map((goal) => (
        goal.ID === res.data.task.ID ? res.data.task : goal
      )));
      setDailyMarks(Number(res.data.marks) || 0);
      toast.success(`${isComplete ? 'Complete' : 'Not Complete'} · daily marks: ${res.data.marks}%`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update this task. Please try again.');
    } finally {
      setUpdatingTaskId(null);
    }
  }

  const completedCount = database.filter((goal) => Number(goal.Is_Complete) === 1).length;
  const progress = database.length > 0 ? (completedCount / database.length) * 100 : 0;

  return (
    <div>
      {loading ? <Loader /> : null}
      <Drawer />
      <ToastContainer />
      <div className='response-page-body'>
        <Header title={'Daily Response'} />
        <main>
          <div className="section-header mt-0">
            <div className='fs-2 h1'>Daily Task Completion</div>
            <div className='small-txt'>Mark each goal complete or not complete for today</div>
          </div>

          <div className='status-panel'>
            <div className='status-bar'>
              <div className='small-txt'>Total Goals</div>
              <div className='status-value'>{database.length}</div>
            </div>
            <div className='status-bar'>
              <div className='small-txt'>Completed</div>
              <div className='status-value text-success'>{completedCount}/{database.length}</div>
            </div>
            <div className='status-bar'>
              <div className='small-txt'>Daily Marks</div>
              <div className='status-value' aria-live="polite">{dailyMarks}%</div>
            </div>
          </div>

          <div className='section-header'>
            <div className='coustome-width'>
              <div className='status-bar mobile-width'>
                <div className='small-txt mt-2'>Task Progress</div>
                <div className='w-100 mt-3'>
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Daily tasks completed"
                    aria-valuenow={completedCount}
                    aria-valuemin="0"
                    aria-valuemax={database.length}
                  >
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                  <div className='d-horizontal mt-1'>
                    <div className='me-1'>{database.length - completedCount}</div>
                    <div>task(s) remaining</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading ? null : database.length === 0 ? (
            <div className="DailyGoalMess">
              <img src={addTask} className='h-75' alt="" />
              <span>Today's goals not submitted yet</span>
            </div>
          ) : database.map((goal, index) => {
            const isComplete = Number(goal.Is_Complete) === 1;
            const isUpdating = updatingTaskId === goal.ID;
            return (
              <div className='section-header' key={goal.ID}>
                <div className='Goal-panel panel-width'>
                  <div className='Goal-header-conatiner'>
                    <div className='Goal-number circle'>{index + 1}</div>
                    <div className='Goal-header'>
                      <div>{goal.Goal_text}</div>
                      <div className='manual-task-actions mt-2' role='group' aria-label={`Completion status for ${goal.Goal_text}`}>
                        <button
                          type="button"
                          className={`manual-status-button manual-status-button--complete${isComplete ? ' is-selected' : ''}`}
                          aria-label={`Complete ${goal.Goal_text}`}
                          aria-pressed={isComplete}
                          disabled={updatingTaskId !== null}
                          onClick={() => updateCompletion(goal, true)}
                        >
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" />
                            <path d="m8 12 2.5 2.5L16.5 9" />
                          </svg>
                          {isUpdating ? 'Saving…' : 'Complete'}
                        </button>
                        <button
                          type="button"
                          className={`manual-status-button manual-status-button--incomplete${!isComplete ? ' is-selected' : ''}`}
                          aria-label={`Not Complete ${goal.Goal_text}`}
                          aria-pressed={!isComplete}
                          disabled={updatingTaskId !== null}
                          onClick={() => updateCompletion(goal, false)}
                        >
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" />
                            <path d="m9 9 6 6m0-6-6 6" />
                          </svg>
                          Not Complete
                        </button>
                      </div>
                      <div className='small-txt mt-1'>
                        Task marks: {isComplete ? 100 : 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
        <Footer />
      </div>
    </div>
  );
}
