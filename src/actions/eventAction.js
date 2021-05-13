import { fetchWithToken } from "../helpers/fetch";
import types from "../types/types";
import prepareEvents from '../helpers/prepareEvents';

export const eventStartAddNew = ( event ) => {
  return async ( dispatch, getState ) => {
    const { uid, name } = getState().auth;

    try {

      const response = await fetchWithToken( "events", event, "POST" );
      const body = await response.json();

      if( body.ok ) {
        event.id = body.event.id;

        event.user = {
          _id: uid,
          name: name,
        };

        dispatch( eventAddNew( event ) );
      }

    } catch(error) {

      console.log(error);

    }
  };
};

const eventAddNew = ( event ) => ({
  type: types.eventAddNew,
  payload: event
});

export const eventSetActive = ( event ) => ({
  type: types.eventSetActive,
  payload: event
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent
});

export const eventUpdated = ( event ) => ({
  type: types.eventUpdated,
  payload: event
});

export const eventDeleted = () => ({ type: types.eventDeleted });


export const eventStartLoading = () => {
  return async ( dispatch ) => {

    try {

      const response = await fetchWithToken( "events" );
      const body = await response.json();

      const events = prepareEvents( body.events );

      if( body.ok ) {

        // Disparamos la acción para enviar los eventos al state del redux
        dispatch( eventLoaded( events ) );

      }

    } catch (error) {
      console.log( error );
    }

    // dispatch(eventLoaded( events ));

  }
};

const eventLoaded = ( events ) => ({
  type: types.eventLoaded,
  payload: events,
});
