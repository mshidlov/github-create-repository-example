export const error_handler = (reason:any):Promise<any>=> {
    if(reason.response){
        const { response: { data } } = reason;
        return Promise.reject(new Error(data.message));
    } else {
        return Promise.reject(reason);
    }
}

export const print_stale_property = (obj:any,path:string[])=>{
    let obj_container = obj
    for (let property of path) {
        obj_container = (obj_container||{})[property]
    }
    return JSON.stringify(obj_container)
}