import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/uiAction';
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/eventAction';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

import calendarMessages from '../../helpers/calendar-messages-es';
import Navbar from "../ui/Navbar";
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale("es");
const localizer = momentLocalizer(moment)

const CalendarScreen = () => {
  // Redux
  const dispatch = useDispatch();

  // Traer los eventos del State de Redux
  const { events, activeEvent } = useSelector(state => state.calendar);

  // Traer el UID del State de Redux
  const { uid } = useSelector(state => state.auth);

  // Obtener o cambiar state de lastView del localstorage para mantener, month, week, day
  const [lastView, setLastView] = useState( localStorage.getItem("lastView") || "month" );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [ dispatch ]);

  const onDoubleClick = ( event ) => {
    dispatch( uiOpenModal() );
  };

  const onSelectEvent = ( event ) => {
    dispatch( eventSetActive( event ) );
  };

  const onViewChange = ( event ) => {
    // Actualizar el state del evento
    setLastView( event );

    // Guardar el evento del LocalStorage
    localStorage.setItem( "lastView", event );
  };

  const onSelectSlot = () => {
    dispatch( eventClearActiveEvent() );
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {

      // Cambiar el color de fondo del evento
      // si el uid es igual al del usuario del evento
      // en pocas palabras mostrar de color azul quien creó el evento
      backgroundColor: ( uid === event.user._id ) ? "#3667F7" : "#465660",
      // ******************************************************************

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
        onSelectSlot={ onSelectSlot }
        selectable={ true }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

      <CalendarModal />

      { activeEvent && <DeleteEventFab /> }

      <AddNewFab />

    </div>
  );
}

export default CalendarScreen;