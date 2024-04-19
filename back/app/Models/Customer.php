<?php
namespace Models;
use vendor\DB;

class Customer{
    /**
     * 取得權限
     * @param mixed $account
     * @return array
     */
    public function getRoles($account){
        $sql = "SELECT role_id FROM `user_role` WHERE `account` = ? ";
        $arg = array($account);
        $response = DB::select($sql, $arg);
        $result = $response['result'];
        for ($i = 0; $i < count($result); $i++){
            $result[$i] = $result[$i]['role_id'];
        }
        $response['result'] = $result;
        return $response;
    }

    /**
     * 檢查密碼
     * @param mixed $account
     * @param mixed $pw
     * @return array
     */
    public function checkidpw($account,$pw){
        $sql = "SELECT * FROM `customer` WHERE `account`=? and `passwd` =?;";
        $arg = array($account,$pw);
        $response = DB::select($sql, $arg);
        $rows = $response['result'];
        if (count($rows)==0){
            $response['status'] = 404;
            $response['message'] = '帳號或密碼錯誤';
        }
        return $response;

    }
    public function giverole($account){
        for ($i = 1 ; $i < 3 ; $i = $i + 1){
            $sql = "INSERT INTO `user_role` (`id`, `account`, `user_id`, `role_id`) VALUES (NULL, '$account', NULL, '$i')";
            DB::insert($sql, null);
        }
        
    }
    /**
     * 查詢顧客
     * @return array
     */
    public function getCustomers(){

        $sql = "SELECT * FROM `customer`";
        $arg = NULL;
        return DB::select($sql,$arg);

    }
    /**
     * 查詢單一顧客
     * @param mixed $id
     * @return array
     */

    public function getCustomer($id){

        $sql = "SELECT * FROM `customer` WHERE `account`=?";           
        $arg = array($id);
        return DB::select($sql,$arg);

    }
    public function newCustomer($account,$passwd,$name,$email,$addr,$phone,$birth){

        $sql = "INSERT INTO `customer` (`account`,`passwd`,`name`,`email`,`addr`,`phone`,`birth`)VALUES(?,?,?,?,?,?,?)";
        self::giverole($account);
        return DB::insert($sql,array($account,$passwd,$name,$email,$addr,$phone,$birth));

    }
    public function removeCustomer($id){

        $sql = "DELETE FROM `customer` WHERE cus_id=?";
        return DB::delete($sql,array($id));

    }
    public function updateCustomer($id=null,$passwd=null,$name=null,$email=null,$addr=null,$phone=null,$birth=null){
        if ($passwd != null and $name != null) {
            $sql = "UPDATE `customer` SET `passwd`=?,`name`=?,`email`=?,`addr`=?,`phone`=?,`birth`=? WHERE account=?";
            return DB::update($sql,array($passwd,$name,$email,$addr,$phone,$birth,$id));
        }
        else if($passwd != null){
            $sql = "UPDATE `customer` SET `passwd`=? WHERE account=?";
            return DB::update($sql,array($passwd,$id));

        }
        else{
            $sql = "UPDATE `customer` SET `name`=?,`email`=?,`addr`=?,`phone`=?,`birth`=? WHERE account=?";
            return DB::update($sql,array($name,$email,$addr,$phone,$birth,$id));
        }
        

    }
}