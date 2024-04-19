import doUpdateP from "../func/doUpdateP.js";
export default function showUpdatePageP(prod_id){
    let data = {
        "prod_id":prod_id,
    };
    axios.get("http://localhost/20221122/ERP/public/index.php?action=getProducts",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                let row
                for (let i = 0; i < rows.length; i++) {
                   if (rows[i]['prod_id']==data['prod_id']) { 
                        row = rows[i]
                   }
                }
                let str = `產品編號：<input type="text" id="prod_id" value="` + row['prod_id'] + `"><br>`;
                str += `產品名稱：<input type="text" id="prodname" value="` + row['prodname'] + `"><br>`;
                str += `單價：<input type="text" id="unitprice" value="` + row['unitprice'] + `"><br>`;
                str += `成本：<input type="text" id="cost" value="` + row['cost'] + `"><br>`;
                str += `數量：<input type="text" id="qty" value="` + row['qty'] + `"><br>`;
                str += `<button id="doUpdateP">修改</button>`;
                document.getElementById("content").innerHTML = str;
                document.getElementById("doUpdateP").onclick = function(){
                    doUpdateP()
                }
                break;
            default:
                document.getElementById("content").innerHTML = response['message'];
                break;
        }
    })
    .catch(err => {
        document.getElementById("content").innerHTML=err;  
    })  
}