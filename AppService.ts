import OctokitClient from "./OctokitClient";
import {error_handler} from "./utils";
export default class AppService {

    constructor(private octokitClient: OctokitClient) {
    }

    public sync_app_with_git = (appName: string): Promise<string> => {
        console.log("Starting application %s github syc",appName);
        return this.octokitClient.create_repo(appName)
            .then(this.octokitClient.update_readme_file)
            .catch(error_handler)
    }

}