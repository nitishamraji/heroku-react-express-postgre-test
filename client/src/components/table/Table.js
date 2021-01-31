import React, { Component } from 'react';
import { Link } from "react-router-dom";

// React Bootstrap Table
import BootstrapTable from 'react-bootstrap-table-next';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';

import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../../../node_modules/react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import '../../../node_modules/react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import './styles.css';

// const { SearchBar } = Search;
const { SearchBar, ClearSearchButton } = Search;


const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: false,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={e => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }
      </label>
    </div>
  )
});

class Table extends Component {

	render() {
	    return (
	    		<div>

		    		<div className="mt-3 stock-category" id={this.props.customProps.category}>
		    			{ !this.props.customProps.isShowAll &&
		    				<div className="text-dark"><h6 class="my-0 ml-2 category-title">{this.props.customProps.category}</h6></div>
			    		}


						<ToolkitProvider
						  keyField="symbol"
						  data={ this.props.tableProps.products }
						  columns={ this.props.tableProps.columns }
						  search
						>
						  {
						    props => (
						      <div>
						       	{ this.props.customProps.showSearch &&
							      	<div autoComplete="off">
                        <form autoComplete="off">
							        	<SearchBar { ...props.searchProps } />
                        </form>
							        </div>
						    	}
						        <BootstrapTable bootstrap4={true} classes="table-responsive"
						          { ...props.baseProps } {...(this.props.tableProps.products.length > 10 && { pagination: pagination })}
						          rowStyle={ { height: '5px' } }
						        />
						      </div>
						    )
						  }
						</ToolkitProvider>
					</div>

				</div>
	    );
  }
}

export default Table;
