import { useState } from 'react';
import Modal from "react-modal";
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const now = moment().minutes(0).seconds(0).add(1, "hours"); // 2:00:00
const nowPlus1 = now.clone().add(1, "hours"); // 3:00:00


const CalendarModal = () => {

  const [ dateStart, setDateStart ] = useState( now.toDate() );
  const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );

  const [ formValues, setFormValues ] = useState({
    title: "",
    notes: "",
    start: now.toDate(),
    end: nowPlus1.toDate(),
  });

  const { notes, title } = formValues;

  const handleInputChange = ({ target }) => {

    setFormValues({
      // Colocar los valores iniciales
      ...formValues,
      // Computar de forma dinámica el key y value
      [ target.name ]: target.value
    });

  };

  // Para cerrar el modal
  const closeModal = () => {
    // Se cambia el estado de isOpen
    console.log("Cerrando ...");
  };

  // Cambia la fecha de inicio con el useState
  const handleStartDateChange = ( event ) => {
    setDateStart( event );

    // Cambia la fecha inicial del formulario
    setFormValues({
      ...formValues,
      start: event,
    });
  };

  // Cambia la fecha final con el useState
  const handleEndDateChange = ( event ) => {
    setDateEnd( event );

    // Cambia la fecha final del formulario
    setFormValues({
      ...formValues,
      end: event,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log( formValues );
  };


  // Make sure to bind modal to your appElement
  // (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement("#root");

  return (
    <Modal
      // Si se pone true se mostrará el modal
      isOpen={ true }

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
      <h1> Nuevo evento </h1>
      <hr />
      <form
        className="container"
        onSubmit={ handleFormSubmit }
      >
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={ handleStartDateChange }
            value={ dateStart }
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={ handleEndDateChange }
            value={ dateEnd }
            // Validación para que nunca sea menor a dateStart
            minDate={ dateStart }
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Evento"
            name="title"
            autoComplete="off"
            value={ title }
            onChange={ handleInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            onChange={ handleInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span>Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;