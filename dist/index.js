"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const mysql_config_1 = require("./config/mysql.config");
const init = () => {
    const app = new app_1.App();
    app.listen();
};
(0, mysql_config_1.connection)();
init();
//# sourceMappingURL=index.js.map