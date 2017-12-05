import React from 'react';
import PropTypes from 'prop-types';

const layout = ({
  topPanel, headerContent, headerNav, leftSiderNav, mainContent, footer, notification, copyRight,
}) => (

  <div className="page-wrapper">
    <header className="page-header">
      <div className="panel wrapper">
        { topPanel }
      </div>
      <div className="header content">
        { headerContent}
      </div>
    </header>
    <div className="section nav-sections">
      { headerNav }

    </div>
    <main id="maincontent" className="page-main">
      <div className="page messages">
        { notification }
      </div>
      <div className="columns">
        <div className="sidebar sidebar-main">
          { leftSiderNav }
        </div>
        <div className="column main">
          { mainContent }
        </div>
      </div>
    </main>
    <footer className="page-footer">
      <div className="footer content">
        { footer }
      </div>

    </footer>
    <small className="copyright">
      { copyRight }
    </small>
  </div>
);
layout.propTypes = {
  topPanel: PropTypes.element.isRequired,
  headerContent: PropTypes.element.isRequired,
  headerNav: PropTypes.element.isRequired,
  leftSiderNav: PropTypes.element.isRequired,
  mainContent: PropTypes.element.isRequired,
  footer: PropTypes.element.isRequired,
  notification: PropTypes.element.isRequired,
  copyRight: PropTypes.element.isRequired,
};
export default layout;
