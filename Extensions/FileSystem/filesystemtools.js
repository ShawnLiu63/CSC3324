var gdjs;
(function(gdjs2) {
  let fileSystem;
  (function(fileSystem2) {
    fileSystem2._path = null;
    fileSystem2._fs = null;
    fileSystem2._getPath = function() {
      if (!gdjs2.fileSystem._path) {
        gdjs2.fileSystem._path = typeof require !== "undefined" ? require("path") : null;
      }
      return gdjs2.fileSystem._path;
    };
    fileSystem2._getFs = function() {
      if (!gdjs2.fileSystem._fs) {
        gdjs2.fileSystem._fs = typeof require !== "undefined" ? require("fs") : null;
      }
      return gdjs2.fileSystem._fs;
    };
    fileSystem2.getDirectoryName = function(fileOrFolderPath) {
      const path = gdjs2.fileSystem._getPath();
      if (!path) {
        return "";
      }
      return path.dirname(fileOrFolderPath);
    };
    fileSystem2.getFileName = function(filePath) {
      const path = gdjs2.fileSystem._getPath();
      if (!path) {
        return "";
      }
      return path.basename(filePath);
    };
    fileSystem2.getExtensionName = function(filePath) {
      const path = gdjs2.fileSystem._getPath();
      if (!path) {
        return "";
      }
      return path.extname(filePath);
    };
    fileSystem2.getDesktopPath = function(runtimeScene) {
      const electron = runtimeScene.getGame().getRenderer().getElectron();
      if (electron) {
        return electron.remote.app.getPath("desktop") || "";
      } else {
        return "";
      }
    };
    fileSystem2.getDocumentsPath = function(runtimeScene) {
      const electron = runtimeScene.getGame().getRenderer().getElectron();
      if (electron) {
        return electron.remote.app.getPath("documents") || "";
      } else {
        return "";
      }
    };
    fileSystem2.getPicturesPath = function(runtimeScene) {
      const electron = runtimeScene.getGame().getRenderer().getElectron();
      if (electron) {
        return electron.remote.app.getPath("pictures") || "";
      } else {
        return "";
      }
    };
    fileSystem2.getExecutablePath = function(runtimeScene) {
      const electron = runtimeScene.getGame().getRenderer().getElectron();
      if (electron) {
        return electron.remote.app.getPath("exe") || "";
      } else {
        return "";
      }
    };
    fileSystem2.getExecutableFolderPath = function(runtimeScene) {
      const path = gdjs2.fileSystem._getPath();
      const executablePath = gdjs2.fileSystem.getExecutablePath(runtimeScene);
      if (!path) {
        return "";
      }
      return path.dirname(executablePath);
    };
    fileSystem2.getUserdataPath = function(runtimeScene) {
      const electron = runtimeScene.getGame().getRenderer().getElectron();
      if (electron) {
        return electron.remote.app.getPath("userData") || "";
      } else {
        return "";
      }
    };
    fileSystem2.getUserHomePath = function(runtimeScene) {
      const electron = runtimeScene.getGame().getRenderer().getElectron();
      if (electron) {
        return electron.remote.app.getPath("home") || "";
      } else {
        return "";
      }
    };
    fileSystem2.getTempPath = function(runtimeScene) {
      const electron = runtimeScene.getGame().getRenderer().getElectron();
      if (electron) {
        return electron.remote.app.getPath("temp") || "";
      } else {
        return "";
      }
    };
    fileSystem2.getPathDelimiter = function() {
      const path = gdjs2.fileSystem._getPath();
      if (path) {
        return path.sep || "/";
      } else {
        return "/";
      }
    };
    fileSystem2.makeDirectory = function(directory, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      let result = "error";
      if (fileSystem3) {
        try {
          fileSystem3.mkdirSync(directory);
          result = "ok";
        } catch (err) {
          console.error("Unable to create directory at: '" + directory + "': ", err);
        }
      }
      resultVar.setString(result);
    };
    fileSystem2.saveStringToFileAsync = function(text, savePath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      if (fileSystem3) {
        fileSystem3.writeFile(savePath, text, "utf8", (err) => {
          resultVar.setString("ok");
          if (err) {
            console.error("Unable to save the text to path: '" + savePath + "': ", err);
            resultVar.setString("error");
          }
        });
      }
    };
    fileSystem2.saveStringToFile = function(text, savePath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      let result = "error";
      if (fileSystem3) {
        try {
          fileSystem3.writeFileSync(savePath, text, "utf8");
          result = "ok";
        } catch (err) {
          console.error("Unable to save the text to path: '" + savePath + "': ", err);
        }
      }
      resultVar.setString(result);
    };
    fileSystem2.saveVariableToJSONFile = function(variable, savePath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      const network = gdjs2.evtTools.network;
      let result = "error";
      if (fileSystem3 && network) {
        try {
          fileSystem3.writeFileSync(savePath, network.variableStructureToJSON(variable), "utf8");
          result = "ok";
        } catch (err) {
          console.error("Unable to save the variable to path: '" + savePath + "': ", err);
        }
      }
      resultVar.setString(result);
    };
    fileSystem2.saveVariableToJSONFileAsync = function(variable, savePath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      const network = gdjs2.evtTools.network;
      if (fileSystem3 && network) {
        fileSystem3.writeFile(savePath, network.variableStructureToJSON(variable), "utf8", (err) => {
          resultVar.setString("ok");
          if (err) {
            console.error("Unable to save the variable to path: '" + savePath + "': ", err);
            resultVar.setString("error");
          }
        });
      }
    };
    fileSystem2.loadStringFromFile = function(stringVar, loadPath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      let result = "error";
      if (fileSystem3) {
        try {
          const data = fileSystem3.readFileSync(loadPath, "utf8");
          if (data) {
            stringVar.setString(data);
            result = "ok";
          }
        } catch (err) {
          console.error("Unable to load the file at path: '" + loadPath + "': ", err);
        }
      }
      resultVar.setString(result);
    };
    fileSystem2.loadVariableFromJSONFile = function(variable, loadPath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      const network = gdjs2.evtTools.network;
      let result = "error";
      if (fileSystem3 && network) {
        try {
          const data = fileSystem3.readFileSync(loadPath, "utf8");
          if (data) {
            network.jsonToVariableStructure(data, variable);
            result = "ok";
          }
        } catch (err) {
          console.error("Unable to load variable from the file at path: '" + loadPath + "': ", err);
        }
      }
      resultVar.setString(result);
    };
    fileSystem2.loadVariableFromJSONFileAsync = function(variable, loadPath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      const network = gdjs2.evtTools.network;
      if (fileSystem3 && network) {
        fileSystem3.readFile(loadPath, "utf8", (err, data) => {
          if (data) {
            network.jsonToVariableStructure(data, variable);
            resultVar.setString("ok");
          }
          if (err) {
            console.error("Unable to load variable from the file at path: '" + loadPath + "': ", err);
            resultVar.setString("error");
          }
        });
      }
    };
    fileSystem2.loadStringFromFileAsync = function(stringVar, loadPath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      if (fileSystem3) {
        fileSystem3.readFile(loadPath, "utf8", (err, data) => {
          if (data) {
            stringVar.setString(data);
            resultVar.setString("ok");
          }
          if (err) {
            console.error("Unable to load the file at path: '" + loadPath + "': ", err);
            resultVar.setString("error");
          }
        });
      }
    };
    fileSystem2.deleteFile = function(filePath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      let result = "error";
      if (fileSystem3) {
        try {
          fileSystem3.unlinkSync(filePath);
          result = "ok";
        } catch (err) {
          console.error("Unable to delete the file: '" + filePath + "': ", err);
          result = "error";
        }
      }
      resultVar.setString(result);
    };
    fileSystem2.deleteFileAsync = function(filePath, resultVar) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      if (fileSystem3) {
        fileSystem3.unlink(filePath, (err) => {
          resultVar.setString("ok");
          if (err) {
            console.error("Unable to delete the file: '" + filePath + "': ", err);
            resultVar.setString("error");
          }
        });
      }
    };
    fileSystem2.pathExists = function(filePath) {
      const fileSystem3 = gdjs2.fileSystem._getFs();
      if (fileSystem3) {
        return fileSystem3.existsSync(filePath);
      } else {
        return false;
      }
    };
  })(fileSystem = gdjs2.fileSystem || (gdjs2.fileSystem = {}));
})(gdjs || (gdjs = {}));
//# sourceMappingURL=filesystemtools.js.map
