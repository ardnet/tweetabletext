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
            id: 'displaytext',
            label: 'Display Text',
            validate: CKEDITOR.dialog.validate.notEmpty('Display Text field can not be empty.'),
            setup: function(element) {
              this.setValue(element.getText());

            },
            commit: function(element) {
              element.setText(this.getValue());

            }
          },
          {
            type: 'text',
            id: 'tweetabletext',
            label: 'Tweetable Text',
            validate: CKEDITOR.dialog.validate.notEmpty('Tweetable Text field can not be empty.'),
            setup: function(element) {
              var splitURL = element.getAttribute('href').split("?");
              var dataTweet = splitURL[1].split("=");
              var decodedDataTweet = decodeURI(dataTweet[1]);
              this.setValue(decodedDataTweet);

            },
            commit: function(element) {
              var twitterBaseUrl = 'http://twitter.com/intent/tweet?';
              var encodedValue = encodeURI(this.getValue());
              twitterBaseUrl += 'text=' + encodedValue;
              element.setAttribute('href', twitterBaseUrl);

              // For some reason, without doing this the changes won't be reflected on frontend.
              element.setAttribute('data-cke-saved-href', twitterBaseUrl);
            }
          }
        ]
      }
    ],

    onShow: function() {
      var selection = editor.getSelection();
      var element = selection.getStartElement();

      if (element.getAttribute('class') !== 'tweetabletext') {
        element = editor.document.createElement('a');
        this.insertMode = true;
      }
      else {  
        this.insertMode = false;
      }

      this.element = element;
      if (!this.insertMode) {
        this.setupContent(this.element);
      }
    },

    onOk: function() {
      var dialog = this;
      var retrieveElement = this.element;

      var getDisplayText = dialog.getValueOf('tab-basic', 'displaytext');
      var getTweetableText = dialog.getValueOf('tab-basic', 'tweetabletext');
      var getTweetableText = encodeURI(getTweetableText);

      var twitterBaseUrl = 'http://twitter.com/intent/tweet?';
      var tweetabletext = editor.document.createElement('a');
      tweetabletext.setAttribute('class', 'tweetabletext');

      twitterBaseUrl += 'text=' + getTweetableText;
      tweetabletext.setAttribute('href', twitterBaseUrl);
      tweetabletext.setText(getDisplayText);

      this.commitContent(retrieveElement);

      if (this.insertMode) {
        editor.insertElement(tweetabletext);
      }
    }
  };
});
