import request from "../check/request.js";

export default function doUpdateP(){
    let data = {
        "pro_id":document.getElementById("prod_id").value,
        "name":document.getElementById("prodname").value,
        "unitprice": document.getElementById("unitprice").value,
        "cost": document.getElementById("cost").value,
        "qty": document.getElementById("qty").value
    };
    request().post("/index.php?action=updateProduct",Qs.stringify(data))
    .then(res=>{
        let response = res['data'];
        document.getElementById("content").innerHTML = response['message'];
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}