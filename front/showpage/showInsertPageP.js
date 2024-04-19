import doInsertP from "../func/doInsertP.js";

export default function showInsertPageP(){
    let str = `產品編號：<input type="text" id="prod_id"><br>`;
    str += `產品名稱：<input type="text" id="prodname"><br>`;
    str += `單價：<input type="text" id="unitprice"><br>`;
    str += `成本：<input type="text" id="cost"><br>`;
    str += `數量：<input type="text" id="qty"><br>`;
    str += `<button id="doinsertP">新增產品</button>`;
    document.getElementById("content").innerHTML = str;
    document.getElementById("doinsertP").onclick = function(){
        doInsertP();
    };
}
