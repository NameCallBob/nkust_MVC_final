
import doUpdateS from "../func/doUpdateS.js";
export default function showUpdatePageS(su_id){
    let data = {
        "su_id":su_id,
    };
    axios.get("http://localhost/20221122/ERP/public/index.php?action=getSuppliers",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                let row
                for (let i = 0; i < rows.length; i++) {
                   if (rows[i]['su_id']==data['su_id']) { 
                        row = rows[i]
                   }
                }
                let str = `供應商編號：<input type="text" id="su_id" value="` + row['su_id'] + `"><br>`;
                str += `供應商名稱：<input type="text" id="su_name" value="` + row['su_name'] + `"><br>`;
                str += `聯絡人：<input type="text" id="su_contact" value="` + row['su_contact'] + `"><br>`;
                str += `電話：<input type="text" id="su_phone" value="` + row['su_phone'] + `"><br>`;
                str += `住址：<input type="text" id="su_addr" value="` + row['su_addr'] + `"><br>`;
                str += `<button id="doUpdateS">修改供應商</button>`;
                document.getElementById("content").innerHTML = str;
                document.getElementById("doUpdateS").onclick = function(){
                    doUpdateS()
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