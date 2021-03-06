import React, { Component } from "react";
import config from "../config";
import ApiContext from "../APIContext";
import "./AddFolder.css";

export default class AddFolder extends Component {
  static contextType = ApiContext;

  addFolder = (name) => {
    fetch(`${config.API_ENDPOINT}/folders/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_TOKEN}`,
      },
      body: JSON.stringify({ name }),
    })
      .then((resp) => resp.json())
      .then((data) => this.context.addFolder(data))
      .catch((error) => {
        console.error(error);
      });
  };

  handleSubmit(event) {
    event.preventDefault();
    const newFolder = event.target.newFolder.value;
    this.addFolder(newFolder);
    this.props.history.goBack();
  }

  updateFolderName(e) {
    const newName = e.target.value;
    this.context.updateNewFolderName(newName);
  }

  validateFolderName() {
    if (this.context.newFolder.name.trim() === 0) {
      return "There must be more than 0 characters, please add a name.";
    } else if (this.context.newFolder.name.trim().length <= 3) {
      return "Folder name must be more than three characters, please lengthen name.";
    }
  }

  render() {
    return (
      <>
        <header>
          <h2>Add a New Folder</h2>
        </header>
        <form
          className="add-folder-form"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <label>
            Name:
            {this.context.newFolder.touched && (
              <p>{this.validateFolderName()}</p>
            )}
          </label>
          <input
            type="text"
            name="newFolder"
            placeholder="Folder name here!"
            id="newFolder"
            required
            aria-required="true"
            aria-label="Name"
            onChange={(e) => this.updateFolderName(e)}
          />
          <button
            className="new-folder-btn"
            type="submit"
            disabled={this.validateFolderName()}
          >
            Submit New Folder
          </button>
        </form>
      </>
    );
  }
}
