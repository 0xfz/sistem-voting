export const generateError = (errorMsg: any) => {
    return {
        status: "error",
        errorMsg: errorMsg
    }
}

export const generateSuccess = (msg: string, data: any = []) => {
    return {
        status: "ok",
        data: data,
        msg: msg
    }
}