import request from "./check/request.js"
import { find_order } from "./find_func.js"
import {login,index, shopping_car, manage} from "./page.js"
function chgequa(){
    if (window.sessionStorage.getItem('order_now')){
        let order_now = JSON.parse(window.sessionStorage.getItem('order_now'))
        let minus = document.getElementsByName('minus')
        let plus = document.getElementsByName('plus')
        let name = document.getElementsByName('fd_name')
        let qty = document.getElementsByName('fd_qty')
    // 偵測+
        for (let i = 0 ; i < plus.length ; i++){
        plus[i].onclick = function(){
            if(parseInt(qty[i].innerText) == 10 ){
                alert('最多訂購10份喔')
            }
            else{
                order_now[name[i].innerText] = parseInt(qty[i].innerText) + 1
                qty[i].innerText =  parseInt(qty[i].innerText) + 1
                window.sessionStorage.setItem('order_now',JSON.stringify(order_now))
            }
            
        }
        }
    // 偵測-
        for (let i = 0 ; i < minus.length ; i++){
        minus[i].onclick = function(){
            if (qty[i].innerText == "0")  {
                alert('不能在減了:D')
            }
            else{
                if((parseInt(qty[i].innerText) - 1) == 0){
                    delete order_now[name[i].innerText];
                    qty[i].innerText =  parseInt(qty[i].innerText) - 1
                }
                else{
                    order_now[name[i].innerText] = parseInt(qty[i].innerText) - 1
                    qty[i].innerText =  parseInt(qty[i].innerText) - 1
                    window.sessionStorage.setItem('order_now',JSON.stringify(order_now))
                }
               }
             }
            }
   

    
    }
    else{
        window.sessionStorage.setItem('order_now',JSON.stringify({}))
        chgequa()
    }

}
function nav(){
    let nav_func = document.getElementsByName('nav_func')
        nav_func[2].onclick = function(){login()}
        nav_func[0].onclick = function(){alert('未開放');index()}
        // 菜單頁面
        nav_func[1].onclick = function(){index()}
        // 購物車葉面
        nav_func[3].onclick = function(){shopping_car()}
            
        
    request().get("/index.php")
    .then(res => {
        let response = res['data']
        if(response['status'] == 200){
                    nav_func[4].innerText = '登出'
                    nav_func[2].innerText = '會員中心'
                    nav_func[2].onclick = function(){
                    manage('cus')
                    } 
                    nav_func[0].onclick = function(){
                        alert('未開放');index()
                    }
                    // 菜單頁面
                    nav_func[1].onclick = function(){
                        index()
                    }
                    // 購物車葉面
                    nav_func[3].onclick = function(){
                        shopping_car()
                    }
                    nav_func[4].onclick = function(){
                        
                        window.localStorage.setItem('jwtToken','')
                        index()
                    
                }
            }
            //登入過
       
    })
    // 管理員權限判斷
    request().get("/index.php?action=getOrders")
            .then(res=>{
                let response = res['data'];
                if (response['status']==200){
                    nav_func[4].innerText = '登出'
                    nav_func[2].innerText = '顧客管理'
                    nav_func[1].innerText = '商品管理'
                    nav_func[3].innerText = '訂單管理'
                    nav_func[2].onclick = function(){
                        manage('com','customer')
                    } 
                    nav_func[0].onclick = function(){
                        alert('未開放');index()
                    }
                    // 產品頁面
                    nav_func[1].onclick = function(){
                        index(null,null,'com')
                    }
                    // 訂單管理
                    nav_func[3].onclick = function(){
                        
                        manage('com','order')
                    }
                    nav_func[4].onclick = function(){
                        
                        window.localStorage.setItem('jwtToken','')
                        index()
                    }
                    
                } 
            })
        
        
        
    
    // 關於我頁面
   
}

export {chgequa ,nav}