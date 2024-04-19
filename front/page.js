import { Page_Content } from "./page_content.js";
import request from "./check/request.js";
import { chgeinfo,chgepwd } from "./chge_func.js";
import { chgequa,nav } from "./func.js";
import { find_allcustomer, find_food, find_order } from "./find_func.js";
import { new_order } from "./new_func.js";
var page = new Page_Content()
/**
 *  呈現菜單
 */
function index(what = null,args = null, who = 'cus'){ 
    if (who == 'com'){
        document.getElementById('root').innerHTML = page.mainpage('food');
        let fd_type = document.getElementsByName('fd-type')
                nav()
                find_food(what,args,'com')
                fd_type[0].onclick = function(){
                    index(null,null,'com');
                }
                fd_type[1].onclick = function(){
                    index('type','meat','com');
                }
                fd_type[2].onclick = function(){
                    index('type','veg','com');
                }
                fd_type[3].onclick = function(){
                    index('type','other','com');
                }
                fd_type[4].onclick = function(){
                    index('type','drink','com');
                }
    
    }
    else if (who == 'cus'){
        document.getElementById('root').innerHTML = page.mainpage('food');
        let fd_type = document.getElementsByName('fd-type')
                nav()
                find_food(what,args,'cus')
                fd_type[0].onclick = function(){
                    index();
                }
                fd_type[1].onclick = function(){
                    index('type','meat');
                }
                fd_type[2].onclick = function(){
                    index('type','veg');
                }
                fd_type[3].onclick = function(){
                    index('type','other');
                }
                fd_type[4].onclick = function(){
                    index('type','drink');
                }
    
    }
    else{
        console.log('not found')
    }
            


}
/**
 *  呈現登入畫面
 */
function login(){
    
    document.getElementById('root').innerHTML = page.mainpage('login');nav()
    document.getElementById('login').onclick = function(){
    let data = {
            'account':document.getElementById('Account').value,
            'password':document.getElementById('Password').value
        }
        request().post("/index.php?action=dologin",Qs.stringify(data))
        .then(res => {
            let response = res['data'];
            if (response['status'] == 200){
                let welcome = '';
                let cus_name = response['result'][0]['name']
                welcome = welcome + cus_name +'歡迎\n進行點餐ㄅ!'
                window.localStorage.setItem('jwtToken',response['token'])
                alert(welcome)
                window.sessionStorage.setItem('account',document.getElementById('Account').value)
                index()
            }
            else{
                
                document.getElementById('wrong').innerText = '帳號不存在 或 密碼錯誤 :('
                login()
            }
        })
    }
    document.getElementById('register').onclick = function(){
        register()
    }
    
}
/**
 *  呈現註冊畫面
 */
function register(){
    nav()
    document.getElementById('root').innerHTML = page.mainpage('register');
    document.getElementById('submit').onclick = function(){
        let cus_data = document.getElementsByName('reg_data')
        let data = {
            'account':cus_data[0].value,
            'passwd':cus_data[1].value,
            'name':cus_data[2].value,
            'birth':cus_data[3].value,
            'email':cus_data[4].value,
            'phone':cus_data[5].value,
            'addr':cus_data[6].value
        }
        request().post("/index.php?action=newCustomer",Qs.stringify(data))
        .then(res=>{
            let response = res['data']
            if (response['status'] == 200 ){
                alert('註冊成功')
                index(null,null,'cus')
            }
            else{
                alert('帳號已經存在!')
               register()
            }
        })
    }
}
/**
 *  呈現購物車
 */
function shopping_car(){
    nav()
    let date = new Date()
    document.getElementById('root').innerHTML = page.mainpage('car');
    let data = JSON.parse(window.sessionStorage.getItem('order_now'))
    let str = ``
    for (let key in data){
        str += ` <th scope="row">
                <div class="p-2" name='food'>`+key+`</div>
              </th>
              `
        str += ` <td class="align-middle"><strong name='qty'>`+data[key]+`</strong></td> <td class="align-middle"><button type="button" class="btn btn-danger" name="del_order">刪除</button></td></tr>`
    }
    str += `<tr><td colspan=2>預計領取時間：<input type='date' id='date'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='time' id='time' min='`+date.getHours()+`:00'></tr>
    <tr>
              <td colspan="4" style="text-align: center;"><button type="button" id='submit'class="btn btn-success align-content-lg-center">送出訂單</button></td>
            </tr>`
            
    document.getElementById('show').innerHTML = str;
    
    let del_order = document.getElementsByName('del_order')
    let tmp = document.getElementsByName('food')
    let newdict = {}
    for (let i = 0 ; i < del_order.length ; i++){
        del_order[i].onclick = function(){
            for (let key in data ){
                if (key != tmp[i].innerText){
                    newdict[key] = data[key]
                    console.log(newdict)
                }
            }
            delete data[document.getElementsByName('food').innerText]
            window.sessionStorage.setItem('order_now',JSON.stringify(newdict))
            shopping_car()
        }
    }
    console.log('load done')
    document.getElementById('submit').onclick = function(){
       new_order()
       window.sessionStorage.setItem('order_now',JSON.stringify({}))

    }
 
   
}
/**
 *  呈現管理介面
 */
function manage(who , type=null){
    if (who == 'cus'){
        nav()
        document.getElementById('root').innerHTML = page.mainpage('manage');
        document.getElementById('myinfo').onclick = function(){
            let data = {
                'account':window.sessionStorage.getItem('account')
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
                        
                        str+=`<tr><td>姓名</td><td>`+element['name']+`</td></tr>`
                        str+=`<tr><td>電子信箱</td><td>`+element['email']+`</td></tr>`
                        str+=`<tr><td>地址</td><td>`+element['addr']+`</td></tr>`
                        str+=`<tr><td>電話</td><td>`+element['phone']+`</td></tr>`
                        str+=`<tr><td>生日</td><td>`+element['birth']+`</td></tr>`
                        
                    });
                    str += `
                    <tr><td><button type="button" class="btn btn-info" id='chgepwd'>更改密碼</button></td><td><button type="button" class="btn btn-info" id='chgeinfo'>更改個人資訊</button></td></tr>
                    </tbody>`
    
                    document.getElementById('show').innerHTML = str
                    document.getElementById('chgeinfo').onclick = function(){
                        chgeinfo()
                    }
                    document.getElementById('chgepwd').onclick = function(){
                        chgepwd()
                    }
                }
            })
        }
        document.getElementById('search_for_order').onclick = function(){
            find_order('cus')
        }
    }
    else if (who == 'com'){
        nav()
        document.getElementById('root').innerHTML = page.mainpage('com_manage')
        if (type == 'customer'){
            find_allcustomer()
        }
        else if (type == 'order'){
            find_order('com')
        }
    }
    else{
        console.log('manage for who? not found')
    }
   
}

export {index,login,shopping_car,manage}