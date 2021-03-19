import { connect } from 'react-redux';
import InfoCardList from './info.card.list.jsx';
import { changeStatusTradiesActionCreator } from '../../state-container/actions/tradie.actions';
import { withLoader } from "../HOC/withLoader.jsx";

const mapStatetoProps = (_, props) => props;

export default connect(
  mapStatetoProps,
  changeStatusTradiesActionCreator
)(withLoader(InfoCardList));
