import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Navbar from "../ui/Navbar";

const localizer = momentLocalizer(moment)

const events = [{
  title: "Meeting with UI",
  start: moment().toDate(), // new Date()
  end: moment().add( 2, "hours" ).toDate(),
}];

const CalendarScreen = () => {
  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
      />

    </div>
  );
}

export default CalendarScreen;