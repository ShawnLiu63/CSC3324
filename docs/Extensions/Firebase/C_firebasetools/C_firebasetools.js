var gdjs;
(function(gdjs2) {
  gdjs2.evtTools.firebase = {};
  gdjs2.evtTools.firebase.onAppCreated = [];
  gdjs2.registerFirstRuntimeSceneLoadedCallback(function(runtimeScene) {
    let firebaseConfig;
    try {
      firebaseConfig = JSON.parse(runtimeScene.getGame().getExtensionProperty("Firebase", "FirebaseConfig"));
    } catch (e) {
      console.error("The Firebase configuration is invalid! Error: " + e);
      return;
    }
    firebase.initializeApp(firebaseConfig);
    for (let func of gdjs2.evtTools.firebase.onAppCreated) {
      func();
    }
  });
})(gdjs || (gdjs = {}));
//# sourceMappingURL=C_firebasetools.js.map
