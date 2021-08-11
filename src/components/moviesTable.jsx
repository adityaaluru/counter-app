import React, { Component } from "react";
import Likes from "./likes";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  render() {
    const { moviesToShow, onLike, onDelete } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {moviesToShow.map((item) => (
            <tr key={item._id}>
              <td>
                <Link to={"/movies/" + item._id}>{item.title}</Link>
              </td>
              <td>{item.genre.name}</td>
              <td>{item.numberInStock}</td>
              <td>{item.dailyRentalRate}</td>
              <td>
                <Likes
                  id={item._id}
                  likeState={item.likedState}
                  onLiked={onLike}
                />
              </td>
              <td>
                <button
                  onClick={() => onDelete(item)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
