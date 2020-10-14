import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiContext from "../APIContext";
import config from "../config";
import "./Note.css";
import PropTypes from "prop-types";

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
    id: "0",
    name: "Default Note",
    modified: new Date(),
  };
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
  };
  static contextType = ApiContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { name, id } = this.props;
    const modified = new Date(this.props.modified);
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon="trash-alt" />
          {""}
          remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified <span className="Date">{modified.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
}
