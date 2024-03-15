import React, { useEffect, useState } from 'react';
import { client_01, client_02, client_03, client_04 } from '../../imagepath';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Notification() {
  const userId = localStorage.getItem('token');
  const [notifications, setNotifications] = useState([]);
  const fetchdoctorappointment = async () => {
    try {
      const response = await axios.get(`https://imdfx-newserver-production.up.railway.app/api/notifications/${userId}`);
      setNotifications(response.data);


    } catch (error) {
      console.error('Error fetching appointments:', error);

    }
  };
  // Function to mark a notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.post(`https://imdfx-newserver-production.up.railway.app/api/markAsRead/${notificationId}`);
      // After marking as read, update the state or refetch notifications
      // based on your application's structure
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  // Filter unread notifications
  const unreadNotifications = notifications.filter(notification => !notification.isRead);
  const hasUnreadNotifications = unreadNotifications.length > 0;
  useEffect(() => {
    fetchdoctorappointment()

  }, []);
  return (
    <>
      {/* Notifications */}
      <li className="nav-item dropdown noti-nav me-3 pe-0">
        <Link
          to="#"
          className="dropdown-toggle nav-link p-0"
          data-bs-toggle="dropdown"
        >
          <i className="fa-solid fa-bell text-white" /> <span className="badge">{unreadNotifications && unreadNotifications.length}</span>
        </Link>
        
        
        <div style={{
          top: "50px"
        }} className="dropdown-menu py-3 px-0   rounded-2 notifications dropdown-menu-end ">
          <div className="topnav-dropdown-header w-100 border-dark-subtle  p-2">
            <span style={{
              color: "gray"
            }} className='fw-bold fs-4 '>Notifications</span>
          </div>
          {hasUnreadNotifications && hasUnreadNotifications ?
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message px-3 my-1  border-dark-subtle  " >
                  <Link to="/patient/dashboard">
                    <div className="media ">
                      {unreadNotifications.map((notification) => (
                        <li key={notification._id} onClick={() => markAsRead(notification._id)} className='notify-message'>
                          <p className='text-white'>
                            { notification.message }
                          </p>
                        </li>
                      ))}

                    </div>
                  </Link>
                </li>


              </ul>
            </div>
            : "NO Notification Yet!"
          }
        </div>
      </li>
      {/* /Notifications */}
    </>

  );
}

export default Notification;
