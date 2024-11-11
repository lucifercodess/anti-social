import React, { useEffect, useState } from "react";
import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpIcon from "@mui/icons-material/Help";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import { Images } from "../../assets";

const SideBar = () => {
  const [friends, setFriends] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming you're storing the token in localStorage or sessionStorage
    
        if (!token) {
          console.log("No token found.");
          return; // Handle the case where there is no token
        }
    
        const response = await fetch("http://localhost:3000/api/user/following", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
    
        const data = await response.json();
        console.log("Fetched friends:", data);
        if (data.code === 1 && data.user) {
          setFollowing(data.user.following); // Update state with following data
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    
    

    const fetchAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setFriends(data.user);
        console.log(data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchFriends();
    fetchAllUsers();
  }, []);

  // Follow user function
  const handleFollow = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/follow/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.code === 1) {
        setFollowing((prev) => [...prev, userId]);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/unfollow/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.code === 1) {
        setFollowing((prev) => prev.filter((id) => id !== userId));
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon />
            <span className="sidebarListTest">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon />
            <span className="sidebarListTest">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon />
            <span className="sidebarListTest">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupsIcon />
            <span className="sidebarListTest">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon />
            <span className="sidebarListTest">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpIcon />
            <span className="sidebarListTest">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkIcon />
            <span className="sidebarListTest">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon />
            <span className="sidebarListTest">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon />
            <span className="sidebarListTest">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHR" />
        <h3>Friends List</h3>
        <ul className="sidebarFriendList">
          {Array.isArray(friends) && friends.length > 0 ? (
            friends.map((friend) => (
              <li key={friend._id} className="sidebarFriend">
                <img
                  src={friend.profilePicture || Images.defaultProfilePic}
                  alt={friend.username}
                  className="profilePic"
                />
                <span className="friendName">{friend.username}</span>
                {following.includes(friend._id) ? (
                  <button
                    className="sidebarFollowButton"
                    onClick={() => handleUnfollow(friend._id)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="sidebarFollowButton"
                    onClick={() => handleFollow(friend._id)}
                  >
                    Follow
                  </button>
                )}
              </li>
            ))
          ) : (
            <li>No friends available</li> // Show a message if no friends
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
