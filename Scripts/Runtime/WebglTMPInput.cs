using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using System.Runtime.InteropServices;

namespace CodySource
{
    [RequireComponent(typeof(TMP_InputField))]
    public class WebglTMPInput : MonoBehaviour
    {

        #region PROPERTIES

        public static WebglTMPInput focus = null;
        private static WebglTMPInput _instance;

        private TMP_InputField _input;
        private bool _isSelecting = false;
        private int _posCache = -1;

        #endregion

        #region PUBLIC METHODS

        [DllImport("__Internal")]
        private static extern void TextToWeb(bool pIsSingleLine, string pStr, int pStart, int pEnd);

        [DllImport("__Internal")]
        private static extern void ReleaseFocus();

        public void TextFromWeb(string pJSON)
        {
            JSONInputData data = JsonUtility.FromJson<JSONInputData>(pJSON);
            Debug.Log(pJSON);
            if (focus == null)
            {
                ReleaseFocus();
                return;
            }
            if (data.value != focus._input.text) focus._input.text = data.value;
            if (!_isSelecting)
            {
                focus._input.Select();
                focus._input.SetTextWithoutNotify(data.value.Substring(0, data.start));
                focus._input.MoveTextEnd(false);
                focus._input.SetTextWithoutNotify(data.value);
                focus._input.ActivateInputField();
            }
        }

        #endregion

        #region PRIVATE METHODS

        /// <summary>
        /// Get the asttached component
        /// </summary>
        private void Start()
        {
            if (_instance == null)
            {
                GameObject obj = new GameObject();
                obj.name = "WebglTMPInput";
                _instance = obj.AddComponent<WebglTMPInput>();
            }
            _input = GetComponent<TMP_InputField>();
            _input.onSelect.AddListener(e => focus = this);
            _input.onEndTextSelection.AddListener((str, start, end) => { 
                focus = this;
                _isSelecting = false;
            });
            _input.onTextSelection.AddListener((str, start, end) => {
                focus = this; 
                _isSelecting = true;
                TextToWeb(!_input.multiLine, _input.text, start, end); 
            });
            _input.onDeselect.AddListener(e => { 
                focus = null;
                _isSelecting = false;
                _posCache = -1;
                ReleaseFocus(); 
            });
        }

        /// <summary>
        /// Update the input caret position to match in the event the user has placed it somewhere else
        /// </summary>
        private void Update()
        {
            if (focus != this) return;
            if (!_isSelecting && _input.caretPosition != _posCache)
            {
                _posCache = _input.caretPosition;
                TextToWeb(!_input.multiLine, _input.text, _posCache, _posCache);
            }
        }

        #endregion

        #region PUBLIC STRUCTS

        [System.Serializable]
        public struct JSONInputData
        {
            public string value;
            public int start;
            public int end;
        }

        #endregion

    }
}