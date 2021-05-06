import types from '../types/types';
import moment from 'moment';

const initialState = {
  events: [{
    title: "Junta con UI",
    start: moment().add(2, "days").toDate(),
    end: moment().add(2, "days").add( 2, "hours" ).toDate(),
    bgcolor: "#fafafa",
    notes: "Traer libreta de apuntes",
    user: {
      _id: "258gd968&#tg6",
      name: "Daniel"
    }
  }],
  activeEvent: null
};

const calendarReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [
          ...state.events,
          action.payload
        ]
      }

    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null
      }

    default:
      return state;
  }
};

export default calendarReducer;
