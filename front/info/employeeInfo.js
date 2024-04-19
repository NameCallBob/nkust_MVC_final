import showInsertPage from "../showpage/showInsertPage.js";
import showUpdatePage from "../showpage/showUpdatePage.js";
import doDelete from "../func/doDelete.js";
import request from "../check/request.js";


export default function employeeInfo(){
    request().get("/index.php?action=getUsers")
    .then(res =>{
        let response = res['data'];
        switch(response['status']){
            case 200:
                
                const rows = response['result'];
                let str = `<table>`;
                str += `<tr><td>員工編號</td><td>密碼</td><td>email</td><td>電話</td><td><button id='newUser'>新增使用者</button></td></tr>`;
                rows.forEach(element => {
                    str += `<tr>`;
                    str += `<td name='id'>` + element['id'] + `</td>`;
                    str += `<td>` + element['passwd'] + `</td>`;
                    str += `<td>` + element['email'] + `</td>`;
                    str += `<td>` + element['phone'] + `</td>`;
                    str += `<td><button name='updateUser'>修改</button><button name='deleteUser'>刪除</button></td>`;
                    str += `</tr>`;
                });
                str += `</table>`;
                document.getElementById("content").innerHTML=str;
                
                document.getElementById("newUser").onclick = function(){ 
                    showInsertPage();
                };
                const ids = document.getElementsByName("id");
                
                const updateButtons = document.getElementsByName("updateUser");
                for(let i=0; i<updateButtons.length; i++){
                    updateButtons[i].onclick = function(){
                        showUpdatePage(ids[i].innerText);
                    };
                }
                
                const deleteButtons = document.getElementsByName("deleteUser");
                for(let i=0; i<deleteButtons.length; i++){
                    deleteButtons[i].onclick = function(){
                        doDelete(ids[i].innerText);
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
    