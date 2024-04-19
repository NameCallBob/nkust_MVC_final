import loginPage from "../check/login.js";
import request from "../check/request.js";

export default function doSelect(){
    request().get("/index.php?action=getUsers")
    .then(res=>{
        let response = res['data'];
        switch(response['status']){
            case 200:
                if (window.localStorage){
                    window.localStorage.setItem("jwtToken",response['token'])
                }
                const rows = response['result'];
                let str = '<table>';
                rows.forEach(element =>{
                    str += "<tr>";
                    str += "<td>" + element['id'] + "</td>";
                    str += "<td>" + element['password'] + "</td>";
                    str += "<td>" + element['email'] + "</td>";
                    str += "<td>" + element['phone'] + "</td>";
                    str += "</tr>";
                });
                str += '<table>';
                document.getElementById("content").innerHTML = str;
                break;
            case 403:
                alert('權限不足');
                break;
            case 401:
                loginPage();
                break;
            default:
                document.getElementById("content").innerHTML = response['message'];
                break;
        }
    })
    .catch(err =>{
        document.getElementById("content").innerHTML = err;
    })
}