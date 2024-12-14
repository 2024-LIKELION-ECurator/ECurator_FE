import "./Emotion.css";
import happy from "../../images/stc_happy.png";
import joyful from "../../images/stc_joyful.png";
import loving from "../../images/stc_loving.png";
import nervous from "../../images/stc_nervous.png";
import pensive from "../../images/stc_pensive.png";
import relieved from "../../images/stc_relieved.png";
import sad from "../../images/stc_sad.png";
import surprised from "../../images/stc_surprised.png";
import sleepy from "../../images/stc_sleepy.png";

function Emotion() {
  return (
    <div className="stc">
      <div className="emotion">
        <img src={happy} alt="Happy" />
      </div>
      <div className="emotion">
        <img src={sad} alt="Sad" />
      </div>
      <div className="emotion">
        <img src={surprised} alt="Surprised" />
      </div>
      <div className="emotion">
        <img src={loving} alt="Loving" />
      </div>
      <div className="emotion">
        <img src={sleepy} alt="Sleepy" />
      </div>
      <div className="emotion">
        <img src={nervous} alt="Nervous" />
      </div>
      <div className="emotion">
        <img src={pensive} alt="Pensive" />
      </div>
      <div className="emotion">
        <img src={relieved} alt="Relieved" />
      </div>
      <div className="emotion">
        <img src={joyful} alt="Joyful" />
      </div>
    </div>
  );
}

export default Emotion;
