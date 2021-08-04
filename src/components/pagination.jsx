import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  checkIfActive(selectedPage, page) {
    if (selectedPage === page) {
      return "page-item active";
    } else {
      return "page-item";
    }
  }

  render() {
    const noOfPages = Math.ceil(this.props.totalCount / this.props.pageSize);
    const pages = _.range(1, noOfPages + 1);
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pages.map((page) => (
            <li
              key={page}
              className={this.checkIfActive(this.props.selectedPage, page)}
            >
              <a
                className="page-link"
                onClick={() => this.props.onSelect(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Pagination;
