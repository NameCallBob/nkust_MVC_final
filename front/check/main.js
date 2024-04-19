import startPage from '../startPage.js';
import employeeInfo from '../info/employeeInfo.js';
import productInfo from '../info/productInfo.js';
import roleInfo from '../info/roleInfo.js';
import supplierInfo from '../info/supplierInfo.js';

export default function startPage_m(){
     document.getElementById("root").innerHTML = startPage();
    document.getElementById("employee").onclick = function(){
        employeeInfo();
    };
    document.getElementById("product").onclick = function(){
        productInfo();
    };
    document.getElementById("role").onclick = function(){
        roleInfo();
    };
    document.getElementById("supplier").onclick = function(){
        supplierInfo();
    }
    
};   

