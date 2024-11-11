import React from 'react'
import { Images } from '../../assets'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LabelIcon from '@mui/icons-material/Label';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Person from '../../assets/xp.jpg'
import './share.css'
const Share = () => {
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={Person} alt="" className='shareProfilePic' />
          <input type="text" name="" id=""placeholder='hi....' className='shareInput'/>
        </div>
        <hr className='shareHR'/>
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMediaIcon htmlColor= "tomato" className='shareIcon'/>
              <span className='shareOptionText'>Photo/Videos</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor= "golden" className='shareIcon'/>
              <span className='shareOptionText'>Feelings</span>
            </div>
            <div className="shareOption">
              <AddLocationIcon  htmlColor= "green" className='shareIcon'/>
              <span className='shareOptionText'>Location</span>
            </div>
            <div className="shareOption">
              <LabelIcon htmlColor= "blue" className='shareIcon'/>
              <span className='shareOptionText'>Tag</span>
            </div>
          </div>
          <button className='shareButton'>Share</button>
        </div>
      </div>
    </div>
  )
}

export default Share