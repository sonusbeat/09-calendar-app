const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div>
      <strong>{ title }</strong>
      <span>&nbsp;-&nbsp;{ user.name }</span>
    </div>
  );
}

export default CalendarEvent;