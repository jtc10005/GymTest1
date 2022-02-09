export function getLocalTime(time?: string) {
    if(!time){
        return '';
    }
    
    let nd = new Date(`2020-01-01 ${time}`);
    
    // return nd.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    return time;
}