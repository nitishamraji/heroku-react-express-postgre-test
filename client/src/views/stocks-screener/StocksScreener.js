import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";


import axios from "axios";

import Table from './../../components/table/Table';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import CustomTabs from './../../components/tabs/CustomTabs';

import { Button, Modal } from 'react-bootstrap';

import TradingViewWidget, { Themes, BarStyles } from 'react-tradingview-widget';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import $ from "jquery";

import './Styles.css';

const columnHover = (cell, row, enumObject, rowIndex) => {
    return cell
  }

const pctFormatter = (c) => {
  var num = Number(c).toFixed(3);
  var cssClass = num < 0 ? 'text-danger' : 'text-success';
  return  <span className={cssClass}>{num}</span>
}

const basicSort =  (a, b, order, dataField, rowA, rowB) => {
      if (order === 'asc') {
        return b - a;
      }
      return a - b; // desc
    }

const popupStyles = { width: '800px' }; // style for an svg element

const MyModel = (props) => (<Modal show={props.isHidden} onHide={props.onClose}>
  <Modal.Header closeButton>
    <Modal.Title>Translations</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <h4>Filter:</h4>
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    <hr />
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={props.onClose}>Close</Button>
  </Modal.Footer>
</Modal>);

const settingsFormat = (symbol) => {
  return (
      <Popup
        trigger={
          <span class="cell-settings" stock-symbol={symbol}>
          <i className="material-icons">settings</i>
          </span>
        }
        modal
        nested>
        <div style={{width: '400px',height:'300px'}} className="card mx-auto">
          <div className="card-body">
          <input type="text" id="modalInput"/>
          <label onClick={(e)=>{
              console.log("testing modal click");
              console.log(document.getElementById('modalInput').value);
          }
          }>{symbol}</label>
          </div>
        </div>
      </Popup>
    );
}

const symbolFormat = (symbol) => {
  return (
      <Popup trigger={<a href="/#" className="symbol-popup" title={symbol}>{symbol}</a>} modal nested>
        <div style={{width: "800px"}}><TradingViewWidget theme={Themes.DARK} style={BarStyles.LINE} symbol={symbol} width="800" height="400"/></div>
      </Popup>
    );
}

const columns = [
  {
    dataField: 'symbol',
    text: 'Tckr',
    sort: true,
    formatter: (c) => { return symbolFormat(c) },
  },
  {
    dataField: 'companyName',
    formatter: (c) => { return ( <span title={c}>{c}</span> ) },
    text: 'Name',
    hidden: true
  },
  {
    dataField: 'low',
    text: 'L',
    hidden: false
  },
  {
    dataField: 'high',
    text: 'H',
    hidden: false
  },
  {
    dataField: 'changePercent',
    text: '%',
    sort: true,
    formatter: (c) => { return  pctFormatter(c) },
    sortFunc: basicSort
  },
  {
    dataField: 'extendedPrice',
    text: 'AH %',
    sort: true,
    hidden: false,
    formatter: (c) => { return  pctFormatter(c.extendedChangePercent) },
    sortFunc: (a,b, order) => { return basicSort( a.extendedChangePercent, b.extendedChangePercent, order) }
  },
  {
    dataField: 'volume',
    text: 'V',
    sort: true,
    formatter: (c) => { return convertNum(c) }
  },
  {
    dataField: 'marketCap',
    text: 'M Cap',
    sort: true,
    formatter: (c) => { return convertNum(c) }
  },
  {
    dataField: 'week52High',
    text: '52W H',
  },
  {
    dataField: 'week52Low',
    text: '52W L',
  },
  {
    dataField: 'pct7d',
    text: '1w %',
    sort: true,
    sortFunc: basicSort,
    formatter: (c) => { return  pctFormatter(c.pct7d) }
  },
  {
    dataField: 'pct14d',
    text: '2w %',
    sort: true,
    sortFunc: basicSort,
    formatter: (c) => { return  pctFormatter(c.pct14d) }
  },
  {
    dataField: 'pct1m',
    text: '1m %',
    sort: true,
    sortFunc: basicSort,
    formatter: (c) => { return  pctFormatter(c.pct1m) }
  },
  {
    dataField: 'pct3m',
    text: '3m %',
    sort: true,
    sortFunc: basicSort,
    formatter: (c) => { return  pctFormatter(c.pct3m) }
  },
  {
    dataField: 'symbol',
    text: 'S',
    sort: false,
    formatter: (c) => { return settingsFormat(c) },
  }
];

const defaultSorted = [{
  dataField: 'symbol',
  order: 'desc'
}];

const tableProps = (stocksList) => {
  return {
    defaultSorted: defaultSorted,
    columns: columns,
    products: stocksList,
    columnTitle: columnHover
  }
}

function constructCategoriesList(stocksList, categoryStocksMapper){
  var categoriesDataArr= [];

   console.log(categoryStocksMapper);

  categoryStocksMapper.forEach(function(categoryMapper) {
    var categoryStocks = categoryMapper.stocks;

    const stocksListJson = [];

    categoryStocks.forEach((stockSymbol) => {
      stocksList.forEach((item) => {
        if( item.symbol === stockSymbol )
          stocksListJson.push(item);
      });
    });

    categoriesDataArr.push( {category: categoryMapper.category, stocksListJson: stocksListJson} );

  });

  return categoriesDataArr;
}

function constructStockJson(data){

        console.log(data);
      var dataJson = {
          symbol: data.symbol,
          companyName: data.companyName,
          low: data.low,
          high: data.high,
          changePercent: data.changePercent,
          extendedPrice: data,
          extendedChangePercent: data.extendedChangePercent,
          volume: data.volume,
          marketCap: data.marketCap,
          week52High: data.week52High,
          week52Low: data.week52Low,
          pct7d: data,
          pct14d: data,
          pct1m: data,
          pct3m: data
      }

      return dataJson;
}

