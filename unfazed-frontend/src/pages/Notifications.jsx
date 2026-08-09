import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="notifications-page">

      <h1>Notifications</h1>

      <div className="notification-list">

        {notifications.length > 0 ? (

          notifications.map((item) => (

            <div className="notification-card" key={item._id}>

              <h3>{item.title}</h3>

              <p>{item.message}</p>

              <small>
                {new Date(item.createdAt).toLocaleString()}
              </small>

            </div>

          ))

        ) : (

          <h3>No Notifications</h3>

        )}

      </div>

    </div>
  );
}

export default Notifications;