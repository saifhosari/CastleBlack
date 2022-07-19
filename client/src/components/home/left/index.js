import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../../svg";
import { useState } from "react";
import Shortcut from "./Shortcut";
const LeftHome = ({ user }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="left_home scrollbar ">
      <Link to="/profile" className="left_link hover2">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div
          className="left_link hover2"
          onClick={() => {
            setVisible(true);
          }}
        >
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div
            className="left_link hover2"
            onClick={() => {
              setVisible(false);
            }}
          >
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Partners</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
      <Shortcut
          link="https://lumi4god.github.io/game-page-final/"
          img="../../images/lumi-logo.png"
          name="Lumi Games"
        />
        <Shortcut
          link="https://lumi4god.github.io/game-page-final/"
          img="../../images/Naga.png"
          name="Naga Banking"
        />
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">My shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
        <Shortcut
          link="linkedin.com/in/saif-hosari-39853b1b0"
          img="../../images/linkedin.png"
          name="My LinkedIn Account"
        />
        
        <Shortcut
          link="https://www.instagram.com/saifhalab/"
          img="../../images/insta.png"
          name="My Instagram Account"
        />
      </div>
      <div className={`cb_copyright ${visible && "relative_cb_copyright"}`}>
        <Link to="/">Privacy </Link><span>. </span>
        <Link to="/">Terms </Link><span>. </span>
        <Link to="/">Advertising </Link><span>. </span>
        <Link to="/">Ad Choice <i className="ad_choices_icon"></i></Link><span>. </span>
        <Link to="/">Cookies </Link><span>. </span>
        <Link to="/">More </Link><span>. </span> <br/>
        CastleBlack Ⓒ 2022
      </div>
    </div>
  );
};

export default LeftHome;
