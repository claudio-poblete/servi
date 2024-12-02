import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ButtonLink = ({ to, children, className = '' }) => {
  return (
    <Link to={to} className={`btn ${className}`}>
      {children}
    </Link>
  );
};

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ButtonLink;
