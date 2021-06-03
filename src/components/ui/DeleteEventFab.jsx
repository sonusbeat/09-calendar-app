import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/eventAction';

const DeleteEventFab = () => {
  const dispatch = useDispatch()

  const deleteEvent = () => {
    // Eliminar el evento del state de Redux
    dispatch( eventStartDelete() );
  }

  return (
    <button
      id="delete"
      className="btn btn-danger fab-danger"
      onClick={ deleteEvent }
    >
      <FontAwesomeIcon icon={ faTrash } />
    </button>
  );
}

export default DeleteEventFab;