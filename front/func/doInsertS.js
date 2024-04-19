import request from "../check/request.js";

export default function doInsertS(){
    let data = {
        "id": document.getElementById("su_id").value,
        "name": document.getElementById("su_name").value,
        "contact": document.getElementById("su_contact").value,
        "phone": document.getElementById("su_phone").value,
        "address": document.getElementById("su_addr").value,
    };
    request().post("/index.php?action=newSupplier",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        document.getElementById("content").innerHTML = response['message'];
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}