CKEDITOR.plugins.add('tweetabletext', {
  icons: 'tweetabletext',
  beforeInit: function () {
    
  },

  init: function(editor) {
    editor.addCommand('tweetabletext', new CKEDITOR.dialogCommand('tweetabletextDialog'));
    editor.addCommand('untweetabletext', new CKEDITOR.unlinkCommand());

    editor.ui.addButton('TweetableText', {
  	  label: 'Insert TweetableText',
  	  command: 'tweetabletext',
  	  toolbar: 'insert'
  	});

    if (editor.contextMenu) {
      editor.addMenuGroup('tweetabletextGroup');

      editor.addMenuItems({
        tweetabletextItem: {
          label: 'Edit TweetableText',
          icon: this.path + 'icons/tweetabletext.png',
          command: 'tweetabletext',
          group: 'tweetabletextGroup' 
        },
        unTweetabletextItem: {
          label: 'Remove TweetableText',
          icon: this.path + 'icons/tweetabletext.png',
          command: 'untweetabletext',
          group: 'tweetabletextGroup' 
        },

      });

      editor.contextMenu.addListener(function(element) {
          if (element.getAttribute('class') === 'tweetabletext') {
            return { tweetabletextItem: CKEDITOR.TRISTATE_OFF, unTweetabletextItem: CKEDITOR.TRISTATE_OFF,};
          }
      });
    }

    CKEDITOR.dialog.add('tweetabletextDialog', this.path + 'dialogs/tweetabletext.js');

    if (typeof editor.config.contentsCss === 'object') {
      editor.config.contentsCss.push(CKEDITOR.getUrl(this.path + 'css/tweetabletext.css'));
    }
  }
});

// This part was getting from http://ckeditor.com/addon/link.
CKEDITOR.unlinkCommand = function() {};
CKEDITOR.unlinkCommand.prototype = {
  exec: function(editor) {
    var style = new CKEDITOR.style({
      element: 'a', 
      type: CKEDITOR.STYLE_INLINE, 
      alwaysRemoveElement: 1 
    });

    editor.removeStyle(style);
  },

  refresh: function(editor, path) {  
    var element = path.lastElement && path.lastElement.getAscendant('a', true);
    if (element && element.getName() === 'a' && element.getAttribute('href') && element.getChildCount()) {
      this.setState(CKEDITOR.TRISTATE_OFF);
    }
    else {
      this.setState(CKEDITOR.TRISTATE_DISABLED);
    }
  },

  contextSensitive: 1,
  startDisabled: 1,
  requiredContent: 'a[href]'
};
  