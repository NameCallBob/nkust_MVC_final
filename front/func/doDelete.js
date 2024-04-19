import request from "../check/request.js";

export default function doDelete(id){
    let data = {
        "id":id,
    };
    request().post("/index.php?action=removeUser",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        document.getElementById("content").innerHTML = response['message'];
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}   