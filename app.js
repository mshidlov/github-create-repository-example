"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OctokitClient_1 = __importDefault(require("./OctokitClient"));
const AppService_1 = __importDefault(require("./AppService"));
require('dotenv').config();
console.log("App Init...");
const octokitClient = new OctokitClient_1.default(process.env.GITHUB_TOKEN);
const appService = new AppService_1.default(octokitClient);
const app_name = 'name1';
appService.sync_app_with_git(app_name)
    .then(console.log)
    .catch(console.error)
    .then(() => console.log("App Exits"));
// abstract class ErrorBase extends Error{
//
//     protected constructor(public errorType:string,message:string){
//         super(message);
//     }
// }
//
// class CreateRepoError extends ErrorBase {
//     constructor(message: string) {
//         super('CreateRepoError', message);
//     }
// }
//
// const res = octokit.request('POST /user/repos', {
//     name: rep_name,
//     private: true,
//     auto_init: true,
//     gitignore_template: "Node"
// })
// .then(response=>{
// return octokit.createOrUpdateTextFile({
//     owner: "matanshidlov",
//     repo: rep_name,
//     path: "README.md",
//     content: "Application first commit - updating README.md",
//     message: "Application first commit - updating README.md",
// })
// }).catch(error_handler)
//     .then(response=>{
//     const { updated, data } = response;
//     if (updated) {
//         console.log("test.txt updated via %s", print_stale_property(data,["commit","html_url"]))
//     } else {
//         console.log("test.txt already up to date");
//     }
// }).catch(error_handler)
//     .then(result=>{
//         console.log("FINISH: %s", result)
//     }).catch(console.error)
//
// octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
//     owner: 'matanshidlov',
//     repo: 'Amplication',
//     branch: 'main'
// }).then(({data})=>{
//     console.log(data)
// }).catch(reason => {
//     const { response: { data } } = reason
//     console.log(data)
//     if(data.message === 'Branch not found'){
//         console.log(new Error(data.message))
//     }
// })
// octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
//     owner: 'matanshidlov',
//     repo: 'Amplication',
//     branch: 'main'
// }).then((response: OctokitResponse<any>) =>{
//     const { data } = response
//     return data
// }).catch(reason => get_branch_error_handler(reason.response.data))
//
// const get_branch_error_handler = (data:{ message: string, documentation_url: string }):Promise<any> => {
//     return octokit.request('POST /repos/{owner}/{repo}/git/blobs', {
//         owner: 'matanshidlov',
//         repo: 'Amplication',
//         content: 'content'
//     }).then(response=>{
//         console.log(response)
//     }).catch(e=>{
//
//         // data: {
//         //     message: 'Git Repository is empty.',
//         //     documentation_url: 'https://docs.github.com/rest/reference/git#create-a-blob'
//         // }
//
//
//         console.error(e)
//     })
//
//     // octokit.request('POST /repos/{owner}/{repo}/git/refs')
//     // octokit.request('POST /repos/{owner}/{repo}/git/trees')
//     //
//     // octokit.request('POST /repos/{owner}/{repo}/git/commits',{
//     //     owner: 'matanshidlov',
//     //     repo: 'Amplication',
//     //     message: 'message',
//     //     tree: 'tree'
//     // })
//     //
//     //     return Error(data.message)
// }
//
//
//
// try{
//     const {data} = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
//         owner: 'matanshidlov',
//         repo: 'Amplication',
//         branch: 'main'
//     })
//     console.log(data)
// } catch (e) {
//     const { response: { data } } = e
//     console.log(data)
//     if(data.message === 'Branch not found'){
//         console.log(new Error(data.message))
//     }
// }
