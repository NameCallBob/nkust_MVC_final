import request from "./check/request.js";
import { nav } from "./func.js";
import { index, manage } from "./page.js";
import { Page_Content } from "./page_content.js";

function chgeinfo(args=null){
    if (args != null){
        var data ={
            'account':args
        }
    }
    else{
        var data ={
            'account':window.sessionStorage.getItem('account')
        }
    }
    request().post("/index.php?action=getCustomer",Qs.stringify(data))
    .then(res=>{
        let response = res['data'];
        if(response['status']==200){
            let str =`
            <thead class="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
            <tbody>
            `
            response['result'].forEach(element => {
                if (args != null){
                    str+=`<tr><td>帳號</td><td><input class="form-control" aria-label="Default" type='text' name='info' readonly value='`+element['account']+`'></td></tr>`
                    str+=`<tr><td>密碼</td><td><input class="form-control" aria-label="Default" type='text' name='info' value='`+element['passwd']+`'></td></tr>`
                }
                str+=`<tr><td>姓名</td><td><input class="form-control" aria-label="Default" type='text' name='info' value='`+element['name']+`'></td></tr>`
                str+=`<tr><td>電子信箱</td><td><input class="form-control" aria-label="Default" type='text' name='info' value='`+element['email']+`'></td></tr>`
                str+=`<tr><td>地址</td><td><input class="form-control" aria-label="Default" type='text' name='info' value='`+element['addr']+`'></td></tr>`
                str+=`<tr><td>電話</td><td><input class="form-control" aria-label="Default" type='text' name='info' value='`+element['phone']+`'></td></tr>`
                str+=`<tr><td>生日</td><td><input class="form-control" aria-label="Default" type='date' name='info' value='`+element['birth']+`'></td></tr>`
                
            });
            str += `
            <tr><td colspan='2'><button type="button" class="btn btn-primary" id='submit'>送出</button></td></tr>
            </tbody>`

            document.getElementById('show').innerHTML = str
           document.getElementById('submit').onclick = function(){
            let info = document.getElementsByName('info')
            if (args != null){
                var data = {
                    'account':info[0].value,
                    'passwd':info[1].value,
                    'name':info[2].value ,
                    'email':info[3].value ,
                    'addr':info[4].value ,
                    'phone':info[5].value ,
                    'birth':info[6].value ,

                }
            }
            else{
                var data = {
                    'account':window.sessionStorage.getItem('account'),
                    'name':info[0].value ,
                    'email':info[1].value ,
                    'addr':info[2].value ,
                    'phone':info[3].value ,
                    'birth':info[4].value ,
    
                }
            }
            
            request().post('/index.php?action=updateCustomer',Qs.stringify(data))
            .then(res=>{
                let response = res['data'];
                if (response['status']==200){
                    alert('修改成功')   
                    if (args == null){manage('cus')}
                    else{manage('com','customer')}
                }
                else{
                    alert('修改失敗')
                    if (args == null){manage('cus')}
                    else{manage('com','customer')}
                }
            })
           }
        }
    })
}
function chgepwd(){
    let str =`
    <thead class="thead-dark">
    <tr>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
  </thead>
    <tbody>
    <tr><td>想要更改的密碼</td><td><input class="form-control" aria-label="Default" type='text' id='info' value=''></td>
    `

    str += `
    <tr><td colspan='2'><button type="button" class="btn btn-primary" id='submit'>送出</button></td></tr>
    </tbody>`

    document.getElementById('show').innerHTML = str
   document.getElementById('submit').onclick = function(){
    let data = {
        'account':window.sessionStorage.getItem('account'),
        'passwd':document.getElementById('info').value
    }
    request().post('index.php?action=updateCustomer',Qs.stringify(data))
    .then(res=>{
        let response = res['data'];
        if (response['status']==200){
            alert('修改成功')   
            manage()
        }
        else{
            alert('修改失敗')
            manage()
        }
    })
    document.getElementById('info')
   }
}


function chgefood_pg_func(){
    
    let chge = document.getElementsByName('chgeit')
    for (let i = 0 ; i < chge.length ; i++){
        chge[i].onclick = function(){
            let name = chge[i].value
            chgeit(name)
        }
    }
    function chgeit(name){
        let data = {
            'name':name
        }
    
        request().post("/index.php?action=getProduct", Qs.stringify(data))
        .then(res=>{
            let response = res['data'];
            if(response['status'] == 200){
                let str =`
                <thead class="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
                <tbody>
                `
                response['result'].forEach(element => {
                str+=`<tr><td>商品編號</td><td id='fd_id'>`+element['fd_id']+`</td></tr>`
                str+=`<tr><td>商品類別</td><td><input class="form-control" aria-label="Default" type='text' name='info' value='`+element['type']+`'></td></tr>`
                str+=`<tr><td>商品名稱</td><td><input class="form-control" aria-label="Default" type='text' name='info' value='`+element['name']+`'></td></tr>`
                str+=`<tr><td>商品價格</td><td><input class="form-control" aria-label="Default" type='text' name='info' value='`+element['price']+`'></td></tr>`
                str+=`<tr><td>是否供應</td><td><input class="form-control" aria-label="Default" type='text' name='info' value='`+element['status']+`'></td></tr>`
                })
                str += `
                <tr><td colspan='2'><button type="button" class="btn btn-primary" id='submit'>送出</button></td></tr>
                </tbody>`
                let page = new Page_Content
                nav()
                document.getElementById('root').innerHTML = page.mainpage('com_manage')
                document.getElementById('show').innerHTML = str
                document.getElementById('submit').onclick = function(){
                    let info = document.getElementsByName('info')
                    data = {
                        'fd_id':document.getElementById('fd_id').innerText,
                        'type':info[0].value,
                        'name':info[1].value,
                        'price':info[2].value,
                        'status':info[3].value
                    }
                    request().post("/index.php?action=updateProduct",Qs.stringify(data))
                    .then(res=>{
                        let response = res['data'];
                        if (response['status'] == 200){
                            alert('修改成功')
                            index(null,null,'com')
                        }
                    })
                }
            }
        })
    }
    
}

function chgecustomer(){
    let  chge_cus = document.getElementsByName('chge_cus')
    let cus_id  = document.getElementsByName('cus_acc')

    for (let i = 0 ; i < chge_cus.length;i++){
        chge_cus[i].onclick = function(){
            chgeinfo(cus_id[i].innerText)
        }
    }
    
}
export {chgeinfo,chgepwd,chgefood_pg_func,chgecustomer}