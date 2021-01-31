import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from './../../components/common/PageTitle';

import CustomTabs from './../../components/tabs/CustomTabs';
import TextField from '@material-ui/core/TextField';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import MuiAutocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import {createUseStyles, withStyles} from 'react-jss';

import axios from "axios";

import './Styles.css';

import {
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";

const filter = createFilterOptions();

class Settings extends React.Component {

  _isMounted = false;

  constructor(props) {
		super(props);
    this.state = { supportedStocksData: [], selectedStockToAdd: '' };
    this.addStockFrom  = this.addStockFrom.bind(this);
    this.handleStockSelectionChange = this.handleStockSelectionChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
	}

  componentDidMount() {
    this._isMounted = true;

    fetch('/api/getSupportedStocks')
    .then(res => res.json())
    .then((response) => {
      const supportedStocksData = response;
      if( this._isMounted ) {
        this.setState({supportedStocksData: supportedStocksData});
      }
    }, (error) => {
      console.log(error);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputChange(input, e) {
    console.log("value", input)
  }

  handleStockSelectionChange(selectedOptions) {
    console.log("testing selection");
    const selectedStockSymbol = selectedOptions[0].symbol;
    this.setState({ selectedStockToAdd: selectedStockSymbol });
    console.log(selectedStockSymbol);
  }

  handleClick() {
    console.log("testing onClick")
  }

  addStockFrom() {
    return (
        <fieldset className="border p-2">
          <div className="row px-5">
            <div className="col col-8">
              <form noValidate autoComplete="off">

                <div className="form-group">
                  <label htmlFor="stock" className="small">Stock</label>
                  <Typeahead
                      filterBy={['symbol', 'name']}
                      clearButton
                      id="stock"
                      labelKey={(option) => (option.name + " (" + option.symbol + ")") }
                      options={this.state.supportedStocksData}
                      placeholder="search stock by name or symbol..."
                      typeahead-show-hint="true"
                      onInputChange={this.handleInputChange}
                      onChange={this.handleStockSelectionChange}
                      renderMenuItemChildren={(option, props) => (
                        <div className="row">
                          <div className="col-2">{option.symbol}</div>
                          <div className="col-10">{option.name}</div>
                        </div>
                      )}
                      onFocus={this.handleClick}
                  />
                  {/*
                  <div className="small text-danger">
                    Please provide a valid city.
                  </div>
                  */}
                </div>

                <div className="form-group">
                  <label htmlFor="categories" className="small">Categories</label>
                  <Typeahead
                      filterBy={['symbol', 'name']}
                      clearButton
                      multiple
                      allowNew={true}
                      newSelectionPrefix="Add new category: "
                      id="categories"
                      labelKey="symbol"
                      options={this.state.supportedStocksData}
                      placeholder="select or add categories..."
                      typeahead-show-hint="true"
                      renderMenuItemChildren={(option, props) => (
                        <div className="row">
                          <div className="col-2">{option.symbol}</div>
                          <div className="col-10">{option.name}</div>
                        </div>
                      )}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary w-25" type="submit">Add Stock</button>
                </div>

              </form>
            </div>
          </div>
        </fieldset>
    );
  }

  render() {

    return (
      <Container fluid className="main-content-container px-4 py-4">

        <Row noGutters className="page-header">
          {/*
          <PageTitle sm="4" title="Add/Edit stocks for screening" className="text-sm-left" />
          */}
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4 vh-100">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Add/Edit stocks for screening</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <CustomTabs tabsProps={ { headers: ['Add', 'Edit', 'Categories'] } }>
                  <div>
                  {
                    this.state.supportedStocksData &&
                    this.state.supportedStocksData.length > 0 &&
                    this.addStockFrom()
                  }
                  </div>
                  <div></div>
                  <div></div>
                </CustomTabs>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    );

  }
}

export default Settings;
