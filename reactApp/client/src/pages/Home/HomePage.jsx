import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './home.css'
import SideBar from '../../components/sidebar/SideBar'
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
const HomePage = () => {
  return (
    <>
      <Navbar/>
      <div className="homeContainer">
      <SideBar/>
      <Feed/>
      <RightBar/>
      </div>
    </>
  )
}

export default HomePage