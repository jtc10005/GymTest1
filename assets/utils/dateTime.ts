export function getLocalTime(time?: string) {
    if(!time){
        return '';
    }
    
    let nd = new Date(`2020-01-01 ${time}`);
    
    // return nd.toLocaleTimeString();
    return time;
}