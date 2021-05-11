var gdjs;
(function(gdjs2) {
  gdjs2.evtTools.firebase.firestore = {};
  gdjs2.evtTools.firebase.firestore.writeDocument = function(collectionName, variableName, variable, callbackStateVariable) {
    firebase.firestore().collection(collectionName).doc(variableName).set(JSON.parse(gdjs2.evtTools.network.variableStructureToJSON(variable))).then(function() {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.writeField = function(collectionName, documentName, field, value, callbackStateVariable, merge) {
    merge = merge == void 0 ? true : merge;
    const updateObject = {};
    updateObject[field] = value;
    firebase.firestore().collection(collectionName).doc(documentName).set(updateObject, {merge}).then(function() {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.updateDocument = function(collectionName, variableName, variable, callbackStateVariable) {
    firebase.firestore().collection(collectionName).doc(variableName).update(JSON.parse(gdjs2.evtTools.network.variableStructureToJSON(variable))).then(function() {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.updateField = function(collectionName, documentName, field, value, callbackStateVariable) {
    const updateObject = {};
    updateObject[field] = value;
    firebase.firestore().collection(collectionName).doc(documentName).update(updateObject).then(function() {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.deleteDocument = function(collectionName, documentName, callbackStateVariable) {
    firebase.firestore().collection(collectionName).doc(documentName).delete().then(function() {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.deleteField = function(collectionName, documentName, field, callbackStateVariable) {
    const updateObject = {};
    updateObject[field] = firebase.firestore.FieldValue.delete();
    firebase.firestore().collection(collectionName).doc(documentName).update(updateObject).then(function() {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.getDocument = function(collectionName, documentName, callbackValueVariable, callbackStateVariable) {
    firebase.firestore().collection(collectionName).doc(documentName).get().then(function(doc) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
      if (callbackValueVariable) {
        gdjs2.evtTools.network._objectToVariable(doc.data(), callbackValueVariable);
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.getField = function(collectionName, documentName, field, callbackValueVariable, callbackStateVariable) {
    firebase.firestore().collection(collectionName).doc(documentName).get().then(function(doc) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
      if (callbackValueVariable) {
        gdjs2.evtTools.network._objectToVariable(doc.get(field), callbackValueVariable);
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.hasDocument = function(collectionName, documentName, callbackValueVariable, callbackStateVariable) {
    firebase.firestore().collection(collectionName).doc(documentName).get().then(function(doc) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
      if (callbackValueVariable) {
        callbackValueVariable.setString(doc.exists ? "true" : "false");
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.hasField = function(collectionName, documentName, field, callbackValueVariable, callbackStateVariable) {
    firebase.firestore().collection(collectionName).doc(documentName).get().then(function(doc) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
      if (callbackValueVariable) {
        callbackValueVariable.setString(doc.get(field) === void 0 ? "false" : "true");
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.firestore.listDocuments = function(collectionName, callbackValueVariable, callbackStateVariable) {
    firebase.firestore().collection(collectionName).get().then(function(snapshot) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(snapshot.empty ? "empty" : "ok");
      }
      if (callbackValueVariable) {
        gdjs2.evtTools.network._objectToVariable(snapshot.docs.map((doc) => doc.id), callbackValueVariable);
      }
    }).catch(function(error) {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
})(gdjs || (gdjs = {}));
//# sourceMappingURL=D_cloudfirestoretools.js.map
