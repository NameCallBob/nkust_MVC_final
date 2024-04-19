import { index } from "./page.js";
import request from "./check/request.js"
function new_order(){
    let order = JSON.parse(window.sessionStorage.getItem('order_now')  )
    let k = new Array() ; let v = new Array();
    let time = document.getElementById('time').value
    let datef = document.getElementById('date').value
    for (let i in order){
        k.push(i);v.push(order[i])
    }
    let date = new Date()
    // let h = date.getFullYear() ; let m = parseInt(date.getUTCMonth())+1 ; let s = date.getDate()
    let data = {
        // 'time':`${h}-${m}-${s} ${time}`,
        'time':`${datef} ${time}`,
        'name':JSON.stringify(k),
        'account':window.sessionStorage.getItem('account'),
        'amount':JSON.stringify(v)
    }
    request().post("/index.php?action=newOrder",Qs.stringify(data))
    .then(res =>{
        let response = res['data'];
        if (response['status'] == 200){
            
            alert('送出訂單')
            index()
        }
    })
}
function new_Customer(){

}
export{
    new_order
}