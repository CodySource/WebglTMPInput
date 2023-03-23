mergeInto(LibraryManager.library, {

  TextToWeb: function(single, str, start, end) {
    var input = document.getElementById((single)?'webglTMPInput':'webglTMPInputML');
    var uCanvas = document.getElementById('unity-canvas');
    if (input == null)
    {      
      var input = document.createElement((single)?'input':'textarea');
      input.setAttribute('id',(single)?'webglTMPInput':'webglTMPInputML');
      uCanvas.setAttribute('input',(single)?'webglTMPInput':'webglTMPInputML');
      Object.assign(input.style,{position:'absolute',right:'-100%',top:'-100%'});
      input.addEventListener('input', function (t) { 
        if (this === document.activeElement) {
          instance.SendMessage('WebglTMPInput', 'TextFromWeb', 
          JSON.stringify({
            value:input.value,
            start:input.selectionStart,
            end:input.selectionEnd})); 
        }
      });
      input.addEventListener('click',function (e) { this.focus(); });
      uCanvas.addEventListener('click',function (e) { 
        var cTimeout = setTimeout(function() {
          switch (uCanvas.getAttribute('input'))
          {
            case 'webglTMPInput': 
              document.getElementById('webglTMPInput').focus();
              break;
            case 'webglTMPInputML':
              document.getElementById('webglTMPInputML').focus();
              break;
            default: break;
          }  
          clearTimeout(cTimeout);
        }, 300);
      });
      document.body.append(input);
    }
    uCanvas.setAttribute('input',(this.getAttribute('id')?'webglTMPInput':'webglTMPInputML'));
    input.value = UTF8ToString(str);
    input.selectionStart = start;
    input.selectionEnd = end;
    input.focus();
    input.click();
  },
  ReleaseFocus: function(){
    var uCanvas = document.getElementById('unity-canvas');
    uCanvas.setAttribute('input','');
    var s = document.getElementById('webglTMPInput');
    if (s != null) s.blur();
    var m = document.getElementById('webglTMPInputML');
    if (m != null) m.blur();
  },

});