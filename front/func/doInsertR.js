import request from "../check/request.js";

export default function doInsertR(){
    let data = {
        
        "id": document.getElementById("role_id").value,
        "name": document.getElementById("role_name").value,
        
    };
    request().post("/index.php?action=newRole",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        document.getElementById("content").innerHTML = response['message'];
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}