"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class AppService {
    constructor(octokitClient) {
        this.octokitClient = octokitClient;
        this.sync_app_with_git = (appName) => {
            console.log("Starting application %s github syc", appName);
            return this.octokitClient.create_repo(appName)
                .then(this.octokitClient.update_readme_file)
                .catch(utils_1.error_handler);
        };
    }
}
exports.default = AppService;
