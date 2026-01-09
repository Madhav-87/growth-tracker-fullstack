import { useEffect, useState } from 'react';
import axios from 'axios';
import addTask from '../../../assets/images/addTask.svg';
import { toast, ToastContainer } from 'react-toastify';
import ResWarningBox from '../../../components/common/ResWarningBox.jsx';
import '../../../styles/Panel.css';
import '../../../styles/Response.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drawer from '../../../components/common/Drawer.jsx';
import Footer from '../../../components/layout/Footer.jsx';
import Header from '../../../components/layout/Header.jsx';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/common/Loader.jsx';
export default function DailyResponse() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  let [loader,setLoader]=useState(true);
  // State for storing questions from backend
  const [aiGenQues, setAIGenQues] = useState([]);

  // State to track current question index for each main goal
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState([]);

  // State to store user's answers for each goal
  const [userAnswers, setUserAnswers] = useState([]);

  // State for marks calculation
  const [totalMarks, setTotalMarks] = useState(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);

  // State for submit status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch goals and questions from backend
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/Monthly/Response`, {
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        const questions = res.data.aiGenQues;
        setAIGenQues(questions|| []);
        setLoader(false);
        // Initialize arrays based on number of goals
        setCurrentQuestionIndex(new Array(questions.length).fill(0));
        setUserAnswers(new Array(questions.length).fill(null).map(() => []));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load goals");
      });
  }, []);

  // Calculate total marks whenever userAnswers changes
  useEffect(() => {
    calculateTotalMarks();
  }, [userAnswers]);

  // Function to calculate total marks
  const calculateTotalMarks = () => {
    let totalMarksEarned = 0;
    let totalAnswered = 0;

    // Loop through each main goal
    userAnswers.forEach((goalAnswers) => {
      // Loop through each sub-question answer
      goalAnswers.forEach((answer) => {
        if (answer) {
          totalAnswered++;
          // Only add marks if answer is correct (Yes)
          if (answer.isCorrect) {
            totalMarksEarned += answer.marks;
          }
        }
      });
    });

    // Round to avoid floating point errors (e.g., 2.1999999)
    const roundedMarks = Math.round(totalMarksEarned * 100) / 100;

    setTotalMarks(roundedMarks);
    setTotalQuestionsAnswered(totalAnswered);
  };

 // Replace your existing prepareSubmissionData function with this updated version:

const prepareSubmissionData = () => {
  const detailedResults = [];

  // Loop through each main goal
  aiGenQues.forEach((goal, goalIndex) => {
    const goalAnswers = userAnswers[goalIndex] || [];
    const subQuestionsResults = [];
    let goalMarksEarned = 0;
    let yesCount = 0;
    let feedbackText = ''; // Store feedback text

    // Loop through each sub-question
    goal.subQuestionSet.forEach((subQ, subQIndex) => {
      const answer = goalAnswers[subQIndex];

      if (answer) {
        const questionMarks = answer.marks || 0;
        goalMarksEarned += questionMarks;

        // Count "Yes" answers (excluding last feedback question)
        if (subQIndex < 4 && answer.isCorrect) {
          yesCount++;
        }

        // Capture feedback text from the last question (index 4)
        if (subQIndex === goal.subQuestionSet.length - 1) {
          feedbackText = answer.answer || '';
        }

        subQuestionsResults.push({
          question: subQ.question,
          answer: answer.answer,
          marks: questionMarks,
          isCorrect: answer.isCorrect
        });
      }
    });

    // Round to avoid floating point errors
    const roundedGoalMarks = Math.round(goalMarksEarned * 100) / 100;

    // Goal is completed if at least 50% questions answered "Yes" (2 out of 4)
    const isGoalCompleted = yesCount >= 2;

    detailedResults.push({
      MainQuestion: goal.MainQuestion,
      subQuestions: subQuestionsResults,
      totalMarks: roundedGoalMarks,
      yesCount: yesCount,
      isGoalCompleted: isGoalCompleted,
      feedback: feedbackText // Include user's feedback for this goal
    });
  });

  return detailedResults;
};
  // Function to handle answer selection (Yes/No)
  const handleAnswerSelection = (goalIndex, answer) => {
    const currentSubQuestionIndex = currentQuestionIndex[goalIndex];
    const isCorrect = answer === 'Yes';

    // Create a copy of userAnswers
    const updatedAnswers = [...userAnswers];

    // Store the answer for this specific sub-question
    updatedAnswers[goalIndex][currentSubQuestionIndex] = {
      questionIndex: currentSubQuestionIndex,
      answer: answer,
      isCorrect: isCorrect,
      marks: isCorrect ? 0.25 : 0  // 0.25 marks per question (4 questions = 1 mark)
    };

    setUserAnswers(updatedAnswers);
  };

  // Function to handle text answer (for question 5)
  const handleTextAnswer = (goalIndex, text) => {
    const currentSubQuestionIndex = currentQuestionIndex[goalIndex];

    // Create a copy of userAnswers
    const updatedAnswers = [...userAnswers];

    // Feedback question doesn't give marks, only counts as answered
    updatedAnswers[goalIndex][currentSubQuestionIndex] = {
      questionIndex: currentSubQuestionIndex,
      answer: text,
      isCorrect: false,  // Feedback doesn't count for marks
      marks: 0  // No marks for feedback, only for Yes answers
    };

    setUserAnswers(updatedAnswers);
  };

  // Function to mark goal as not completed (skip all questions)
  const markGoalAsNotCompleted = (goalIndex) => {
    const updatedAnswers = [...userAnswers];
    const totalSubQuestions = aiGenQues[goalIndex]?.subQuestionSet?.length || 0;

    // Fill all questions with "No" answers
    updatedAnswers[goalIndex] = [];
    for (let i = 0; i < totalSubQuestions; i++) {
      updatedAnswers[goalIndex][i] = {
        questionIndex: i,
        answer: i < totalSubQuestions - 1 ? 'No' : 'Not completed',
        isCorrect: false,
        marks: 0
      };
    }

    setUserAnswers(updatedAnswers);

    // Move to last question to show it's completed
    const updated = [...currentQuestionIndex];
    updated[goalIndex] = totalSubQuestions - 1;
    setCurrentQuestionIndex(updated);

    toast.info("Goal marked as not completed");
  };

  // Function to go to next question
  const goToNextQuestion = (goalIndex) => {
    const maxQuestions = aiGenQues[goalIndex]?.subQuestionSet?.length || 0;

    if (currentQuestionIndex[goalIndex] < maxQuestions - 1) {
      const updated = [...currentQuestionIndex];
      updated[goalIndex] = updated[goalIndex] + 1;
      setCurrentQuestionIndex(updated);
    }
  };

  // Function to go to previous question
  const goToPreviousQuestion = (goalIndex) => {
    if (currentQuestionIndex[goalIndex] > 0) {
      const updated = [...currentQuestionIndex];
      updated[goalIndex] = updated[goalIndex] - 1;
      setCurrentQuestionIndex(updated);
    }
  };
  
  // Function to get user's answer for current question
  const getCurrentAnswer = (goalIndex) => {
    const currentSubQuestionIndex = currentQuestionIndex[goalIndex];
    if (userAnswers[goalIndex] && userAnswers[goalIndex][currentSubQuestionIndex]) {
      return userAnswers[goalIndex][currentSubQuestionIndex].answer;
    }
    return null;
  };

  // Function to check if goal is already marked as not completed
  const isGoalMarkedAsNotCompleted = (goalIndex) => {
    const goalAnswers = userAnswers[goalIndex] || [];
    const totalSubQuestions = aiGenQues[goalIndex]?.subQuestionSet?.length || 0;

    // Check if all answers are filled and all are "No" or not completed
    if (goalAnswers.length < totalSubQuestions) return false;

    let allNo = true;
    for (let i = 0; i < totalSubQuestions - 1; i++) {
      if (goalAnswers[i] && goalAnswers[i].answer !== 'No') {
        allNo = false;
        break;
      }
    }

    return allNo;
  };

  // Function to calculate total questions
  const getTotalQuestions = () => {
    let total = 0;
    aiGenQues.forEach(goal => {
      total += goal.subQuestionSet?.length || 0;
    });
    return total;
  };

  // Submit response
  const submitResponse = (event) => {
    event.preventDefault();

    const totalQuestions = getTotalQuestions();

    // Check if all questions are answered
    if (totalQuestionsAnswered < totalQuestions) {
      toast.error("Please answer all questions before submitting!");
      return;
    }

    // Check if already submitted
    axios.get(`${process.env.REACT_APP_API_URL}/Monthly/Response/Score/Check`, {
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.data.data === 'Duplicate') {
          toast.error("Response already submitted!");
        } else {
          // Prepare detailed data for submission
          const detailedResults = prepareSubmissionData();

          const submissionData = {
            Marks: totalMarks,
            Total: totalQuestionsAnswered,
            details: detailedResults
          };

          console.log('Submitting data:', submissionData);

          // Submit to backend
          axios.post(`${process.env.REACT_APP_API_URL}/Monthly/Response/Score`, submissionData, {
            headers: {
              authorization: `Bearer ${token}`,
              'content-type': 'application/json'
            }
          })
            .then((res) => {
              if(res.data.message==="Done"){
                setIsSubmitted(true);
              toast.success("Response Submitted Successfully!");
              setTimeout(() => {
                navigate('/home');
              }, 3000);
              }
              if(res.data.message==="Fail"){
                toast.error("Something broken..!");
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Failed to submit response");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error checking submission status");
      });
  };

  // Calculate how many goals are completed (for display purposes)
  const getCompletedGoalsCount = () => {
    let completedCount = 0;

    // Loop through each goal
    aiGenQues.forEach((goal, goalIndex) => {
      const goalAnswers = userAnswers[goalIndex] || [];
      let yesCount = 0;

      // Count how many "Yes" answers in first 4 questions (excluding feedback)
      for (let i = 0; i < Math.min(4, goalAnswers.length); i++) {
        if (goalAnswers[i] && goalAnswers[i].isCorrect) {
          yesCount++;
        }
      }

      // Goal is completed if user answered "Yes" to at least 50% of questions (2 out of 4)
      // This is more fair because questions might not match exactly what user did
      if (yesCount >= 2) {
        completedCount++;
      }
    });

    return completedCount;
  };

  // CHANGED: Calculate score percentage based on total marks earned (marks-based scoring)
  const getScorePercentage = () => {
    const maxPossibleMarks = aiGenQues.length * 1; // Each goal worth 1 mark (4 questions × 0.25)
    return maxPossibleMarks > 0 ? ((totalMarks / maxPossibleMarks) * 100).toFixed(1) : 0;
  };

  // Calculate completion percentage (questions answered)
  const getCompletionPercentage = () => {
    const total = getTotalQuestions();
    return total > 0 ? ((totalQuestionsAnswered / total) * 100).toFixed(1) : 0;
  };

  return (
    <div>
      <Drawer />
      {
        loader
        ?
        <Loader/>
        :
        null
      }
      <ResWarningBox identity={"Month"} />
      <ToastContainer />
      <div className='response-page-body'>
        <Header title={'Monthly Response'} />
        <main>
          <div className="section-header mt-0">
            <div className='fs-2 h1'>
              Monthly Response Section
            </div>
            <div className='small-txt'>
              Review your goals and your progress for month
            </div>
          </div>

          {/* Status Panel */}
          <div className='status-panel'>
            <div className='status-bar'>
              <div className='small-txt'>Total Goals</div>
              <div className='status-value'>{aiGenQues.length}</div>
            </div>
            <div className='status-bar'>
              <div className='small-txt'>Complete</div>
              <div className='status-value text-success'>{getCompletedGoalsCount()}</div>
            </div>
            <div className='status-bar'>
              <div className='small-txt'>Responded</div>
              <div className='status-value' style={{ color: "purple" }}>
                {totalQuestionsAnswered}/{getTotalQuestions()}
              </div>
            </div>
            {/* CHANGED: Now uses getScorePercentage() for marks-based scoring instead of completed goals count */}
            <div className='status-bar'>
              <div className='small-txt'>Total Score</div>
              <div className='status-value' style={{ color: "purple" }}>
                {getScorePercentage()}%
              </div>
            </div>
          </div>

          {/* Response Progress */}
          <div className='section-header'>
            <div className='coustome-width'>
              <div className='status-bar mobile-width'>
                <div className='small-txt mt-2'>Response Progress</div>
                <div className='w-100 mt-3'>
                  <div className="progress" role="progressbar">
                    <div className="progress-bar" style={{ width: `${getCompletionPercentage()}%` }}></div>
                  </div>
                  <div className='d-horizontal mt-1'>
                    <div className='me-1'>{getTotalQuestions() - totalQuestionsAnswered}</div>
                    <div>question(s) remaining</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Goals Section */}
          {aiGenQues.length === 0 ? (
            <div className="DailyGoalMess">
              <img src={addTask} className='h-75' alt="No goals" />
              <span>Monthly goals not submitted yet</span>
            </div>
          ) : (
            <>
              {aiGenQues.map((goal, goalIndex) => {
                const currentSubQ = currentQuestionIndex[goalIndex];
                const subQuestion = goal.subQuestionSet?.[currentSubQ];
                const currentAnswer = getCurrentAnswer(goalIndex);
                const totalSubQuestions = goal.subQuestionSet?.length || 0;

                return (
                  <div key={goalIndex}>
                    {/* Main Goal */}
                    <div className='main-Goal-section'>
                      <div className='main-Goal-info-part'>
                        <div className='main-Goal-number'>{goalIndex + 1}</div>
                        <div className='main-Goal-txt-section'>
                          <div>Current Goal</div>
                          <div><h4>{goal.MainQuestion}</h4></div>
                        </div>
                      </div>
                      <div className='progressBar-section'>
                        <div className='mb-1'>
                          Question {currentSubQ + 1} of {totalSubQuestions}
                        </div>
                        <div className="progress" style={{ backgroundColor: "#C2C0EE" }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: `${((currentSubQ + 1) / totalSubQuestions) * 100}%`,
                              backgroundColor: "white"
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Question Section */}
                    <div className='question-section'>
                      <div className='questions-box'>
                        <div className='question-circle'>{currentSubQ + 1}</div>
                        <div className='question'>{subQuestion?.question || 'Loading...'}</div>
                      </div>


                      <div className='question-option-panel'>
                        {/* Last question is text area, others are Yes/No */}
                        {currentSubQ < totalSubQuestions - 1 ? (
                          <>
                            {/* Yes Option */}
                            <div
                              onClick={() => handleAnswerSelection(goalIndex, 'Yes')}
                              className={`radio-questions ${currentAnswer === 'Yes' ? 'greenCheck' : ''}`}
                            >
                              <input
                                type="radio"
                                checked={currentAnswer === 'Yes'}
                                onChange={() => handleAnswerSelection(goalIndex, 'Yes')}
                              />
                              <div className='option-ans'>Yes</div>
                            </div>

                            {/* No Option */}
                            <div
                              onClick={() => handleAnswerSelection(goalIndex, 'No')}
                              className={`radio-questions ${currentAnswer === 'No' ? 'redCheck' : ''}`}
                            >
                              <input
                                type="radio"
                                checked={currentAnswer === 'No'}
                                onChange={() => handleAnswerSelection(goalIndex, 'No')}
                              />
                              <div className='option-ans'>No</div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className='navigation-button-section'>
                              <div className='prev-btn'>
                                <button onClick={() => goToPreviousQuestion(goalIndex)}>
                                  <div className="material-symbols-outlined">arrow_back</div>
                                  <div className='txt-nav'>Previous</div>
                                </button>
                              </div>
                              {/* CHANGED: Moved "I Didn't Complete This Goal" button above options for better visibility */}
                              {!isGoalMarkedAsNotCompleted(goalIndex) && (
                                <div className='skip-goal-section'>
                                  <button
                                    onClick={() => markGoalAsNotCompleted(goalIndex)}
                                    className='skip-goal-button'
                                  >
                                    <span className="material-symbols-outlined">close</span>
                                    I Didn't Complete This Goal
                                  </button>
                                </div>
                              )}

                              <div className='nxt-btn'>
                                <button onClick={() => goToNextQuestion(goalIndex)}>
                                  <div className='txt-nav'>Next</div>
                                  <div className="material-symbols-outlined">arrow_forward</div>
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Text Area for last question */}
                            <textarea
                              value={currentAnswer || ''}
                              onChange={(e) => handleTextAnswer(goalIndex, e.target.value)}
                              placeholder="Enter your reflection here..."
                              rows="4"
                              className='feedback-textarea'
                            />

                            {/* CHANGED: Removed "Next" button on last question, added "Finish Goal" button instead */}
                            <div className='navigation-button-section'>
                              <div className='prev-btn'>
                                <button onClick={() => goToPreviousQuestion(goalIndex)}>
                                  <div className="material-symbols-outlined">arrow_back</div>
                                  <div className='txt-nav'>Previous</div>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* Submit Button Section */}
          <div className='d-vertical mt-5'>
            <div>
              <button
                onClick={submitResponse}
                disabled={isSubmitted}
                className={`d-horizontal ${totalQuestionsAnswered === getTotalQuestions() ? 'submited' : 'submit-btn'}`}
              >
                <span className="me-2 material-symbols-outlined">trending_up</span>
                {isSubmitted ? "Submitted" : "Submit Response"}
              </button>
            </div>

            {totalQuestionsAnswered !== getTotalQuestions() && (
              <div className='d-horizontal text-danger mt-4'>
                <span className="me-2 border border-danger circle alert-txt material-symbols-outlined">
                  priority_high
                </span>
                <span>Please respond to all questions before submitting</span>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}