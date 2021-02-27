var gdjs;
(function(gdjs2) {
  class PathfindingObstaclesManager {
    constructor(runtimeScene) {
      this.x = 0;
      this.y = 0;
      this.radius = 0;
      this._obstaclesHSHG = new gdjs2.HSHG.HSHG();
    }
    static getManager(runtimeScene) {
      if (!runtimeScene.pathfindingObstaclesManager) {
        runtimeScene.pathfindingObstaclesManager = new gdjs2.PathfindingObstaclesManager(runtimeScene);
      }
      return runtimeScene.pathfindingObstaclesManager;
    }
    addObstacle(pathfindingObstacleBehavior) {
      this._obstaclesHSHG.addObject(pathfindingObstacleBehavior);
    }
    removeObstacle(pathfindingObstacleBehavior) {
      this._obstaclesHSHG.removeObject(pathfindingObstacleBehavior);
    }
    getAllObstaclesAround(x, y, radius, result) {
      const vertex = new PathfindingObstaclesManager.Vertex(x, y, radius);
      this._obstaclesHSHG.addObject(vertex);
      this._obstaclesHSHG.queryForCollisionWith(vertex, result);
      this._obstaclesHSHG.removeObject(vertex);
    }
  }
  gdjs2.PathfindingObstaclesManager = PathfindingObstaclesManager;
  (function(PathfindingObstaclesManager2) {
    class Vertex {
      constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.aabb = null;
      }
      getAABB() {
        const rad = this.radius, x = this.x, y = this.y;
        return this.aabb = {
          min: [x - rad, y - rad],
          max: [x + rad, y + rad]
        };
      }
    }
    PathfindingObstaclesManager2.Vertex = Vertex;
  })(PathfindingObstaclesManager = gdjs2.PathfindingObstaclesManager || (gdjs2.PathfindingObstaclesManager = {}));
  class PathfindingObstacleRuntimeBehavior extends gdjs2.RuntimeBehavior {
    constructor(runtimeScene, behaviorData, owner) {
      super(runtimeScene, behaviorData, owner);
      this._oldX = 0;
      this._oldY = 0;
      this._oldWidth = 0;
      this._oldHeight = 0;
      this._registeredInManager = false;
      this._impassable = behaviorData.impassable;
      this._cost = behaviorData.cost;
      this._manager = PathfindingObstaclesManager.getManager(runtimeScene);
    }
    updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
      if (oldBehaviorData.impassable !== newBehaviorData.impassable) {
        this.setImpassable(newBehaviorData.impassable);
      }
      if (oldBehaviorData.cost !== newBehaviorData.cost) {
        this.setCost(newBehaviorData.cost);
      }
      return true;
    }
    onDestroy() {
      if (this._manager && this._registeredInManager) {
        this._manager.removeObstacle(this);
      }
    }
    doStepPreEvents(runtimeScene) {
      if (!this.activated() && this._registeredInManager) {
        this._manager.removeObstacle(this);
        this._registeredInManager = false;
      } else {
        if (this.activated() && !this._registeredInManager) {
          this._manager.addObstacle(this);
          this._registeredInManager = true;
        }
      }
      if (this._oldX !== this.owner.getX() || this._oldY !== this.owner.getY() || this._oldWidth !== this.owner.getWidth() || this._oldHeight !== this.owner.getHeight()) {
        if (this._registeredInManager) {
          this._manager.removeObstacle(this);
          this._manager.addObstacle(this);
        }
        this._oldX = this.owner.getX();
        this._oldY = this.owner.getY();
        this._oldWidth = this.owner.getWidth();
        this._oldHeight = this.owner.getHeight();
      }
    }
    doStepPostEvents(runtimeScene) {
    }
    getAABB() {
      return this.owner.getAABB();
    }
    onActivate() {
      if (this._registeredInManager) {
        return;
      }
      this._manager.addObstacle(this);
      this._registeredInManager = true;
    }
    onDeActivate() {
      if (!this._registeredInManager) {
        return;
      }
      this._manager.removeObstacle(this);
      this._registeredInManager = false;
    }
    getCost() {
      return this._cost;
    }
    setCost(cost) {
      this._cost = cost;
    }
    isImpassable() {
      return this._impassable;
    }
    setImpassable(impassable) {
      this._impassable = impassable;
    }
  }
  gdjs2.PathfindingObstacleRuntimeBehavior = PathfindingObstacleRuntimeBehavior;
  gdjs2.registerBehavior("PathfindingBehavior::PathfindingObstacleBehavior", gdjs2.PathfindingObstacleRuntimeBehavior);
})(gdjs || (gdjs = {}));
//# sourceMappingURL=pathfindingobstacleruntimebehavior.js.map
