"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClientSingleton = () => {
    return new client_1.PrismaClient();
};
const prismadb = (_a = globalThis.prismaGlobal) !== null && _a !== void 0 ? _a : prismaClientSingleton();
exports.default = prismadb;
if (process.env.NODE_ENV !== 'production')
    globalThis.prismaGlobal = prismadb;
