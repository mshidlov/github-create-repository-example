"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_stale_property = exports.error_handler = void 0;
const error_handler = (reason) => {
    if (reason.response) {
        const { response: { data } } = reason;
        return Promise.reject(new Error(data.message));
    }
    else {
        return Promise.reject(reason);
    }
};
exports.error_handler = error_handler;
const print_stale_property = (obj, path) => {
    let obj_container = obj;
    for (let property of path) {
        obj_container = (obj_container || {})[property];
    }
    return JSON.stringify(obj_container);
};
exports.print_stale_property = print_stale_property;
