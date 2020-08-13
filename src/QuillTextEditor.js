import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./style.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", content: null, minify: false };
    this.handleChange = this.handleChange.bind(this);
    this.showEditor = this.showEditor.bind(this);
  }

  componentDidMount() {
    this.bubbleToolBar.editor.root.innerHTML = "<p>test paragraph</p>";
  }

  handleChange(value) {
    console.log(this);
    const { ops } = this.bubbleToolBar.editor.editor.delta;
    this.setState({ ...this.state, content: ops, text: value });
  }

  toggleMinify = () => {
    const { minify } = this.state;
    this.setState({ minify: !minify });
  };

  showEditor() {
    let editorTooltip = this.bubbleToolBar.editingArea.childNodes[2];
    editorTooltip.classList.remove("ql-hidden");
  }

  render() {
    const { content, minify } = this.state;
    return (
      <div>
        <h1>QuillJS Text Editor</h1>
        <ReactQuill
          ref={(toolbar) => {
            this.bubbleToolBar = toolbar;
          }}
          className="textarea"
          theme="bubble"
          value={this.state.text}
          modules={Editor.modules}
          defaultValue={"some text"}
          placeholder={"Type something here..."}
          onChange={this.handleChange}
        />
        {/* <hr /> */}
        <h1>Editor contents in Delta JSON format</h1>
        <button
          onClick={this.toggleMinify}
          style={{
            fontSize: "20px",
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          {minify ? "Beautify" : "Minify"}
        </button>
        <pre>{JSON.stringify(content, null, minify ? 0 : 2)}</pre>
      </div>
    );
  }
}

Editor.modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
    handlers: {
      link: function (value) {
        if (value) {
          var href = prompt("Enter the URL");
          this.quill.format("link", href);
        } else {
          this.quill.format("link", false);
        }
      },
    },
  },
};

export default Editor;
