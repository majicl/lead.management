import { connect } from 'react-redux';
import InfoCardList from './info.card.list.jsx';
import { changeStatusTradiesActionCreator } from '../../state-container/actions/tradie.actions';

const mapStatetoProps = (_, props) => props;

export default connect(
  mapStatetoProps,
  changeStatusTradiesActionCreator
)(InfoCardList);
