(function(root, factory) {
  // commonjs
  if (typeof exports === 'object') {
    factory(function(VanillaToasts) {
      module.exports = VanillaToasts;
    });
  // global
  } else {
    factory(function(VanillaToasts) {
      root.VanillaToasts = VanillaToasts;
    });
  }
})(this, function(ready) {

  // We need DOM to be ready
  if (document.readyState === 'complete') {
    init(ready);
  } else {
    window.addEventListener('DOMContentLoaded', function() {
      init(ready);
    });
  }

  // Initialize library
  function init(ready) {

    // Toast container
    var container = document.createElement('div');
    container.id = 'vanillatoasts-container';
    document.body.appendChild(container);


    var VanillaToasts = {};
    var autoincrement = 0;

    VanillaToasts.create = function(options) {
      var toast = document.createElement('div');
      toast.id = ++autoincrement;
      toast.id = 'toast-' + toast.id;
      toast.className = 'vanillatoasts-toast';

      // title
      if (options.title) {
        var h4 = document.createElement('h4');
        h4.className = 'vanillatoasts-title';
        h4.innerHTML = options.title;
        toast.appendChild(h4);
      }

      // text
      if (options.text) {
        var p = document.createElement('p');
        p.className = 'vanillatoasts-text';
        p.innerHTML = options.text;
        toast.appendChild(p);
      }

      // icon
      if (options.icon) {
        var img = document.createElement('img');
        img.src = options.icon;
        img.className = 'vanillatoasts-icon';
        toast.appendChild(img);
      }

      // click callback
      if (typeof options.callback === 'function') {
        toast.addEventListener('click', options.callback);
      }

      // toast api
      toast.hide = function() {
        toast.className += ' vanillatoasts-fadeOut';
        toast.addEventListener('animationend', removeToast, false);
      };

      // autohide
      if (options.timeout) {
        setTimeout(toast.hide, options.timeout);
      }

      if (options.type) {
        toast.className += ' vanillatoasts-' + options.type;
      }

      toast.addEventListener('click', toast.hide);


      function removeToast() {
        document.getElementById('vanillatoasts-container').removeChild(toast);
      }

      document.getElementById('vanillatoasts-container').appendChild(toast);
      return toast;

    };

    ready(VanillaToasts);

  }

});
