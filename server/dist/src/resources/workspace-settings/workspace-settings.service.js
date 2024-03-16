"use strict";
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
const database_1 = require("@wysdom/database");
const getWorkspaceSettings = (workspaceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workspace = yield database_1.prisma.workspaceSettings.findFirst({
            where: {
                id: workspaceId
            }
        });
        return workspace;
    }
    catch (error) {
        throw new Error(String(error));
    }
});
exports.getWorkspaceSettings = getWorkspaceSettings;
const createWorkspaceSettings = (details, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            throw new Error('Unauthorized');
        }
        const workspaceSettings = yield database_1.prisma.workspaceSettings.create({
            data: details
        });
        console.log('inside', workspaceSettings);
        return workspaceSettings;
    }
    catch (error) {
        throw new Error(String(error));
    }
});
exports.createWorkspaceSettings = createWorkspaceSettings;
const updateWorkspaceSettings = (workspaceId, details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workspaceSettingsToUpdate = yield database_1.prisma.workspaceSettings.findFirst({
            where: {
                id: workspaceId,
            },
        });
        if (!workspaceSettingsToUpdate) {
            throw new Error('Not found');
        }
        const workspaceSettings = yield database_1.prisma.workspaceSettings.update({
            where: {
                id: workspaceId,
            },
            data: details,
        });
        return workspaceSettings;
    }
    catch (error) {
        throw new Error(String(error));
    }
});
exports.updateWorkspaceSettings = updateWorkspaceSettings;
const deleteWorkspaceSettings = (workspaceId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId) {
            throw new Error('Unauthorized');
        }
        const workspaceSettingsToDelete = yield database_1.prisma.workspaceSettings.findFirst({
            where: {
                id: workspaceId,
            },
        });
        if (!workspaceSettingsToDelete) {
            throw new Error('Not found');
        }
        const workspaceSettings = yield database_1.prisma.workspaceSettings.delete({
            where: {
                id: workspaceId,
            },
        });
        return workspaceSettings;
    }
    catch (error) {
        throw new Error(String(error));
    }
});
exports.deleteWorkspaceSettings = deleteWorkspaceSettings;
//# sourceMappingURL=workspace-settings.service.js.map