/*
 * @author: Farahmand Moslemi
*/
import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.defaultTextValue = "# Heading 1\n## Heading 2\n**Bold**, *Italic*, `Inline code` & ~~Strikethrough~~\n";
    this.defaultTextValue += "```javascript\nvar test = function() {\n    console.log('My name is Farahmand Moslemi.');\n}";
    this.defaultTextValue += "```\n[This is my Gitlab page](https://farahmandm.github.io/ \"Farahmand's Gitlab Page\")!\n\n    /* Another\n     * multi-line\n     * code\n     */\n";
    this.defaultTextValue += "1. first\n2. second\n * inner bullet\n\n\n* list item 1\n* list item 2\n 1. inner list item";
    this.state = {previewText: this.defaultTextValue};
  }
  setPreview(e) {
    this.setState({previewText: e.target.value});
  }

  render() {
    return (
      <div className="container">
        <div id="textboxWrapper">
          <textarea rows="30" defaultValue={this.defaultTextValue} onChange={this.setPreview.bind(this)} spellCheck="false" />
        </div>
        <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.previewText)}} >
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
