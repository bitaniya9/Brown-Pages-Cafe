const RegisterEventModal = ({
  event,
  isRegistered,
  onConfirm,
  onCancel,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{event.title}</h2>
        <p>{new Date(event.date).toDateString()}</p>

        {isRegistered ? (
          <>
            <p>You are already registered for this event.</p>
            <button className="danger-btn" onClick={onCancel}>
              Cancel Registration
            </button>
          </>
        ) : (
          <button className="confirm-btn" onClick={onConfirm}>
            Confirm Registration
          </button>
        )}
        <button className="secondary-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
export default RegisterEventModal;
