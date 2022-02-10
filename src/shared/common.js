export const emailCheck = (email) => {
    let _reg = /^[0-9a-zA-Z][0-9a-zA-Z\-\_\.]*@[0-9a-zA-Z][0-9a-zA-Z\-\_\.]*.[a-zA-Z]*/;

    return _reg.test(email);
}