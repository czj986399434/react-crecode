export const transfer=(str:string)=>{
    let reg = new RegExp("<br>", "g");
    str = str.replace(reg, "\n");
    return str;
}