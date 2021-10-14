import { Octokit } from "octokit"
import { createOrUpdateTextFile} from "@octokit/plugin-create-or-update-text-file"
import Repository from "./Repository";
import {print_stale_property} from "./utils";

const MyOctokit = Octokit.plugin(createOrUpdateTextFile);

export default class OctokitClient {


    private octokit

    constructor(private token: string) {
        this.octokit = new MyOctokit({
            auth: token
        });
    }

    public create_repo = (repo_name:string):Promise<Repository> => {
        console.log("Creating %s github repo",repo_name);
        return this.octokit.request('POST /user/repos', {
            name: repo_name,
            private: true,
            auto_init: true,
            gitignore_template: "Node"
        }).then(response => {
            const {data: {full_name}} = response;
            console.log("Repository %s created",full_name);
            const [owner,name] = full_name.split('/')
            return new Repository(owner,name);
        })
    }

    public update_readme_file = (repository:Repository):Promise<string> => {
        console.log("updating repository %s/%s README.md",repository.owner,repository.repo);
        return this.octokit.createOrUpdateTextFile({
            ...repository,
            path: "README.md",
            content: "Application first commit - updating README.md",
            message: "Application first commit - updating README.md",
        }).then(response => {
            const {updated, data} = response;
            if (updated) {
                console.log("Repository %s/%s README.md updated",repository.owner,repository.repo);
                return "README.md updated via " + print_stale_property(data, ["commit", "html_url"]);
            } else {
                console.log("Repository %s/%s README.md already up to date",repository.owner,repository.repo);
                return "README.md already up to date";
            }
        });
    }

}