function convertNum (num) {

    if( !num )
      return "";

    // Nine Zeroes for Billions
    var convertNum = Math.abs(Number(num)) >= 1.0e+12

    ? (Math.abs(Number(num)) / 1.0e+12).toFixed(2) + "T"

    : Math.abs(Number(num)) >= 1.0e+9

    ? Number( Math.abs(Number(num)) / 1.0e+9).toFixed(2) + "B"
    // Six Zeroes for Millions
    : Number( Math.abs(Number(num)) >= 1.0e+6).toFixed(2)

    ? Number( Math.abs(Number(num)) / 1.0e+6).toFixed(2) + "M"
    // Three Zeroes for Thousands
    : Number( Math.abs(Number(num)) >= 1.0e+3).toFixed(2)

    ? Number( Math.abs(Number(num)) / 1.0e+3).toFixed(2) + "K"

    : Number( Math.abs(Number(num))).toFixed(2);

    return convertNum
}

class StocksScreener extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableProps: {},
      categoryStocksMapperData: [],
      checkedCategories: new Map(),
      filterCategories: [],
      showAll: true,
      showCategoriesFilter: false,
      showModal: false
    };
    this.handleCategoryFilterChange = this.handleCategoryFilterChange.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
  }

  async componentDidMount() {

    const response = await fetch('/getStocksData');
    const stocksData = await response.json();

    const categoryStocksMapperResponse = await fetch('/getCategoryStocksMapper');
    const categoryStocksMapper = await categoryStocksMapperResponse.json();

    var filterCategories = [];
    categoryStocksMapper.forEach( data => {
      filterCategories.push(data.category);
    });

    this.setState({ filterCategories: filterCategories });

    filterCategories.forEach(category => {
      // this.setState(prevState => ({ checkedCategories: this.state.checkedCategories.set(category, true) });

      this.setState(prevState => ({ checkedCategories: prevState.checkedCategories.set(category, !prevState.check) }));

    });

    console.log("stocks data response: " + stocksData );
    const stocksList = [];

    stocksData.forEach((stockDoc) => {
      var data = stockDoc.data;

      stocksList.push(constructStockJson(data));
    });

    this.setState({ tableProps: tableProps(stocksList) });


    var categoryStocksMapperData = constructCategoriesList(stocksList, categoryStocksMapper);

    this.setState({ categoryStocksMapperData: categoryStocksMapperData });

    console.log("table props length");
    console.log(this.state.tableProps.hasOwnProperty('products'));
  }

  toggleCategoryDiv(category, isShow) {
    $("#"+category).toggle(isShow);
  }

  handleCategoryFilterChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const category = e.target.value;

    this.setState(prevState => ({ checkedCategories: prevState.checkedCategories.set(category, isChecked) }));

    this.toggleCategoryDiv(category, isChecked);

    console.log(this.state.checkedCategories);
  }

  handleToggleAll(){

    const isShow = !this.state.showAll; //if previous show.. hide now

    this.state.filterCategories.forEach((category) => {
      this.setState(prevState => ({ checkedCategories: prevState.checkedCategories.set(category, isShow) }));
      this.toggleCategoryDiv(category, isShow);
    });

    this.setState({ showAll: !this.state.showAll });
  }

  render() {

    return (
      <Container fluid className="main-content-container px-2 py-4">
        <Row>
          <Col>
            <Card className="mb-4">

              <CardBody className="p-3">

              <div>
                 <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                    <Tab label="All">
                      { this.state.tableProps.hasOwnProperty('products') &&
                        <Table tableProps={this.state.tableProps} customProps={ {isShowAll: true, showSearch:true, category: 'All'} }/>
                      }
                    </Tab>
                    <Tab label="Categories">

                      <div className="mt-2">

                        <div id="accordion">
                        <div className="card card-filter">
                          <div className="card-header px-0 py-0" id="headingOne">
                                <button className="btn btn-link" onClick={(e) => this.setState(prevState => ({ showCategoriesFilter: !prevState.showCategoriesFilter }))} data-toggle="collapse" data-target="#filterBody" aria-expanded="false" aria-controls="filterBody">
                                  Filters
                                </button>
                          </div>

                          <div id="filterBody" className={ `${this.state.showCategoriesFilter ? 'd-block' : 'd-none'}`} aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body form-check ml-3 px-0 py-0">
                            <div className="mb-2">
                              <button type="button" className={ `btn btn-sm ${this.state.showAll ? 'btn-light' : 'btn-secondary'}`}  onClick={this.handleToggleAll}>{this.state.showAll ? 'Hide All' : 'Show All'}</button>
                            </div>
                            <div className="category-items-section">
                            <ul className="list-inline">
                              {
                                this.state.filterCategories && this.state.filterCategories.map(category => (
                                      <li className={ `list-inline-item mr-3 ${category}`}>
                                        <span className="category-selection-span">
                                         <input  className="form-check-input" name={category} type="checkbox" value={category}  checked={this.state.checkedCategories.get(category)} onChange={this.handleCategoryFilterChange}/>
                                          <label className="pl-0 small" for="defaultCheck1">
                                            {category}
                                          </label>
                                          </span>
                                      </li>

                                ))
                              }
                              </ul>
                              </div>
                            </div>
                          </div>

                         </div>
                      </div>

                      </div>


                       {  this.state.categoryStocksMapperData.map(data => (
                        <Table tableProps={tableProps(data.stocksListJson)} customProps={ {category: data.category, isShowAll: false, showSearch:false} }/>
                        ))}
                    </Tab>
                </Tabs>
                </div>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default StocksScreener;
