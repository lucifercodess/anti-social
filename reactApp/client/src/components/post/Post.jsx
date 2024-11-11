import React from "react";
import "./post.css";
import { Images } from "../../assets";
import Like from '../../assets/like.png'
import Heart from '../../assets/heart.png'
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Post = () => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={Images.p1} alt="" className="postProfileImage" />
            <span className="postUserName">donald Trump</span>
            <span className="postUserDate">5mins ago</span>
          </div>
          <div className="postTopRight">
          <MoreVertIcon/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Hey its my first post</span>
          <img src={Images.p3} alt="" className="postImage"/>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={Like} alt=""className="postLike" />
            <img src={Heart} alt=""className="postLike" />
            <span className="likeCounter">32 people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
