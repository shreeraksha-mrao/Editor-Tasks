import { Router } from "express";
import { addPassword, deleteEditorById, getEditor, getEditorById, postEditor, updateEditorById } from "../controllers/editors.controllers.js";

export const EditorRouter = Router();

EditorRouter.route("/").get(getEditor);
EditorRouter.route("/").post(postEditor);
EditorRouter.route("/:id").get(getEditorById);
EditorRouter.route("/:id").delete(deleteEditorById);
EditorRouter.route("/updateall").patch(addPassword);
EditorRouter.route("/:id").patch(updateEditorById);