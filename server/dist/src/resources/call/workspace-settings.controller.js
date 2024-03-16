"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkspaceSettings = exports.updateWorkspaceSettings = exports.createWorkspaceSettings = exports.getWorkspaceSettings = void 0;
const workspaceSettingsService = __importStar(require("./workspace-settings.service"));
const getWorkspaceSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workspaceId } = req.params;
        const results = yield workspaceSettingsService.getWorkspaceSettings(workspaceId);
        return res.status(200).send({ status: "OK", data: results });
    }
    catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Error");
    }
});
exports.getWorkspaceSettings = getWorkspaceSettings;
const createWorkspaceSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { details, userId } = req.body;
        const results = yield workspaceSettingsService.createWorkspaceSettings(details, userId);
        return res.status(200).send({ status: "OK", data: results });
    }
    catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Error");
    }
});
exports.createWorkspaceSettings = createWorkspaceSettings;
const updateWorkspaceSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { details } = req.body;
        const results = yield workspaceSettingsService.updateWorkspaceSettings(id, details);
        return res.status(200).send({ status: "OK", data: results });
    }
    catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Error");
    }
});
exports.updateWorkspaceSettings = updateWorkspaceSettings;
const deleteWorkspaceSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userId } = req.params;
        const results = yield workspaceSettingsService.deleteWorkspaceSettings(id, userId);
        return res.status(200).send({ status: "OK", data: results });
    }
    catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Internal Error");
    }
});
exports.deleteWorkspaceSettings = deleteWorkspaceSettings;
//# sourceMappingURL=workspace-settings.controller.js.map