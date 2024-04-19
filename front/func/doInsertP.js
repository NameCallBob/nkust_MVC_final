import request from "../check/request.js";

export default function doInsertP(){
    let data = {
        "id": document.getElementById("prod_id").value,
        "name": document.getElementById("prodname").value,
        "cost": document.getElementById("cost").value,
        "unitprice": document.getElementById("unitprice").value,
        "qty": document.getElementById("qty").value
    };
    request().post("/index.php?action=newProduct",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        document.getElementById("content").innerHTML = response['message'];
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}