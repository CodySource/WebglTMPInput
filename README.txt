To configure and use this package correctly. You must create a custom webgl Template and export using that from your project settings.

Within the template's javascript code, you will need to create a variable named "instance". This variable will need to be set as a reference to the UnityInstance created by the javascript promise.

From there, apply the provided CS component onto any TMP Input Field Object. No other other setup is necessary.

Here is an example based on Unity's current template code:

var instance = null;
var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
createUnityInstance(canvas, config, (progress) => {
  actualProgress = progress;
}).then((unityInstance) => {
  instance = unityInstance;
}).catch((message) => {
  alert(message);
});
};
UpdateCanvas();