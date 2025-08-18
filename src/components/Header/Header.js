import React, { useEffect, useState } from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import avtar from "../../Assests/image.jpg";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { MyContext1 } from '../../Context/MyContext';
const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState([])
  const { text, setText } = useContext(MyContext1)
  const userId = JSON.parse(localStorage.getItem("data123"))?.id;
  useEffect(() => {
    if (userId) {
      fetchNotifications();
      fetchProfileData();
      markNotificationsAsSeen();
    }
  }, [userId]);
  const fetchNotifications = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}notification-users`, { user_id: userId });
      setNotifications(response.data.data || []);
      setCount(response.data.unseenCount || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch notifications');
    }
  };
  const fetchProfileData = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}get-profile-admin`, { user_id: userId });
      setImage(response.data.data.profile)
      setUserData(response.data.data || {});
    } catch (error) {
      toast.error("Failed to fetch profile data");
    }
  };
  const markNotificationsAsSeen = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}notification-status`, { user_id: userId });
    } catch (error) {
      console.error("Failed to mark notifications as seen");
    }
  };
  const handleNotificationClick = () => {
    navigate('/Admin/notifications');
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <header className='header' style={{ backgroundColor: "#f0f2f5" }}>
      <div className='d-flex justify-content-end align-items-center gap-4 pt-4'>
        <div className=''>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <NotificationsActiveIcon className='fs-3' />
              {count > 0 && <Badge bg="danger">{count}</Badge>}
            </Dropdown.Toggle>
            <Dropdown.Menu className='sidebar123 pt-0'>
              <p className=' ps-3 notiHead mb-0 py-2'>Notifications</p>
              <div className='notificationScroll'>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div className='bg-light border-bottom notificationAsiaBack' onClick={handleNotificationClick} key={index}>
                      <Dropdown.Item>
                        <h6 className='mt-2'>{notification.title}</h6>
                        <p className='description'><small>{notification.description}</small></p>
                      </Dropdown.Item>
                    </div>
                  ))
                ) : (
                  <p className='text-center'>No new notifications</p>
                )}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div style={{ width: '35px', height: '35px' }} className='me-5'>
          <img
            src={text ? `${process.env.REACT_APP_BASE_URL_image}${text}` : `${process.env.REACT_APP_BASE_URL_image}${image}`}
            alt="User Profile"
            id="basic-button"
            aria-controls={anchorEl ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            style={{ cursor: 'pointer', width: '100%', height: '100%', borderRadius: '50%' }}
          />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          <MenuItem onClick={() => { navigate('/Admin/profile'); setAnchorEl(null); }}>Profile</MenuItem>
          <MenuItem onClick={() => { navigate('/Admin/changepassword'); setAnchorEl(null); }}>Change Password</MenuItem>
          <MenuItem onClick={() => { handleLogout(); setAnchorEl(null); }}>Logout</MenuItem>
        </Menu>
      </div>
      <ToastContainer />
    </header>
  );
};
export default Header;
