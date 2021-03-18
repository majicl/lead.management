import { connect } from 'react-redux';
import LeadManagement from './management.jsx';
import { loadTradiesActionCreator } from '../../state-container/actions/tradie.actions';
import { tradiesSelector } from '../../state-container/selectors/tradies.selector.js';

const mapStatetoProps = (state) => tradiesSelector(state);

export default connect(
  mapStatetoProps,
  loadTradiesActionCreator
)(LeadManagement);
