import showInsertPageP from "../showpage/showInsertPageP.js";
import showUpdatePageP from "../showpage/showUpdatePageP.js";
import doDeleteP from "../func/doDeleteP.js";
import request from "../check/request.js";


export default function productInfo(){
    request().get("http://localhost/project/20221122/back/public/index.php?action=getProducts")
    .then(res =>{
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                let str = `<table>`;
                str += `<tr><td>產品編號</td><td>產品名稱</td><td>單價</td><td>成本</td><td>數量</td><td><button id='newProduct'>新增產品</button></td></tr>`;
                rows.forEach(element => {
                    str += `<tr>`;
                    str += `<td name='prod_id'>` + element['pro_id'] + `</td>`;
                    str += `<td>` + element['name'] + `</td>`;
                    str += `<td>` + element['price'] + `</td>`;
                    str += `<td>` + element['cost'] + `</td>`;
                    str += `<td>` + element['qty'] + `</td>`;
                    str += `<td><button name='updateProduct'>修改產品</button><button name='deleteProduct'>刪除產品</button></td>`;
                    str += `</tr>`;
                });
                str += `</table>`;
                document.getElementById("content").innerHTML=str;
                
                document.getElementById("newProduct").onclick = function(){ 
                    showInsertPageP();
                };
                const prod_ids = document.getElementsByName("prod_id");
                
                const updateButtons = document.getElementsByName("updateProduct");
                for(let i=0; i<updateButtons.length; i++){
                    updateButtons[i].onclick = function(){
                        showUpdatePageP(prod_ids[i].innerText);
                    };
                }
                
                const deleteButtons = document.getElementsByName("deleteProduct");
                for(let i=0; i<deleteButtons.length; i++){
                    deleteButtons[i].onclick = function(){
                        doDeleteP(prod_ids[i].innerText);
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
    