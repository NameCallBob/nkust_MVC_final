import doUpdateR from "../func/doUpdateR.js";
export default function showUpdatePageR(role_id){
    let data = {
        "role_id":role_id,
    };
    axios.get("http://localhost/20221122/ERP/public/index.php?action=getRoles",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                let row
                for (let i = 0; i < rows.length; i++) {
                   if (rows[i]['role_id']==data['role_id']) { 
                        row = rows[i]
                   }
                }
                let str = `角色編號：<input type="text" id="role_id" value="` + row['role_id'] + `"><br>`;
                str += `角色名稱：<input type="text" id="role_name" value="` + row['role_name'] + `"><br>`;
                str += `<button id="doUpdateR">修改角色</button>`;
                document.getElementById("content").innerHTML = str;
                document.getElementById("doUpdateR").onclick = function(){
                    doUpdateR()
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