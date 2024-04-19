import request from "../check/request.js";

export default function doDeleteR(role_id){
    let data = {
        "id":role_id,
    };
    request().post("/index.php?action=removeRole",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        document.getElementById("content").innerHTML = response['message'];
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}   