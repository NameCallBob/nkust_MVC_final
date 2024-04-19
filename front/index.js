import { index, login } from "./page.js"
window.onload = function(){
    if (window.localStorage.getItem('jwtToken')!= null){
        index()
        // nav_func -> 導覽列
        
    }
    else{
        window.localStorage.setItem("jwtToken","");
        // location.reload();
        index()
    }
    }

    
