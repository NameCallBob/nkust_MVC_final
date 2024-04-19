import showInsertPageR from "../showpage/showInsertPageR.js";
import showUpdatePageR from "../showpage/showUpdatePageR.js";
import doDeleteR from "../func/doDeleteR.js";
import request from "../check/request.js";


export default function roleInfo(){
    request().get("/index.php?action=getRoles")
    .then(res =>{
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                let str = `<table>`;
                str += `<tr><td>角色編號</td><td>角色名稱</td><td><button id='newRole'>新增角色</button></td></tr>`;
                rows.forEach(element => {
                    str += `<tr>`;
                    str += `<td name='role_id'>` + element['cus_id'] + `</td>`;
                    str += `<td>` + element['name'] + `</td>`;
                    str += `<td><button name='updateRole'>修改角色</button><button name='deleteRole'>刪除角色</button></td>`;
                    str += `</tr>`;
                });
                str += `</table>`;
                document.getElementById("content").innerHTML=str;
                
                document.getElementById("newRole").onclick = function(){ 
                    showInsertPageR();
                };
                const role_ids = document.getElementsByName("role_id");
                
                const updateButtons = document.getElementsByName("updateRole");
                for(let i=0; i<updateButtons.length; i++){
                    updateButtons[i].onclick = function(){
                        showUpdatePageR(role_ids[i].innerText);
                    };
                }
                
                const deleteButtons = document.getElementsByName("deleteRole");
                for(let i=0; i<deleteButtons.length; i++){
                    deleteButtons[i].onclick = function(){
                        doDeleteR(role_ids[i].innerText);
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
    