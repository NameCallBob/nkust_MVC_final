<?php
require_once __DIR__ . "/../vendor/autoload.php";

use Middlewares\AuthMiddleware;
use vendor\DB;
use vendor\Router;

class Main{
    public static function run(){
        $conf = parse_ini_file(__DIR__.'/../vendor/.env');
        DB::$dbHost = $conf['dbHost'];
        DB::$dbName = $conf['dbName'];
        DB::$dbUser = $conf['dbUser'];
        DB::$dbPassword = $conf['dbPassword'];

        if(isset($_GET['action'])){
            $action = $_GET['action'];
        }else{
            $action = "no_action";
        }
        if ($action == "newCustomer"){
            $router = new Router();
            require_once __DIR__."/../routes/web.php";
            $response = $router->run($action);
        }
        else{
            $response = $responseToken = AuthMiddleware::checktoken();
            if ($responseToken['status'] == 200){
                if($action == 'getProducts' or $action == 'getProduct'){
                    if($response['status'] == 200){
                        $router = new Router();
                        require_once __DIR__."/../routes/web.php";
                        $response = $router->run($action);
                        }
                }
                else if ($action != 'no_action'){
                    $response = AuthMiddleware::checkPrevilege($action);
                    if($response['status'] == 200){
                        $router = new Router();
                        require_once __DIR__."/../routes/web.php";
                        $response = $router->run($action);
                        }
                    }
                $response['token'] = $responseToken['token'];
            }
            else{
                if ($action == "dologin"){
                    $response = AuthMiddleware::dologin();
                    if($response['status'] != 200){
                        $response = AuthMiddleware::dologin_em(); 
                    }
                }
                
            }
    
        }
        
        echo json_encode($response);
    }
}
