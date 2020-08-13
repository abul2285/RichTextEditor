import React, { Component } from "react";
import { EditorState, RichUtils, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createInlineToolbarPlugin, {
  Separator,
} from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  SubButton,
  SupButton,
  createInlineStyleButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
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

  handleUpdate = (editorState) => {
    // updates state from onChange event
    this.setState({
      ...this.state,
      editorState,
    });
  };

  toggleMinify = () => {
    const { minify } = this.state;
    this.setState({ minify: !minify });
  };

  handleInlineStyleUpdate = (command) => {
    const { editorState } = this.state;
    this.handleUpdate(RichUtils.toggleInlineStyle(editorState, command));
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
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <Separator {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                  <BlockquoteButton {...externalProps} />
                  <SubButton {...externalProps} />
                  <SupButton {...externalProps} />
                  <CodeBlockButton {...externalProps} />
                  <linkPlugin.LinkButton {...externalProps} />
                  <StrikeThroughButton {...externalProps} />
                </div>
              )
            }
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
