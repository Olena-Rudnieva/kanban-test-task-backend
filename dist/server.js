"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const { DB_HOST, PORT = 3002 } = process.env;
mongoose_1.default
    .connect(DB_HOST)
    .then(() => {
    app_1.default.listen(PORT, () => console.log(`Server running at ${PORT} port`));
})
    .catch((error) => {
    console.log(error.message);
    process.exit(1);
});
