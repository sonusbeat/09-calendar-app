import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { uiCloseModal } from '../../actions/uiAction';
import { eventStartAddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/eventAction';

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

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus1.toDate(),
};

const CalendarModal = () => {
  // Redux
  const { modalOpen } = useSelector( state => state.ui );
  const { activeEvent } = useSelector( state => state.calendar );
  const dispatch = useDispatch();

  // useState
  const [ dateStart, setDateStart ]   = useState( now.toDate() );
  const [ dateEnd, setDateEnd ]       = useState( nowPlus1.toDate() );
  const [ titleValid, setTitleValid ] = useState( true );
  const [ notesValid, setNotesValid ] = useState( true );
  const [ formValues, setFormValues ] = useState( initEvent );

  // Destructurar las propiedades de formValues
  const { notes, title, start, end } = formValues;

  useEffect(() => {

    activeEvent
      ? setFormValues( activeEvent )
      : setFormValues( initEvent );

  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {

    setFormValues({
      // Colocar los valores iniciales
      ...formValues,
      // Computar de forma dinámica el key y value
      [ target.name ]: target.value
    });

  };

  const closeModal = () => {
    dispatch( uiCloseModal() )
    dispatch( eventClearActiveEvent() );
    setFormValues( initEvent );
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

    const momentStart = moment( start );
    const momentEnd = moment( end );

    // Validación
    // También existe: isBefore()
    // También existe: isAfter()
    if ( momentStart.isSameOrAfter( momentEnd ) ) {
      return Swal.fire("Error", "La fecha final debe de ser mayor a la fecha de inicio", "error");
    }

    if ( title.trim().length < 3 ) {
      setTitleValid( false );
      Swal.fire("Error", "El título debe ser mayor a 3 caracteres", "error");
      return;
    }

    if ( notes.trim().length < 8 ) {
      setNotesValid( false );
      Swal.fire("Error", "Las notas deben ser mayor a 8 caracteres", "error");
    }

    setTitleValid( true );
    setNotesValid( true );

    if ( activeEvent ) {

      // Actualiza la nota
      dispatch( eventStartUpdate( formValues ) );

    } else {

      // Crea una nota nueva
      dispatch( eventStartAddNew(formValues) );

    }

    closeModal();

    // TODO: Realizar guardado en base de datos
  };


  // Make sure to bind modal to your appElement
  // (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement("#root");

  return (
    <Modal
      // Si se pone true se mostrará el modal
      isOpen={ modalOpen }

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
      <button
        className="btn btn-secondary btn-close"
        onClick={ closeModal }
      >
        <FontAwesomeIcon icon={ faTimes } />
      </button>

      <h1>{ activeEvent ? "Editar evento" : "Nuevo evento" }</h1>
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
            className={ `form-control ${ !titleValid && 'is-invalid' }` }
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
            className={ `form-control ${ !notesValid && 'is-invalid' }` }
            placeholder="Notas"
            rows="5"
            name="notes"
            onChange={ handleInputChange }
            value={ notes }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <FontAwesomeIcon icon={ faSave } />&nbsp;
          <span>Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarModal;
