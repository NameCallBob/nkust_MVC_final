<?php

namespace Middlewares;
use app\controller\Employee;
use \Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use vendor\Controller;
use Models\Employee as EmployeeModel;
use Models\Customer as CustomerModel;
use Models\Action;
class AuthMiddleware extends Controller{
    private static $account; 
    public static function checktoken(){
        $header = getallheaders();
        $jwt = $header['Authorization'];
        $secret = "hello world";
        try{
            $payload = JWT::decode($jwt,new Key($secret,'HS256'));
            self::$account = $payload->data->account;
            $jwt = self::gentoken($payload -> data -> account);
            $response['status'] = 200;
            $response['message'] = "Access granted";
            $response['token'] = $jwt;
        }
        catch (Exception $e){
            $response['status'] = 403 ;
            $response['message'] = $e -> getMessage();
        }
        return $response;
        }
    public static function checkPrevilege($action){
        $account = self::$account;
        $em = new CustomerModel();
        $response = $em->getRoles($account);
        $user_roles = $response['result'];
        
        $am = new Action();
        $response = $am->getRoles($action);
        $action_roles = $response['result'];
        
        $r = array_intersect($user_roles, $action_roles);
        
        if(count($r)!= 0 ){
            return self::response(200, '有權限');
        }
        else{
            $em = new EmployeeModel();
            $response = $em->getRoles($account);
            $user_roles = $response['result'];
            
            $am = new Action();
            $response = $am->getRoles($action);
            $action_roles = $response['result'];
            
            $r = array_intersect($user_roles, $action_roles);
            if(count($r) != 0){
                return self::response(200, '有權限');
            }
            else{
                return self::response(403, '權限不足');
        }
            }
            
    }
    public static function dologin(){
        $account = $_POST['account'];
        $passwd = $_POST['password'];
        $em = new CustomerModel();
        $response = $em -> checkidpw($account, $passwd);
        if($response['status'] == 200){
        $jwt = self::gentoken($account);
        $response['status'] = 200;
        $response['message']='Access granted';
        $response['token'] = $jwt;
        }
        else{
        $response['status'] = 404;
        $response['message']='not found';
      
        }

        return $response;
    }
    public static function dologin_em(){
        $account = $_POST['account'];
        $passwd = $_POST['password'];
        $em = new EmployeeModel();
        $response = $em -> checkidpw($account, $passwd);
        if($response['status'] == 200){
        $jwt = self::gentoken($account);
        $response['status'] = 200;
        $response['message']='Access granted';
        $response['token'] = $jwt;
        }
        else{
        $response['status'] = 404;
        $response['message']='not found';

        }

        return $response;
    }

    private static function gentoken($account){
        $secret_key = "hello world";
        $issuer_claim = "http://localhost";
        $audience_claim = 'http://localhost';
        $issuedat_claim = time();
        $expire_claim = $issuedat_claim + 1000;
        $payload = array(
            "iss" => $issuer_claim,
            "aud" => $audience_claim,
            "iat" => $issuedat_claim,
            "exp" => $expire_claim,
            "data" => array(
                "account" => $account
            )
        );
        $jwt = JWT::encode($payload,$secret_key,"HS256") ;
        return $jwt;
        
    }
}
