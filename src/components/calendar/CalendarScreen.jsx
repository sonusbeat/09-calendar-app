import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

import calendarMessages from '../../helpers/calendar-messages-es';
import Navbar from "../ui/Navbar";
import CalendarEvent from './CalendarEvent';

moment.locale("es");
const localizer = momentLocalizer(moment)

const events = [{
  title: "Junta con UI",
  start: moment().add(2, "days").toDate(), // new Date()
  end: moment().add(2, "days").add( 2, "hours" ).toDate(),
  bgcolor: "#fafafa",
  notes: "Traer libreta de apuntes",
  user: {
    _id: "258gd968&#tg6",
    name: "Daniel"
  }
}];

const CalendarScreen = () => {

  // Obtener o cambiar state de lastView del localstorage para mantener, month, week, day
  const [lastView, setLastView] = useState( localStorage.getItem("lastView") || "month" );

  const onDoubleClick = ( event ) => {
    console.clear();
    console.log( event );
  };

  const onSelectEvent = ( event ) => {
    console.clear();
    console.log( event );
  };

  const onViewChange = ( event ) => {
    // Actualizar el state del evento
    setLastView( event );

    // Guardar el evento del LocalStorage
    localStorage.setItem( "lastView", event );
  };

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
        onSelectEvent={ onSelectEvent }
        onDoubleClickEvent={ onDoubleClick }
        onView={ onViewChange }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

    </div>
  );
}

export default CalendarScreen;