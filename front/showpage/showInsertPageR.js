import doInsertR from "../func/doInsertR.js";

export default function showInsertPageR(){
    let 
    str = `角色編號：<input type="text" id="role_id"><br>`;
    str += `角色名稱：<input type="text" id="role_name"><br>`;
    str += `<button id="doinsertR">新增角色</button>`;
    document.getElementById("content").innerHTML = str;
    document.getElementById("doinsertR").onclick = function(){
        doInsertR();
    };
}
