CKEDITOR.plugins.add('tweetabletext', {
  icons: 'tweetabletext',
  beforeInit: function () {
    
  },

  init: function(editor) {
    editor.addCommand('tweetabletext', new CKEDITOR.dialogCommand('tweetabletextDialog'));
    editor.ui.addButton('TweetableText', {
	  label: 'Insert TweetableText',
	  command: 'tweetabletext',
	  toolbar: 'insert'
	});

    if (editor.contextMenu) {
      editor.addMenuGroup('tweetabletextGroup');
      editor.addMenuItem('tweetabletextItem', {
        label: 'Edit TweetableText',
        icon: this.path + 'icons/tweetabletext.png',
        command: 'tweetabletext',
        group: 'tweetabletextGroup'
      });

      editor.contextMenu.addListener(function(element) {
          return {tweetabletextItem: CKEDITOR.TRISTATE_OFF};
      });
    }

    CKEDITOR.dialog.add('tweetabletextDialog', this.path + 'dialogs/tweetabletext.js');

    if (typeof editor.config.contentsCss === 'object') {
      editor.config.contentsCss.push(CKEDITOR.getUrl(this.path + 'css/tweetabletext.css'));
    }
  }
});