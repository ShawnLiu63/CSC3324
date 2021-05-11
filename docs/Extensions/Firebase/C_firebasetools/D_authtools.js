var gdjs;
(function(gdjs2) {
  gdjs2.evtTools.firebase.auth = {
    providersList: {
      google: firebase.auth.GoogleAuthProvider,
      facebook: firebase.auth.FacebookAuthProvider,
      github: firebase.auth.GithubAuthProvider,
      twitter: firebase.auth.TwitterAuthProvider
    },
    authentified: false,
    currentUser: null,
    _token: "",
    _currentProvider: null
  };
  gdjs2.evtTools.firebase.auth.userManagement = {
    dangerous: {
      changeEmail(oldEmail, password, newEmail, sendVerificationEmail, callbackStateVariable) {
        sendVerificationEmail = sendVerificationEmail || true;
        let credential = firebase.auth.EmailAuthProvider.credential(oldEmail, password);
        let updater = sendVerificationEmail ? gdjs2.evtTools.firebase.auth.currentUser.updateEmail : gdjs2.evtTools.firebase.auth.currentUser.verifyBeforeUpdateEmail;
        gdjs2.evtTools.firebase.auth.currentUser.reauthenticateWithCredential(credential).then(() => updater(newEmail)).then(() => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString("ok");
          }
        }).catch((error) => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString(error.message);
          }
        });
      },
      changePassword(email, oldPassword, newPassword, callbackStateVariable) {
        let credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword);
        gdjs2.evtTools.firebase.auth.currentUser.reauthenticateWithCredential(credential).then(() => gdjs2.evtTools.firebase.auth.currentUser.updatePassword(newPassword)).then(() => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString("ok");
          }
        }).catch((error) => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString(error.message);
          }
        });
      },
      deleteUser(email, password, callbackStateVariable) {
        let credential = firebase.auth.EmailAuthProvider.credential(email, password);
        gdjs2.evtTools.firebase.auth.currentUser.reauthenticateWithCredential(credential).then(() => gdjs2.evtTools.firebase.auth.currentUser.delete()).then(() => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString("ok");
          }
        }).catch((error) => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString(error.message);
          }
        });
      },
      changeEmailProvider(newEmail, sendVerificationEmail, callbackStateVariable) {
        let updater = sendVerificationEmail ? gdjs2.evtTools.firebase.auth.currentUser.updateEmail : gdjs2.evtTools.firebase.auth.currentUser.verifyBeforeUpdateEmail;
        gdjs2.evtTools.firebase.auth.currentUser.reauthenticateWithPopup(gdjs2.evtTools.firebase.auth._currentProvider).then(() => updater(newEmail)).then(() => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString("ok");
          }
        }).catch((error) => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString(error.message);
          }
        });
      },
      changePasswordProvider(newPassword, callbackStateVariable) {
        gdjs2.evtTools.firebase.auth.currentUser.reauthenticateWithPopup(gdjs2.evtTools.firebase.auth._currentProvider).then(() => gdjs2.evtTools.firebase.auth.currentUser.updatePassword(newPassword)).then(() => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString("ok");
          }
        }).catch((error) => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString(error.message);
          }
        });
      },
      deleteUserProvider(callbackStateVariable) {
        gdjs2.evtTools.firebase.auth.currentUser.reauthenticateWithPopup(gdjs2.evtTools.firebase.auth._currentProvider).then(() => gdjs2.evtTools.firebase.auth.currentUser.delete()).then(() => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString("ok");
          }
        }).catch((error) => {
          if (typeof callbackStateVariable !== "undefined") {
            callbackStateVariable.setString(error.message);
          }
        });
      }
    },
    isEmailVerified() {
      return gdjs2.evtTools.firebase.auth.currentUser.emailVerified;
    },
    getEmail() {
      return gdjs2.evtTools.firebase.auth.currentUser.email || "";
    },
    getCreationTime() {
      return gdjs2.evtTools.firebase.auth.currentUser.metadata.creationTime || "";
    },
    getLastLoginTime() {
      return gdjs2.evtTools.firebase.auth.currentUser.metadata.lastSignInTime || "";
    },
    getDisplayName() {
      return gdjs2.evtTools.firebase.auth.currentUser.displayName || "";
    },
    getPhoneNumber() {
      return gdjs2.evtTools.firebase.auth.currentUser.phoneNumber || "";
    },
    getUID() {
      return gdjs2.evtTools.firebase.auth.currentUser.uid || "";
    },
    getTenantID() {
      return gdjs2.evtTools.firebase.auth.currentUser.tenantId || "";
    },
    getRefreshToken() {
      return gdjs2.evtTools.firebase.auth.currentUser.refreshToken || "";
    },
    getPhotoURL() {
      return gdjs2.evtTools.firebase.auth.currentUser.photoURL || "";
    },
    setDisplayName(newDisplayName) {
      gdjs2.evtTools.firebase.auth.currentUser.updateProfile({
        displayName: newDisplayName
      });
    },
    setPhotoURL(newPhotoURL) {
      gdjs2.evtTools.firebase.auth.currentUser.updateProfile({
        photoURL: newPhotoURL
      });
    },
    sendVerificationEmail() {
      gdjs2.evtTools.firebase.auth.currentUser.sendEmailVerification();
    }
  };
  gdjs2.evtTools.firebase.auth.token = function() {
    this.currentUser.getIdToken().then((token) => gdjs2.evtTools.firebase.auth._token = token);
    return this._token;
  };
  gdjs2.evtTools.firebase.auth.isAuthentified = function() {
    return gdjs2.evtTools.firebase.auth.authentified;
  };
  gdjs2.evtTools.firebase.auth.signInWithEmail = function(email, password, callbackStateVariable) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch((error) => {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.auth.createAccountWithEmail = function(email, password, callbackStateVariable) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch((error) => {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.auth.anonymSignIn = function(callbackStateVariable) {
    firebase.auth().signInAnonymously().then(() => {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch((error) => {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.auth.signInWithProvider = function(providerName, callbackStateVariable) {
    let providerCtor = gdjs2.evtTools.firebase.auth.providersList[providerName];
    gdjs2.evtTools.firebase.auth._currentProvider = new providerCtor();
    firebase.auth().signInWithPopup(gdjs2.evtTools.firebase.auth._currentProvider).then(() => {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString("ok");
      }
    }).catch((error) => {
      if (typeof callbackStateVariable !== "undefined") {
        callbackStateVariable.setString(error.message);
      }
    });
  };
  gdjs2.evtTools.firebase.onAppCreated.push(function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        gdjs2.evtTools.firebase.auth.authentified = true;
        gdjs2.evtTools.firebase.auth.currentUser = user;
        user.getIdToken().then((token) => gdjs2.evtTools.firebase.auth._token = token);
      } else {
        gdjs2.evtTools.firebase.auth.authentified = false;
        gdjs2.evtTools.firebase.auth.currentUser = null;
      }
    });
  });
})(gdjs || (gdjs = {}));
//# sourceMappingURL=D_authtools.js.map
