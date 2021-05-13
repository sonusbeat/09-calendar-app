import types from "../types/types";

//  Objeto de referencia
// {
//   id: "65a4s6a54f6asdf",
//   title: "Junta con recursos humanos",
//   start: moment().add(2, "days").toDate(),
//   end: moment().add(2, "days").add(2, "hours").toDate(),
//   notes: "Se definirán los perfiles para los proximos proyectos.",
//   user: {
//     _id: "258gd968&#tg6",
//     name: "Daniel",
//   },
// },

const initialState = {
  events: [],
  activeEvent: null,
};

const calendarReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [ ...state.events, action.payload ],
      };

    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(
          event => ( event.id === action.payload.id )
          ? action.payload
          : event
        ),
      };

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter( event => event.id !== state.activeEvent.id ),
        activeEvent: null
      }

    case types.eventLoaded:
      return {
        ...state,
        events: [ ...action.payload ]
      }

    default:
      return state;
  }
};

export default calendarReducer;
