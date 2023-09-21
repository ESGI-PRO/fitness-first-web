import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

const notification = new Notyf({
  duration: 1000,
  position: {
    x: "center",
    y: "top",
  },
  types: [
    {
      type: "warning",
      background: "orange",
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "warning",
      },
    },
    {
      type: "error",
      background: "indianred",
      duration: 2000,
      dismissible: true,
    },
  ],
});

class Notification {
  constructor() {}

  success(message) {
    return notification.success(message);
  }

  error(message) {
    return notification.error(message);
  }

  info(message) {
    return notification.open(message);
  }
}

const notif = new Notification();
export default notif
