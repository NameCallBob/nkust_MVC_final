<?php
namespace Models;
use vendor\DB;

class Product{

    /**
     * 用於-查詢Product的列表(可供應)
     * @return array
     */

    public function getProducts(){
        $sql = "SELECT * FROM `food` WHERE `status` = 1 ; ";
        $arg = NULL;
        return DB::select($sql,$arg);
    }

    /**
     * 用於-使用名子查詢Product
     * @param string $name
     */
    public function getProduct(){
        if(isset($_POST['name'])){
            $tmp = $_POST['name'];
        $sql = "SELECT * FROM `food` WHERE `name` like '%$tmp%' and `status` = 1 ; ";
        }
        else if (isset($_POST['type'])){
            $tmp = $_POST['type'];
        $sql = "SELECT * FROM `food` WHERE `type` like '%$tmp%' and `status` = 1 ; ";
        }
        $arg = null;
        return DB::select($sql,$arg);

    }
    /**
     * 用於-新增產品(員工)
     * @param string $name
     * @param string $price
     * @param string $status
     */

    public function newProduct($name,$price,$status){

        $sql = "INSERT INTO `food` (`fd_id`,`name`,`price`,`status`)VALUES(NULL,?,?,?)";
        return DB::insert($sql,array($name,$price,$status));

    }

    /**
     * 用於-刪除產品
     * @param string $id
     * @return array
     */
    public function removeproduct($id){
        $sql = "DELETE FROM `food` WHERE fd_id=?";
        return DB::delete($sql,array($id));
    }   
    
     public function updateproduct($id,$name,$price,$status){
        $sql = "UPDATE `food` SET `name`=?,`price`=?,`status` =? WHERE fd_id=?";
        return DB::update($sql,array($name,$price,$status,$id));
    }
}


?>