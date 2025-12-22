import dog from '../../assets/images/dog.png';
import './Tips.css';
import Drawer from '../../components/common/Drawer.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Header from '../../components/layout/Header.jsx';
function Tips() {
    return (
        <div>
            <Drawer/>
            <Header title={'Tips'}/>
            <main className='main-tips'>
                <div className='img-panel'>
                    <img src={dog} className="img-fluid img" alt="dog img"></img>
                </div>
                <div>
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>Health Tips</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Strong hearts and clear minds <cite title="Source Title">are the bridges across every storm.</cite>
                        </figcaption>
                    </figure>
                </div>
                <div className="accordion " id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                Meditation
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Right Way to Do Meditation:<br></br>
                                <b>1. Select a Clean and Quiet Place:</b>
                                <br></br><i>“In a clean spot, he should set up a stable place that must be personal, neither too high nor too low.”</i>
                                (Gita 6.11)<br></br>
                                <b>2. Sit Steadily and Upright:</b><br></br>
                                <i>“Sitting there, he should hold the body, head, and neck in a straight line, looking steadily at the tip of the nose, without looking elsewhere.”</i>
                                (Gita 6.13)<br></br>
                                <b>3. Be Calm and Fearless:</b><br></br>
                                <i>“Free from fear, with a peaceful mind and firm in the vow of celibacy, he should meditate on Me with his mind controlled and devoted.”</i>
                                (Gita 6.14)<br></br>
                                <b>4. Control Desires and Thoughts:</b><br></br>
                                <i>“A yogi should constantly practice concentration, dwelling alone, self-controlled, free from desires and possessiveness.”</i>
                                (Gita 6.10)<br></br>
                                <b>5. Practice Moderation:</b><br></br>
                                <i>“Yoga is not for one who eats too much or too little, sleeps too much or keeps awake too long.”</i>
                                (Gita 6.16)<br></br>
                                <b>6. Fix the Mind on God (Krishna/Divine):</b><br></br>
                                <i>“With the mind fixed on Me, the yogi reaches peace—This final peace, freedom from suffering, liberation (moksha) exists in Krishna (God). It’s not separate from Him.”</i>
                                (Gita 6.15)
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Drink Water
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>Drinking water is essential for good health because it supports almost every function in the body.</strong><br></br>
                                1.Keeps you hydrated – Maintains body temperature and energy.<br></br>
                                2.Boosts brain function – Improves focus, memory, and mood.<br></br>
                                3.Aids digestion – Prevents constipation and helps nutrient absorption.<br></br>
                                4.Flushes out toxins – Supports kidney function and detoxification.<br></br>
                                5.Helps in weight management – Reduces appetite and increases metabolism.<br></br>
                                6.Lubricates joints – Reduces joint pain and improves mobility.<br></br>
                                <b>Drink at least 6–8 glasses of clean water daily.</b>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Get Enough Sleep
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>Get at least 7 Hours of sleep</strong><br></br>
                                1.Improves Concentration & Memory<br></br>
                                Sleep strengthens your brain’s ability to store and recall what you’ve studied.<br></br>
                                2.Supports Emotional Health<br></br>
                                Lack of sleep can make you irritable, anxious, or depressed.<br></br>
                                Proper rest keeps your mood stable and calm.<br></br>
                                3.Strengthens the Immune System<br></br>
                                Sleep helps your body fight illness.<br></br>
                                4.Supports Growth<br></br>
                                During deep sleep, your body repairs tissues and grows.<br></br>
                                5.Hormone Balance<br></br>
                                Important hormones for growth and metabolism are released at night.
                            </div>
                        </div>
                    </div>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Take Care Of Mental Health
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    1. Share your stress with parents, teachers, or trusted friends.<br></br>
                                    2. Deep breathing, meditation, yoga, or prayer calm your mind. Even 5–10 minutes a day can help you focus better.<br></br>
                                    3. Make a simple timetable to balance study and rest.<br></br>
                                    4. Too much scrolling increases anxiety and comparison.<br></br>
                                    5. Write 3 things you're thankful for daily.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Avoid Too Much Screen Time
                                </button>
                            </h2>
                            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>In today's digital world, students use screens for online classes, studying, entertainment, and social media. But too much screen time can harm both your body and mind.</strong><br></br>
                                    1. No more than 2 hours of recreational screen time per day.<br></br>
                                    2. Study-related screen time should be balanced with breaks
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                    Practice Good Hygiene
                                </button>
                            </h2>
                            <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>Good hygiene means keeping your body, clothing, surroundings, and habits clean to prevent illness and promote well-being. </strong><br></br>
                                    1. Wash your hands with soap and water for at least 20 seconds.<br></br>
                                    2. Cover your mouth and nose with a tissue or elbow when you cough or sneeze.<br></br>
                                    3. Bathe daily (or at least regularly).<br></br>
                                    4. Change socks daily, especially if your feet sweat.<br></br>
                                    5. Keep your study area, school bag, books, and stationery clean.<br></br>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                    Maintain Balance
                                </button>
                            </h2>
                            <div id="collapseSeven" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    1.Eating neither too much nor too little .<br></br>
                                    2.Sleeping enough to rest the body, but not becoming lazy or oversleeping.<br></br>
                                    3.Remaining equanimous in success and failure, joy and sorrow.<br></br>
                                    4.Doing your duty with detachment — without selfish desires or stress over results.<br></br>
                                    5.Neither suppressing nor indulging too much — self-control with awareness.<br></br>
                                    6.Spiritual Practice	Regular, but not forced — consistent devotion and discipline with a peaceful heart.<br></br>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                    Take Walk
                                </button>
                            </h2>
                            <div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <strong>Walking is one of the simplest, safest, and most effective exercises you can do every day</strong> <br></br>
                                    1. Improves Heart Health.<br></br>
                                    2. Boosts Mental Health.<br></br>
                                    3. Helps in Weight Management.<br></br>
                                    4. Strengthens Muscles and Bones.<br></br>
                                    5. Improves Sleep Quality.<br></br>
                                    6. Boosts Immunity.<br></br>
                                    7. Improves Focus and Productivity.<br></br>
                                    8. Increases Mindfulness and Mental Clarity.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                    Reduce over anxiety
                                </button>
                            </h2>
                            <div id="collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    1. Focus on your effort, not overthinking the results.(Krishna says to us.)<br></br>
                                    2. Even in failure if you work hard then do not overthink, just try to do better.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>Study Tips</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Knowledge is a<cite title="Source Title"> key to make better ourself.</cite>
                        </figcaption>
                    </figure>
                </div>
                <div className="accordion" id="Studyaccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                Avoid Distractions
                            </button>
                        </h2>
                        <div id="collapseTen" className="accordion-collapse collapse" data-bs-parent="#Studyaccordion">
                            <div className="accordion-body">
                                <strong>Distractions are the enemy for acquire Knowledge.</strong><br></br>
                                1.Avoid excessive use of mobile, laptop ,etc.<br></br>
                                2.Avoid Uncontrolled Emotional desires.<br></br>
                                3.Try to stay Focus.<br></br>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                                Choose correct desicion
                            </button>
                        </h2>
                        <div id="collapseEleven" className="accordion-collapse collapse" data-bs-parent="#Studyaccordion">
                            <div className="accordion-body">
                                1.Take correct desicion in your life.<br></br>
                                2.Your desicion decide your future.<br></br>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                                Listening Music
                            </button>
                        </h2>
                        <div id="collapseTwelve" className="accordion-collapse collapse" data-bs-parent="#Studyaccordion">
                            <div className="accordion-body">
                                <strong>Listen music but in balance mode avoid excessive Listening.</strong><br></br>
                                1. Improves Focus and Concentration.<br></br>
                                2. Reduces Stress and Anxiety.<br></br>
                                3. Enhances Memory Retention.<br></br>
                                4. Improves Sleep and Rest for Better Learning.<br></br>
                                5. Avoid music while studying.<br></br>
                            </div>
                        </div>


                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
                                    Keep Try
                                </button>
                            </h2>
                            <div id="collapseThirteen" className="accordion-collapse collapse " data-bs-parent="#Studyaccordion">
                                <div className="accordion-body">
                                    <strong>Even in failure or toughest time one thing he/she must remember that one must try at there own level.</strong><br></br>
                                    1.Try to give your 100% each day.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">
                                    Stay Focus
                                </button>
                            </h2>
                            <div id="collapseFourteen" className="accordion-collapse collapse" data-bs-parent="#Studyaccordion">
                                <div className="accordion-body">
                                    1.Avoid things or people which causing distractions.<br></br>
                                    2.Avoid overthinking.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">
                                    Set Priorities
                                </button>
                            </h2>
                            <div id="collapseFifteen" className="accordion-collapse collapse" data-bs-parent="#Studyaccordion">
                                <div className="accordion-body">
                                    1.Decide your daily plan for working.<br></br>
                                    2.Decide your timetable for study.
                                </div>
                            </div>
                        </div>


                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSixteen" aria-expanded="false" aria-controls="collapseSixteen">
                                    Avoid Things
                                </button>
                            </h2>
                            <div id="collapseSixteen" className="accordion-collapse collapse " data-bs-parent="#Studyaccordion">
                                <div className="accordion-body">
                                    1.Avoid excessive consumption of entertainment.<br></br>
                                    2.Avoid excessive sleep.<br></br>
                                    3.Avoid running from fear.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeventeen" aria-expanded="false" aria-controls="collapseSeventeen">
                                    Take Walk
                                </button>
                            </h2>
                            <div id="collapseSeventeen" className="accordion-collapse collapse" data-bs-parent="#Studyaccordion">
                                <div className="accordion-body">
                                    <strong>Benifits of walk:</strong>
                                    1.Help to reduce stress.<br></br>
                                    2.Enhance cardiovascular health.<br></br>
                                    3.Weight Management.<br></br>
                                    4.Improve sleep.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>Habits</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Habits are <cite title="Source Title">double-edge sword.</cite>
                        </figcaption>
                    </figure>
                </div>
                <div className="accordion" id="Habitsaccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNineteen" aria-expanded="false" aria-controls="collapseNineteen">
                                Good Habits
                            </button>
                        </h2>
                        <div id="collapseNineteen" className="accordion-collapse collapse" data-bs-parent="#Habitsaccordion">
                            <div className="accordion-body">
                                <strong>Benifits of good habits: </strong><br></br>
                                1.We complete our aims.<br></br>
                                2.We can freely spend our time when needed.<br></br>
                                3.Gain power for fighting with harsh situation.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwenty" aria-expanded="false" aria-controls="collapseTwenty">
                                Bad Habits
                            </button>
                        </h2>
                        <div id="collapseTwenty" className="accordion-collapse collapse" data-bs-parent="#Habitsaccordion">
                            <div className="accordion-body">
                                <strong>Disadvantage of bad habits: </strong><br></br>
                                1.Life problems increases over the period of time.<br></br>
                                2.Distractions are increases.<br></br>
                                3.Possible that we go away from healthy life.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
           <Footer/>
        </div>
    );
}
export default Tips;