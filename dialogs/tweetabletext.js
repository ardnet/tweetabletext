CKEDITOR.dialog.add('tweetabletextDialog', function(editor) {
  return {
    title: 'TweetableText Properties',
    minWidth: 400,
    minHeight: 200,
    contents: [
      {
        id: 'tab-basic',
        label: 'Basic Settings',
        elements: [
          {
            type: 'text',
            id: 'tweetabletext',
            label: 'Tweetable Text',
            validate: CKEDITOR.dialog.validate.notEmpty('Tweetable Text field can not be empty.'),
            setup: function(element) {
              this.setValue(element.getText());
            },
            commit: function(element) {
              element.setText(this.getValue());
            }
          }
        ]
      }
    ],

    onShow: function() {
      var dialog = this;
      var selection = editor.getSelection();
      var element = selection.getStartElement();
      var selectedText;

      /**
       * get selected text and workaround for ie
       */
      if(CKEDITOR.env.ie) {
        selection.unlock(true);
        selectedText = selection.getNative().createRange().text;
      } else {
        selectedText = selection.getNative();
      }

      /**
       * selected text will be in field
       */
      dialog.setValueOf('tab-basic', 'tweetabletext', selectedText);

      if (element) {
        element = element.getAscendant('tweettxt', true);
      }
      if (!element || element.getName() !== 'tweettxt') {
        element = editor.document.createElement('tweettxt');
        this.insertMode = true;
      } else {
        this.insertMode = false;
      }

      if (!this.insertMode) {
        this.setupContent(element);
      }
    },

    onOk: function() {
      var dialog = this;
      var textParam = dialog.getValueOf('tab-basic', 'tweetabletext');
      var textToRemove = editor.getSelection().getRanges()[0];
      var tweetabletext = editor.document.createElement('tweettxt');
      var linkabletweet = editor.document.createElement('a');
      var twitterBaseUrl = 'http://twitter.com/intent/tweet?';

      /**
       * Building url for twitter
       */
      twitterBaseUrl += 'text=' + textParam;
      
      /**
       * Replace selected text to tweetabletext.
       */
      textToRemove.deleteContents();
      textToRemove.select()
      linkabletweet.setAttribute('class', 'tweetabletext');
      linkabletweet.setAttribute('href', twitterBaseUrl);
      linkabletweet.setText(textParam);
      linkabletweet.append('span');
      editor.insertElement(linkabletweet);
    }
  };
});
