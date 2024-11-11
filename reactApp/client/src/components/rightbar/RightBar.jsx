import React from 'react'
import './rightbar.css'
import Cake from '../../assets/birthday-cake.png';
import AD from '../../assets/Ad.jpg'
import { Images } from "../../assets";
const RightBar = () => {
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img src={Cake} alt="" className='birthdayImage'/>
          <span className="birthdayText">
            <b>john Doe</b> and <span>20</span> other friends have a birthday today
          </span>
        </div>
        <img src={AD} alt="" className="rightbarAdvertisement" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className='rightbarFriendList'>
          <li className="rightbarFriend">
            <div className="rightbarImageContainerProfile">
              <img src={Images.p1} alt="" className="rightbarProfileimage" />
              <span className='rightbarOnline'></span>
            </div>
            <span className="rightbarUsername">kamala haris</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarImageContainerProfile">
              <img src={Images.p2} alt="" className="rightbarProfileimage" />
              <span className='rightbarOnline'></span>
            </div>
            <span className="rightbarUsername">Jane Doe</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarImageContainerProfile">
              <img src={Images.p3} alt="" className="rightbarProfileimage" />
              <span className='rightbarOnline'></span>
            </div>
            <span className="rightbarUsername">Joe Biden</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarImageContainerProfile">
              <img src={Images.p6} alt="" className="rightbarProfileimage" />
              <span className='rightbarOnline'></span>
            </div>
            <span className="rightbarUsername">JD vance</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RightBar