import { useEffect, useState } from 'react';
import axios from 'axios';
import addTask from '../../../assets/images/addTask.svg';
import { toast, ToastContainer } from 'react-toastify';
import dayjs from 'dayjs';
import * as exifr from "exifr";
import ResWarningBox from '../../../components/common/ResWarningBox.jsx';
import '../../../styles/Panel.css';
import '../../../styles/Response.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drawer from '../../../components/common/Drawer.jsx';
import Footer from '../../../components/layout/Footer.jsx';
import Header from '../../../components/layout/Header.jsx';
import Loader from '../../../components/common/Loader.jsx';
import { useNavigate } from 'react-router-dom';
export default function MonthlyResponse() {
  let token = localStorage.getItem('token');
  let [database, setDatabase] = useState([]);
  let [button, setButton] = useState([]);
  let navigate = useNavigate();
  let [loading, setloading] = useState(false);
  let [count, setCount] = useState({
    TotalImages: 0,
    TotalGoals: 0,
    TodaysCode: 0,
    TotalRes: 0,
    GoalsAndImages: []
  });
  useEffect(
    () => {
      //Task2:--
      axios.get(`${process.env.REACT_APP_API_URL}/Yearly/Response`, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-type': 'application/json'
        }
      })
        .then((res) => {
          let data = res.data.message;
          setDatabase(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    []);

  let [submit, setSubmit] = useState(0);
  let submitForm = (event) => {
    event.preventDefault();
    setloading(true);
    console.log(count);
    axios.get(`${process.env.REACT_APP_API_URL}/Year/Response/Check`, {
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.data.message === 'False') {
          toast.error("Response already submited!");
          setloading(false);
        }

        else {
          axios.post(`${process.env.REACT_APP_API_URL}/Year/Response/Score`, count, {
            headers: {
              authorization: `Bearer ${token}`,
            }
          }).then((res) => {
            setSubmit(++submit);
            if (res.data.message === "done") {
              toast.success("Goal Submited! Marks:" + res.data.marks);
              setloading(false);
              setTimeout(() => {
                navigate('/Year')
              }, 2000);
            }
            if (res.data.message === "Fail") {
              toast.error("Something went wrong!");
              setloading(false);
              setTimeout(() => {
                navigate('/Year')
              }, 2000);
            }
          }).catch((err) => {
            console.log(err);
            setloading(false)

          })
        }

      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }
  async function isTodayImage(file) {
    try {
      const exif = await exifr.parse(file, ["DateTimeOriginal"]);

      if (!exif || !exif.DateTimeOriginal) {
        return false; //  no metadata → reject
      }

      const imageDate = dayjs(exif.DateTimeOriginal).format("YYYY-MM-DD");
      const today = dayjs().format("YYYY-MM-DD");

      return imageDate === today;
    } catch (err) {
      return false;
    }
  }
  function imagetoBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  }
  const date = dayjs().format("YYYY-MM-DD");
  const code = btoa(date).slice(0, 5).toUpperCase();
  const handleValues = async (event, goal) => {
    let image = event.target.files[0];
    const isValid = await isTodayImage(image);
    if (!isValid) {
      toast.error("Please upload a photo taken today.");
      event.target.value = ""; // reset input
      return;
    }
    let imgbase64 = (await imagetoBase64(image)).split(",")[1];
    let oldData = { ...count };
    oldData.TotalImages = ++oldData.TotalImages;
    oldData.TotalGoals = database.length;
    oldData.TodaysCode = code;
    if (oldData.TotalRes < database.length)
      oldData.TotalRes = ++oldData.TotalRes;
    oldData.GoalsAndImages.push({
      Goal: goal,
      Image: imgbase64
    });
    setCount(oldData);
  }


  return (
    <div>
      {
        loading
          ?
          (
            <Loader />
          )
          :
          null
      }
      <Drawer />
      <ResWarningBox identity={"Year"} />
      <ToastContainer />
      <div className='response-page-body'>
        <Header title={'Yearly Response'} />
        <main>
          <div className="section-header mt-0">
            <div className='fs-2 h1'>
              Yearly Response Section
            </div>
            <div className='small-txt'>
              Review your goals and mark your progress for Year
            </div>
          </div>
          <div className='status-panel'>
            <div className='status-bar'>
              <div className='small-txt'>
                Total Goals
              </div>
              <div className='status-value'>
                {database.length}
              </div>
            </div>
            <div className='status-bar'>
              <div className='small-txt'>
                Total Images
              </div>
              <div className='status-value text-success'>
                {count["TotalImages"]}
              </div>
            </div>
            <div className='status-bar'>
              <div className='small-txt'>
                Response
              </div>
              <div className='status-value ' style={{ color: "purple" }}>
                {count["TotalRes"]}
              </div>
            </div>
            <div className='status-bar'>
              <div className='small-txt'>
                Goals Completed
              </div>
              <div className='status-value ' style={{ color: "purple" }}>
                {count["TotalRes"] + "/" + database.length}
              </div>
            </div>
          </div>
          {/* Response Progress */}
          <div className='section-header'>
            <div className='coustome-width'>
              <div className='status-bar mobile-width'>
                <div className='small-txt mt-2'>
                  <span className='w-50'>Response Progress</span>
                </div>
                <div className='w-100 mt-3'>
                  <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{ width: `${(count["TotalRes"] / database.length) * 100}%` }}></div>
                  </div>
                  <div className='d-horizontal mt-1'>
                    <div className='me-1'>
                      {database.length - count["TotalRes"]}
                    </div>
                    <div>
                      goals(s) remaining
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Goals section */}
          {database.length === 0
            ?
            <div className="DailyGoalMess">
              <img src={addTask} className='h-75'></img><span>Goals not submited yet</span>
            </div>
            :
            database.map((value, indexNumber) => {
              return (
                <div className='section-header'>
                  <div className='Goal-panel panel-width'>
                    <div className='Goal-header-conatiner'>
                      <div className='Goal-number circle'>
                        {indexNumber + 1}
                      </div>
                      <div className='Goal-header'>
                        <div>{value.Goal_text}</div>
                        <div className='image-capture'>
                          <input
                            type="file"
                            accept='image/*'
                            capture="environment"
                            onChange={(e) => { handleValues(e, value.Goal_text) }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Submit Button Section */}
          <div className='d-vertical mt-5'>
            <div>
              <button className="d-horizontal submited" onClick={submitForm} ><span className="me-2 material-symbols-outlined">
                trending_up
              </span>
                {submit > 0 ? "Submited" : "Submit Response"}</button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}