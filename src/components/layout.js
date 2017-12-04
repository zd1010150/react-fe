import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const {
  Header, Footer, Sider, Content,
} = Layout;
const layout = ({
  sider, header, content, footer,
}) => (
  <Layout>
    <Sider>{ sider }</Sider>
    <Layout>
      <Header>{ header }</Header>
      <Content>{ content }</Content>
      <Footer>{ footer }</Footer>
    </Layout>
  </Layout>
);
layout.propTypes = {
  sider: PropTypes.element.isRequired,
  header: PropTypes.element.isRequired,
  content: PropTypes.element.isRequired,
  footer: PropTypes.element.isRequired,
};
export default layout;
