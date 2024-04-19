import request from "../check/request.js";

export default function doDeleteS(su_id){
    let data = {
        "id":su_id,
    };
    request().post("/index.php?action=removeSupplier",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        document.getElementById("content").innerHTML = response['message'];
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}   