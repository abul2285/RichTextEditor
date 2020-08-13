import React, { Component } from "react";
import SimpleInlineToolbarEditor from "./DraftJSTextEditor";
import Editor from "./QuillTextEditor";

class App extends Component {
  state = {
    quill: true,
  };
  render() {
    const { quill } = this.state;
    return (
      <>
        <button
          onClick={() => this.setState({ quill: !quill })}
          style={{
            fontSize: "20px",
            padding: "10px 20px",
            margin: "50px",
            cursor: "pointer",
            backgroundColor: "green",
            color: "white",
          }}
        >
          {quill ? "Draft Text Editor" : "Quill Text Editor"}
        </button>
        <div
          style={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100%",
            padding: "50px",
            width: "100%",
            fontSize: "24px",
          }}
        >
          <div style={{ width: "1000px" }}>
            {quill ? <Editor /> : <SimpleInlineToolbarEditor />}
          </div>
        </div>
      </>
    );
  }
}

export default App;
