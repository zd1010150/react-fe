import React from 'react';
import { Error } from 'views/index';
import { TopPanel,
  HeaderContent,
  HeaderNav,
  Footer,
  CopyRight,
  Notification } from '../page/index';


const layout = () => (
  <div className="page-wrapper">
    <header className="page-header">
      <div className="panel wrapper">
        <TopPanel />
      </div>
      <div className="header content">
        <HeaderContent />
      </div>
    </header>
    <div className="section nav-sections">
      <HeaderNav />

    </div>
    <main id="maincontent" className="page-main">
      <div className="page messages">
        <Notification />
      </div>
      <div className="columns">
        <Error />
      </div>
    </main>
    <section className="footer-wrapper">
      <footer className="page-footer">
        <div className="footer content">
          <Footer />
        </div>

      </footer>
      <div className="copyright">
        <CopyRight />
      </div>
    </section>

  </div>
);

export default layout;
