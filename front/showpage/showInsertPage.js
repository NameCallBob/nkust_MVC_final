import doInsert from "../func/doInsert.js";

export default function showInsertPage(){
    let str = `編號：<input type="text" id="id"><br>`;
    str += `密碼：<input type="text" id="password"><br>`;
    str += `email：<input type="text" id="email"><br>`;
    str += `電話：<input type="text" id="phone"><br>`;
    str += `<button id="doinsert">新增</button>`;
    document.getElementById("content").innerHTML = str;
    document.getElementById("doinsert").onclick = function(){
        doInsert();
    };
}
