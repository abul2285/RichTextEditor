import React, { Component } from "react";
import { EditorState, RichUtils, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import clearFormatting from "./clearFormat";
import createInlineToolbarPlugin, {
  Separator,
} from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  createInlineStyleButton,
  SubButton,
  SupButton,
  UnorderedListButton,
  OrderedListButton,
} from "draft-js-buttons";

import "draft-js/dist/Draft.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "./style.css";

const linkPlugin = createLinkPlugin();

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, linkPlugin];

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
  SUBSCRIPT: { fontSize: "0.6em", verticalAlign: "sub" },
  SUPERSCRIPT: { fontSize: "0.6em", verticalAlign: "super" },
};

let StrikeThroughButton = createInlineStyleButton({
  style: "STRIKETHROUGH",
  children: (
    <div
      className="SupButton-button ToolbarButton-button"
      style={{ margin: "0 0 10px 0", fontSize: "24px" }}
    >
      <del>s</del>
    </div>
  ),
});

let ClearButton = (props) => {
  const clearFormattingValue = () => {
    const editorState = props.getEditorState();
    const newEditorState = clearFormatting(editorState);
    props.setEditorState(newEditorState);
  };

  const preventMouseDown = (e) => e.preventDefault();
  return (
    <div
      className="SupButton-button ToolbarButton-button"
      style={{
        margin: "0 0 10px 0",
        fontSize: "24px",
        display: "inline-block",
        padding: "3px",
        cursor: "default",
        backgroundColor: "#eee",
      }}
      onClick={clearFormattingValue}
      onMouseDown={(e) => preventMouseDown(e)}
    >
      <span>&#9986;</span>
    </div>
  );
};

class DraftJSTextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      minify: false,
    };

    this.focus = this.focus.bind(this);
    this.onChange = (editorState) => this.setState({ editorState });
  }

  focus() {
    this.editor.focus();
  }

  toggleMinify = () => {
    const { minify } = this.state;
    this.setState({ minify: !minify });
  };

  render() {
    const { editorState, minify } = this.state;
    return (
      <div>
        <h1>DraftJS Text Editor</h1>
        <div className="editor" onClick={this.focus}>
          <Editor
            onBlur={this.blur}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            customStyleMap={styleMap}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
            onTab={this.onTab}
          />
          <InlineToolbar>
            {(externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <StrikeThroughButton {...externalProps} />
                <Separator {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <SubButton {...externalProps} />
                <SupButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
                <ClearButton {...externalProps} />
              </div>
            )}
          </InlineToolbar>
        </div>
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
        <pre>
          {JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
            null,
            minify ? 0 : 2
          )}
        </pre>
      </div>
    );
  }
}

export default DraftJSTextEditor;
