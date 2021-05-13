import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

const Navbar = () => {
  const { name } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const handleLogout = ( event ) => {
    event.preventDefault();
    dispatch( startLogout() );
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{ name }</span>

      <button
        className="btn btn-outline-danger"
        onClick={ handleLogout }
      >
        <FontAwesomeIcon icon={ faSignOutAlt } />&nbsp;Salir
      </button>
    </div>
  );
}

export default Navbar;