import request from "./check/request.js"
import { index , manage } from "./page.js";

function delorder(account=null,time,args){
    if (account == 'boss'){
        let data = {
            'order_id':args
        }
        request().post('/index.php?action=removeOrder',Qs.stringify(data))
        .then(res=>{
            let response = res['data'];
            if (response['status'] == 200){
                alert('刪除成功')
                manage('com','order')
            }
            else{
                alert('若離取餐時間相差5分鐘以下則無法取消')
            }
        })
    
    }
    else{
        console.log('im customer')
    let date_now = new Date()
    let date_order = new Date(time.replace('-','/')).valueOf()
    if((date_order-date_now.valueOf()) > 300000){
        let data = {
            'account':account,
            'order_id':args
        }
        request().post('/index.php?action=removeOrder',Qs.stringify(data))
        .then(res=>{
            let response = res['data'];
            if (response['status'] == 200){
                alert('刪除成功')
                manage('cus')
            }
            else{
                alert('若離取餐時間相差5分鐘以下則無法取消')
                manage('cus')
            }
        })
    }
    
    else{
        alert('超過五分鐘，無法刪除')
    }
    

    
    }
}
function delcustomer(account){
    let data = {
        'account' : account 
    }
    request().post('/index.php?action=removeCustomer')
    .then(res=>{
        let response = res['data'];
        if (response['status'] == 200){
            alert('刪除成功')
        }
    })
}
function delfood(){
    let delit = document.getElementsByName('delit')
    for (let i = 0 ; i < delit.length ; i++ ){
        delit[i].onclick = function(){
             del_it(delit[i].value)
    }
    }
    function del_it(id){
        let data = {
            'fd_id':id
             }
        request().post("/index.php?action=removeProduct",Qs.stringify(data))
        .then(res=>{
        let response = res['data']
        if (response['status']==200){
            alert('刪除成功')
            index(null,null,'com')
        }
    })
    }
   
    
}
export {delorder , delcustomer , delfood}