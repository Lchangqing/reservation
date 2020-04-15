export const getCookie = (name) => {
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    const arr = document.cookie.match(reg);
    if (arr){
        return unescape(arr[2]);
    }else{
        return null;
    }
}