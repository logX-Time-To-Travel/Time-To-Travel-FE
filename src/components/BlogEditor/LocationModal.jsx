import './LocationModal.css';
import LocationSelector from '../../pages/LocationSelector';
const LocationModal = ({ show, onClose, onSelectLocation }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <LocationSelector onSelectLocation={onSelectLocation} />
      </div>
    </div>
  );
};

export default LocationModal;
