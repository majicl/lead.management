import './action.bar.css';

const ActionBar = ({ onAccept, onDecline }) => {
  return (
    <side>
      <button className="btn btn-primary" type="submit" onClick={onAccept}>
        Accept
      </button>
      <button className="btn btn-secondry" type="submit" onClick={onDecline}>
        Decline
      </button>
    </side>
  );
};
export default ActionBar;
