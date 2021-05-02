import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">
        John
      </span>

      <button className="btn btn-outline-danger">
      <FontAwesomeIcon icon={ faSignOutAlt } />&nbsp;Salir
      </button>
    </div>
  );
}

export default Navbar;