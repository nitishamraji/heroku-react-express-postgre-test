import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Row, Col } from "shards-react";

const PageTitle = ({ title, subtitle, className, ...attrs }) => {
  const classes = classNames(
    className,
    "text-center",
    "pb-3",
  );

  return (
    <Row className={classes}>
      <Col>
        <span className="text-uppercase page-subtitle">{subtitle}</span>
        <h3 className="page-title">{title}</h3>
      </Col>
    </Row>
  )
};

PageTitle.propTypes = {
  /**
   * The page title.
   */
  title: PropTypes.string,
  /**
   * The page subtitle.
   */
  subtitle: PropTypes.string
};

export default PageTitle;
