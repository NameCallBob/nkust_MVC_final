import request from "./check/request.js"
import { chgecustomer, chgefood_pg_func } from "./chge_func.js";
import { delcustomer, delfood, delorder } from "./del_func.js";
import { chgequa } from "./func.js";
import { manage } from "./page.js";

function find_food(arg = null , param=null ,where = null){
    if (where == "cus"){
        if (arg == null & param==null){
            request().post("/index.php?action=getProducts")
            .then(res=>{
               
                let response = res['data'] ;  console.log(response)
                let str = ``
                try{
                    response['result'].forEach(element => {
                    str += `<tr>`
                    str += `<td name='fd_name'>`+element['name']+`</td><td name='fd_price'>`+element['price']+`</td>`
                    str += `<td name='minus'>-</td><td name="fd_qty">0</td><td name='plus'>+</td>`
                    str += `</tr>`
                });
                document.getElementById('list-content').innerHTML = str
                window.localStorage.setItem("jwtToken",response['token']);
                
                console.log('load ok!')
                update_qty()
                chgequa()

                }
                catch{
                    alert('需登入')
                }
            })
        }
        else if (arg == 'type' & param != null){
            let data ={
                'type':param
            }
            request().post("/index.php?action=getProduct",Qs.stringify(data))
            .then(res=>{
                let response = res['data'] ;  console.log(response)
                let str = ``
                try{
                    response['result'].forEach(element => {
                    str += `<tr>`
                    str += `<td name='fd_name'>`+element['name']+`</td><td name='fd_price'>`+element['price']+`</td>`
                    str += `<td name='minus'>-</td><td name="fd_qty">0</td><td name='plus'>+</td>`
                    str += `</tr>`
                });
                document.getElementById('list-content').innerHTML = str
                window.localStorage.setItem("jwtToken",response['token']);
                update_qty()
                chgequa()
                console.log('load ok!')

                }
                catch{
                    alert('需登入')
                }
            })
        }
        else if (arg == 'name' & param != null){
            let data = {
                'name':param
            }
            request().post("/index.php?action=getProduct",Qs.stringify(data))
            .then(res=>{
                let response = res['data'] ;  console.log(response)
                let str = ``
                try{
                    response['result'].forEach(element => {
                    str += `<tr>`
                    str += `<td name='fd_name'>`+element['name']+`</td><td name='fd_price'>`+element['price']+`</td>`
                    str += `<td name='minus'>-</td><td name="fd_qty">0</td><td name='plus'>+</td>`
                    str += `</tr>`
                });
                document.getElementById('list-content').innerHTML = str
                window.localStorage.setItem("jwtToken",response['token']);
                console.log('load ok!')
                update_qty()
                chgequa()
                }
                catch{
                    alert('需登入')
                }
            })
        }
        else{
            console.log(' DONT MATCH ANY ')
        }
    
    }
    else if (where == 'com'){
        if (arg == null & param==null){
            request().post("/index.php?action=getProducts")
            .then(res=>{
               
                let response = res['data'] ;  console.log(response)
                let str = ``
                try{
                    response['result'].forEach(element => {
                    str += `<tr>`
                    str += `<td name='fd_name'>`+element['name']+`</td><td name='fd_price'>`+element['price']+`</td>`
                    str += `<td ><button type="button" class="btn btn-warning" name='chgeit' value='`+element['name']+`'>修改商品</button></td><td name="delit"><button type="button" name='delit'class="btn btn-danger" value='`+element['fd_id']+`'>刪除商品</button></td>`
                    str += `</tr>`
                });
                document.getElementById('list-content').innerHTML = str
                window.localStorage.setItem("jwtToken",response['token']);
                chgefood_pg_func()
                delfood()
                console.log('load ok!')
                }
                catch{
                    alert('需登入')
                }
            })
        }
        else if (arg == 'type' & param != null){
            let data ={
                'type':param
            }
            request().post("/index.php?action=getProduct",Qs.stringify(data))
            .then(res=>{
                let response = res['data'] ;  console.log(response)
                let str = ``
                try{
                    response['result'].forEach(element => {
                        str += `<tr>`
                        str += `<td name='fd_name'>`+element['name']+`</td><td name='fd_price'>`+element['price']+`</td>`
                        str += `<td name='chgeit'><button type="button" class="btn btn-warning">修改商品</button></td><td name="delit"><button type="button" class="btn btn-danger">刪除商品</button></td>`
                        str += `</tr>`
                    });
                    document.getElementById('list-content').innerHTML = str
                window.localStorage.setItem("jwtToken",response['token']);
                chgefood_pg_func()
                delfood()
                console.log('load ok!')

                }
                catch{
                    alert('需登入')
                }
            })
        }
        else if (arg == 'name' & param != null){
            let data = {
                'name':param
            }
            request().post("/index.php?action=getProduct",Qs.stringify(data))
            .then(res=>{
                let response = res['data'] ;  console.log(response)
                let str = ``
                try{
                    response['result'].forEach(element => {
                        str += `<tr>`
                        str += `<td name='fd_name'>`+element['name']+`</td><td name='fd_price'>`+element['price']+`</td>`
                        str += `<td name='chgeit'><button type="button" class="btn btn-warning">修改商品</button></td><td name="delit"><button type="button" class="btn btn-danger">刪除商品</button></td>`
                        str += `</tr>`
                    });
                    document.getElementById('list-content').innerHTML = str
                window.localStorage.setItem("jwtToken",response['token']);
                console.log('load ok!')
                chgefood_pg_func()
                delfood()
                }
                catch{
                    alert('需登入')
                }
            })
        }
        else{
            console.log(' DONT MATCH ANY ')
        }

    }
   
}

