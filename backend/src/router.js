const express = require("express");
const controller = require("./controllers/tasksControllers");
const middleware = require("./controllers/middlewares/tasksMiddlewares");
const router = express.Router();

router.get("/tasks", controller.getAll);
router.post("/tasks", middleware.validadeTitleField, controller.createTask);
router.delete("/tasks/:id", controller.deleteTask);
router.put(
  "/tasks/:id",
  middleware.validadeStatusField,
  middleware.validadeTitleField,
  controller.updateTask
);

module.exports = router;
