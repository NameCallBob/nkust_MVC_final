import request from "../check/request.js";

export default function doDeleteP(prod_id){
    let data = {
        "id":prod_id,
    };
    request().post("/index.php?action=removeProduct",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        document.getElementById("content").innerHTML = response['message'];
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}   