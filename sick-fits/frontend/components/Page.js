import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h2>I am the page component</h2>
      {/* // Render out childern */}
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
