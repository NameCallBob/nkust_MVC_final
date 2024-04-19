import doInsertS from "../func/doInsertS.js";

export default function showInsertPageS(){
    let str = `供應商編號：<input type="text" id="su_id"><br>`;
    str += `供應商名稱：<input type="text" id="su_name"><br>`;
    str += `聯絡人：<input type="text" id="su_contact"><br>`;
    str += `電話：<input type="text" id="su_phone"><br>`;
    str += `住址：<input type="text" id="su_addr"><br>`;
    str += `<button id="doinsertS">新增供應商</button>`;
    document.getElementById("content").innerHTML = str;
    document.getElementById("doinsertS").onclick = function(){
        doInsertS();
    };
}
