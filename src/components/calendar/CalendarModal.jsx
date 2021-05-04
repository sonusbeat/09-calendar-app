import { useState } from "react";
import Modal from "react-modal";

const CalendarModal = () => {
  const [ isOpen, setIsOpen ] = useState( true );

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  // Para cerrar el modal
  const closeModal = () => {
    // Se cambia el estado de isOpen
    setIsOpen( false );
  };

  // Make sure to bind modal to your appElement
  // (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#root');

  return (
    <Modal
      // Si es true el modal esta abierto y
      // viene del useState su valor por default "true"
      isOpen={ isOpen }

      // onAfterOpen={ afterOpenModal }

      // Si se da clic fuera del modal se llama esta función
      onRequestClose={ closeModal }

      // Estilos del Modal
      style={ customStyles }

      // Tiempo que dura cuando cerramos el modal en milisegundos
      closeTimeoutMS={ 250 }

      // La clase css del modal
      className="modal"

      // La clase del overlay del modal
      overlayClassName="modal-fondo"
    >
      <h1>React Modal</h1>
      <hr />
      <p>Lorem ipsum dolor dolem ...</p>
    </Modal>
  );
}

export default CalendarModal;