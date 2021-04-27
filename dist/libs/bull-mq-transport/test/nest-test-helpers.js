"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockProviders = exports.createMockProvider = exports.createMockFromClass = void 0;
const jest_mock_extended_1 = require("jest-mock-extended");
const createMockFromClass = (_Ctor) => jest_mock_extended_1.mock();
exports.createMockFromClass = createMockFromClass;
const createMockProvider = (Ctor) => ({
    provide: Ctor,
    useValue: exports.createMockFromClass(Ctor),
});
exports.createMockProvider = createMockProvider;
const createMockProviders = (...ctors) => ctors.map(exports.createMockProvider);
exports.createMockProviders = createMockProviders;
//# sourceMappingURL=nest-test-helpers.js.map