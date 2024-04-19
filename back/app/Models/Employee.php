<?php
namespace Models;
use vendor\DB;

class Employee{

    public function getRoles($id){
        $sql = "SELECT role_id FROM `user_role` WHERE `user_id` = ? ";
        $arg = array($id);
        $response = DB::select($sql, $arg);
        $result = $response['result'];
        for ($i = 0; $i < count($result); $i++){
            $result[$i] = $result[$i]['role_id'];
            // echo $result[$i]['role_id'];
        }
        $response['result'] = $result;
        return $response;
    }

    public function checkidpw($id,$pw){
        $sql = "SELECT * FROM `company` WHERE `user_id`=? and `passwd` =?;";
        $arg = array($id,$pw);
        $response = DB::select($sql, $arg);
        $rows = $response['result'];
        if (count($rows)==0){
            $response['status'] = 404;
            $response['message'] = '帳號或密碼錯誤';
        }
        return $response;

    }

    public function getemployees(){
        $sql = "SELECT * FROM `company`";
        $arg = NULL;
        return DB::select($sql,$arg);
    }
    public function getemployee($id){

        $sql = "SELECT * FROM `company` WHERE `user_id`=?";           
        $arg = array($id);
        return DB::select($sql,$arg);
    }
    public function newemployee($id,$passwd,$name,$addr,$phone,$email){
        $sql = "INSERT INTO `company` (`user_id`,`passwd`,`name`,`addr`,`phone`,`email`)VALUES(?,?,?,?,?,?)";
        return DB::insert($sql,array($id,$passwd,$name,$addr,$phone,$email));
    }
    public function removeemployee($id){
        $sql = "DELETE FROM `company` WHERE user_id=?";
        return DB::delete($sql,array($id));
    }
    public function updateemployee($id,$passwd,$name,$addr,$phone,$email){
        $sql = "UPDATE `company` SET `passwd`=?,`name`=?,`addr`=?,`phone`=?,`email`=? WHERE user_id=?";
        return DB::update($sql,array($passwd,$name,$addr,$phone,$email,$id));
    }
}