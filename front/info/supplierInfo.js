import showInsertPageS from "../showpage/showInsertPageS.js";
import showUpdatePageS from "../showpage/showUpdatePageS.js";
import doDeleteS from "../func/doDeleteS.js";
import request from "../check/request.js";


export default function supplierInfo(){
    request().get("/index.php?action=getSuppliers")
    .then(res =>{
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                let str = `<table>`;
                str += `<tr><td>供應商編號</td><td>供應商名稱</td><td>聯絡人</td><td>電話</td><td>住址</td><td><button id='newSupplier'>新增供應商</button></td></tr>`;
                rows.forEach(element => {
                    str += `<tr>`;
                    str += `<td name='su_id'>` + element['com_id'] + `</td>`;
                    str += `<td>` + element['name'] + `</td>`;
                    str += `<td>` + element['contactperson'] + `</td>`;
                    str += `<td>` + element['phone'] + `</td>`;
                    str += `<td>` + element['address'] + `</td>`;
                    str += `<td><button name='updateSupplier'>修改供應商</button><button name='deleteSupplier'>刪除供應商</button></td>`;
                    str += `</tr>`;
                });
                str += `</table>`;
                document.getElementById("content").innerHTML=str;
                
                document.getElementById("newSupplier").onclick = function(){ 
                    showInsertPageS();
                };
                const su_ids = document.getElementsByName("su_id");
                
                const updateButtons = document.getElementsByName("updateSupplier");
                for(let i=0; i<updateButtons.length; i++){
                    updateButtons[i].onclick = function(){
                        showUpdatePageS(su_ids[i].innerText);
                    };
                }
                
                const deleteButtons = document.getElementsByName("deleteSupplier");
                for(let i=0; i<deleteButtons.length; i++){
                    deleteButtons[i].onclick = function(){
                        doDeleteS(su_ids[i].innerText);
                    };
                }
                break;
                
            default:
                document.getElementById("content").innerHTML = response['message'];
                break;
        }
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}
    