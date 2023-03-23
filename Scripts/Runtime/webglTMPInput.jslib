mergeInto(LibraryManager.library, {

  TextToWeb: function(single, str, start, end) {
    var input = document.getElementById((single)?'webglTMPInput':'weblglTMPInputML');
    if (input == null)
    {
      var input = document.createElement((single)?'input':'textarea');
      input.setAttribute('id',(single)?'webglTMPInput':'weblglTMPInputML');
      instance.setAttribute('input',(single)?'webglTMPInput':'weblglTMPInputML');
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
      input.addEventListener('click',function (e) { this.focus(); instance.setAttribute('instance',(this.getAttribute('id')?'webglTMPInput':'weblglTMPInputML')); });
      instance.addEventListener('click',function (e) { 
        switch (instance.getAttribute('input'))
        {
          case 'webglTMPInput': 
            document.getElementById('webglTMPInput').focus();
            break;
          case 'webglTMPInputML':
            document.getElementById('webglTMPInputML').focus();
            break;
          default: break;
        }  
      });
      document.body.append(input);
    }
    input.value = UTF8ToString(str);
    input.selectionStart = start;
    input.selectionEnd = end;
    input.focus();
    input.click();
  },
  ReleaseFocus: function(){
    instance.setAttribute('input','');
    var s = document.getElementById('webglTMPInput');
    if (s != null) s.blur();
    var m = document.getElementById('webglTMPInputML');
    if (m != null) m.blur();
  },

});