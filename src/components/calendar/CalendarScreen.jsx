import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

import calendarMessages from '../../helpers/calendar-messages';

import Navbar from "../ui/Navbar";

moment.locale("es");
const localizer = momentLocalizer(moment)

const events = [{
  title: "Junta con UI",
  start: moment().add(2, "days").toDate(), // new Date()
  end: moment().add(2, "days").add( 2, "hours" ).toDate(),
  bgcolor: "#fafafa",
  notes: "Traer libreta de apuntes"
}];

const CalendarScreen = () => {

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: "#3667F7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "#ffffff",
    };

    return { style };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ events }
        startAccessor="start"
        endAccessor="end"
        messages={ calendarMessages }
        eventPropGetter={ eventStyleGetter }
      />

    </div>
  );
}

export default CalendarScreen;