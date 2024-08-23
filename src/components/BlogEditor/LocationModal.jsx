import './LocationModal.css';
import LocationSelector from '../../pages/LocationSelector';
const LocationModal = ({ show, onClose, onSelectLocation }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <LocationSelector
          onSelectLocation={onSelectLocation}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default LocationModal;
