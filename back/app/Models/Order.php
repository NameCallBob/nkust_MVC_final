<?php
namespace Models;
use vendor\DB;

class Order{

    // public function getRoles($id){
    //     $sql = "SELECT role_id FROM `user_role` WHERE `user_id` = ? ";
    //     $arg = array($id);
    //     $response = DB::select($sql, $arg);
    //     $result = $response['result'];
    //     for ($i = 0; $i < count($result); $i++){
    //         $result[$i] = $result[$i]['role_id'];
    //     }
    //     $response['result'] = $result;
    //     return $response;
    // }

    // public function checkidpw($id,$pw){
    //     $sql = "SELECT * FROM `user` WHERE `id`=? and `passwd` =?;";
    //     $arg = array($id,$pw);
    //     $response = DB::select($sql, $arg);
    //     $rows = $response['result'];
    //     if (count($rows)==0){
    //         $response['status'] = 404;
    //         $response['message'] = '帳號或密碼錯誤';
    //     }

    //     return $response;

    // }

    public function getOrders(){
        $sql = "SELECT * FROM `fd_order`";
        $arg = NULL;
        return DB::select($sql,$arg);
    }

    /**
     * 用於-查詢特定顧客的訂單
     * @param mixed $id
     * @return array
     */
    public function getOrder($account){

        $sql = "SELECT * FROM `fd_order` WHERE `account`=?";           
        $arg = array($account);
        return DB::select($sql,$arg);
    }

    public function newOrder($time,$id,$name,$amount){
        $sql = "INSERT INTO `fd_order` (`time`, `order_id`, `account`, `name`, `amount`)VALUES(?,NULL,?,?,?)";
        return DB::insert($sql,array($time,$id,$name,$amount));
    }

    public function removeOrder($id){
        $sql = "DELETE FROM `fd_order` WHERE order_id=?";
        return DB::delete($sql,array($id));
    }

    public function updateOrder($time,$id,$name,$amount){
        $sql = "UPDATE `fd_order` SET `time`=?,`name`=?,`amount`=? WHERE order_id=?";
        return DB::update($sql,array($time,$name,$amount,$id));
    
    }

}