import React, { Component } from "react";

import { Container, Row } from "shards-react";
import Iframe from 'react-iframe';

import CustomTabs from './../../components/tabs/CustomTabs';

import './Styles.css';

class Home extends Component {

  render() {

    return (
      <Container fluid className="main-content-container px-4 py-4">
        {/* Page Header */}
        <Row noGutters className="page-header">
          {/* <PageTitle sm="4" title="Add New Post" className="text-sm-left" /> */}
        </Row>

        <CustomTabs tabsProps={ { headers: ['Market Overview', 'Top Active'] } }>
          <Iframe
           src="../widget.html"
           width="420"
           height="550"
           className="iframeWidget"
           display="initial"
           position="relative"
          />
          <Iframe
           src="../widget-test.html"
           width="420"
           height="500"
           className="iframeWidget"
           display="initial"
           position="relative"
          />
        </CustomTabs>

      </Container>
    );
  }
}

export default Home;