function update_qty(){
    if (window.sessionStorage.getItem('order_now')){
        let data = JSON.parse(window.sessionStorage.getItem('order_now'))
        let name = document.getElementsByName('fd_name')
        let qty = document.getElementsByName('fd_qty')
        // data.forEach(element =>{
        //     for(let i = 0 ; i <= name.length ; i++){
                
        //     }
        // })
        for (let key in data){
            for(let i = 0 ; i < name.length ; i++){
            if (name[i].innerText == key){
                qty[i].innerText = data[key]
            }  
            }
        }
    }
}
function find_order(who){
    if (who == 'cus'){
        let data = {
            'account' : window.sessionStorage.getItem('account')
        }
        request().post('/index.php?action=getOrder',Qs.stringify(data))
        .then(res=>{
            let response = res['data']
            if(response['status']==200){
                let str =`
            <thead class="thead-dark">
            <tr>
              <th scope="col">訂單編號</th>
              <th scope="col">預計領取時間</th>
              <th scope="col">訂購商品</th>
              <th scope="col">訂購數量</th>
              <th scope="col"></th>
            </tr>
          </thead>
            <tbody>
            `
            response['result'].forEach(element => {
                
                str+=`<tr><td name='order_id'>`+element['order_id']+`</td>`
                str+=`<td name='order_time'>`+element['time']+`</td>`
                str+=`<td>`+element['name']+`</td>`
                str+=`<td>`+element['amount']+`</td>`
                str+=`<td><button type="button" class="btn btn-danger" name="del_order">刪除</button></td></tr>`
            });
            str += `
            </tbody>`

            document.getElementById('show').innerHTML = str
            let del_order = document.getElementsByName('del_order') ;
            for (let i = 0 ; i < del_order.length ; i ++){
                del_order[i].onclick = function(){
                    console.log(document.getElementsByName('order_time')[i].innerText,document.getElementsByName('order_id')[i].innerText)
                    delorder('cus',document.getElementsByName('order_time')[i].innerText,document.getElementsByName('order_id')[i].innerText)
                    
                }
            }
            }
        })
    }
    else if (who == 'com'){
        request().post('/index.php?action=getOrders')
        .then(res=>{
            let response = res['data']
            if(response['status']==200){
                let str =`
            <thead class="thead-dark">
            <tr>
              <th scope="col">訂單編號</th>
              <th scope="col">預計領取時間</th>
              <th scope="col">訂購顧客</th>
              <th scope="col">訂購商品</th>
              <th scope="col">訂購數量</th>
              <th scope="col"></th>
            </tr>
          </thead>
            <tbody>
            `
            response['result'].forEach(element => {
                
                str+=`<tr><td name='order_id'>`+element['order_id']+`</td>`
                str+=`<td name='order_time'>`+element['time']+`</td>`
                str+=`<td name='order_time'>`+element['account']+`</td>`
                str+=`<td>`+element['name']+`</td>`
                str+=`<td>`+element['amount']+`</td>`
                str+=`<td><button type="button" class="btn btn-danger" name="del_order">刪除</button></td></tr>`
            });
            str += `
            </tbody>`

            document.getElementById('show').innerHTML = str
            let del_order = document.getElementsByName('del_order') ;
            for (let i = 0 ; i < del_order.length ; i ++){
                del_order[i].onclick = function(){
                    delorder('boss',document.getElementsByName('order_time')[i].innerText,document.getElementsByName('order_id')[i].innerText)
                    manage('com','order')
                }
            }
        }
    })
    }
}
function find_allcustomer(){
    request().post('/index.php?action=getCustomers')
    .then(res=>{
        let response = res['data']
        if (response['status']==200){
            let str =`
            <thead class="thead-dark">
            <tr>
              <th scope="col">顧客帳號</th>
              <th scope="col">顧客密碼</th>
              <th scope="col">顧客名稱</th>
              <th scope="col">顧客電子郵件</th>
              <th scope="col">顧客地址</th>
              <th scope="col">顧客行動電話</th>
              <th scope="col">顧客出生年月日</th>
              <th scope="col">功能選擇</th>
            </tr>
          </thead>
            <tbody>
            `
            response['result'].forEach(element => {
                str+=`<tr><td name='cus_acc'>`+element['account']+`</td>`
                str+=`<td name='cus_pwd'>`+element['passwd']+`</td>`
                str+=`<td>`+element['name']+`</td>`
                str+=`<td>`+element['email']+`</td>`
                str+=`<td>`+element['addr']+`</td>`
                str+=`<td>`+element['phone']+`</td>`
                str+=`<td>`+element['birth']+`</td>`
                str+=`<td><button type="button" class="btn btn-info" name="chge_cus">修改</button><button type="button" class="btn btn-danger" name="del_cus">刪除</button></td></tr>`
            });
            str += `
            </tbody>`
            document.getElementById('show').innerHTML = str
            let cus_id  = document.getElementsByName('cus_acc')
            let chge_cus = document.getElementsByName('chge_cus')
            let del_cus = document.getElementsByName('del_cus')
            chgecustomer()
            for (let i = 0 ; i < del_cus.length  ;i++ ){
                del_cus[i].onclick = function(){
                    delcustomer(cus_id[i].innerText)
                    find_customer()
                }
            }
        }
    })
}
export{find_food , find_order , find_allcustomer}