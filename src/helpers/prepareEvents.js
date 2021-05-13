import moment from "moment";

/**
 * Convert string dates with moment
 *
 * @param {Array} events Receive events array
 * @returns {Object} Returns events object
 */
const prepareEvents = ( events = [] ) => {

  return events.map(
    ( event ) => ({
      ...event,
      start: moment( event.start ).toDate(),
      end: moment( event.end ).toDate(),
    })
  );
}

export default prepareEvents;