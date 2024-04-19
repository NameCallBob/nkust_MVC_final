import doUpdate from "../func/doUpdate.js";
export default function showUpdatePage(id){
    let data = {
        "id":id,
    };
    axios.get("http://localhost/20221122/ERP/public/index.php?action=getUsers",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        switch(response['status']){
            case 200:
                const rows = response['result'];
                let row
                for (let i = 0; i < rows.length; i++) {
                   if (rows[i]['id']==data['id']) { 
                        row = rows[i]
                   }
                }
                let str = `編號：<input type="text" id="id" value="` + row['id'] + `"><br>`;
                str += `密碼：<input type="text" id="password" value="` + row['password'] + `"><br>`;
                str += `email：<input type="text" id="email" value="` + row['email'] + `"><br>`;
                str += `電話：<input type="text" id="phone" value="` + row['phone'] + `"><br>`;
                str += `<button id="doUpdate">修改</button>`;
                document.getElementById("content").innerHTML = str;
                document.getElementById("doUpdate").onclick = function(){
                    doUpdate()
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