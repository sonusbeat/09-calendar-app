import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/uiAction';

const AddNewFab = () => {
  const dispatch = useDispatch()

  const openModal = () => {
    dispatch( uiOpenModal() );
  };

  return (
    <button
      className="btn btn-primary fab"
      onClick={ openModal }
    >
      <FontAwesomeIcon icon={ faPlus } />
    </button>
  );
}

export default AddNewFab;