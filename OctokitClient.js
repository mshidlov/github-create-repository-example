"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const octokit_1 = require("octokit");
const plugin_create_or_update_text_file_1 = require("@octokit/plugin-create-or-update-text-file");
const Repository_1 = __importDefault(require("./Repository"));
const utils_1 = require("./utils");
const MyOctokit = octokit_1.Octokit.plugin(plugin_create_or_update_text_file_1.createOrUpdateTextFile);
class OctokitClient {
    constructor(token) {
        this.token = token;
        this.create_repo = (repo_name) => {
            console.log("Creating %s github repo", repo_name);
            return this.octokit.request('POST /user/repos', {
                name: repo_name,
                private: true,
                auto_init: true,
                gitignore_template: "Node"
            }).then(response => {
                const { data: { full_name } } = response;
                console.log("Repository %s created", full_name);
                const [owner, name] = full_name.split('/');
                return new Repository_1.default(owner, name);
            });
        };
        this.update_readme_file = (repository) => {
            console.log("updating repository %s/%s README.md", repository.owner, repository.repo);
            return this.octokit.createOrUpdateTextFile(Object.assign(Object.assign({}, repository), { path: "README.md", content: "Application first commit - updating README.md", message: "Application first commit - updating README.md" })).then(response => {
                const { updated, data } = response;
                if (updated) {
                    console.log("Repository %s/%s README.md updated", repository.owner, repository.repo);
                    return "README.md updated via " + utils_1.print_stale_property(data, ["commit", "html_url"]);
                }
                else {
                    console.log("Repository %s/%s README.md already up to date", repository.owner, repository.repo);
                    return "README.md already up to date";
                }
            });
        };
        this.octokit = new MyOctokit({
            auth: token
        });
    }
}
exports.default = OctokitClient;
