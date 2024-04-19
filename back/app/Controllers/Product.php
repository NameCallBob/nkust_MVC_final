<?php
    namespace Controllers;
    use vendor\Controller;
    use vendor\DB;
    use Models\Product as ProductModel;

    class Product extends Controller{
        private $rm;
        public function __construct(){
            $this->rm = new ProductModel();
        }

        public function getProducts(){
        return $this->rm->getProducts();
        }
        public function getProduct(){
            return $this->rm->getProduct();
        // if(isset($_POST['name'])){
        //     $name = $_POST['name'];
        //     return $this->rm->getProduct($name);
        // }
        // else if (isset($_POST['type'])){
        //     $type = $_POST['type'];
        //     return $this->rm->getProduct($type);
        // }
    
        }

        public function newProduct(){
            $name = $_POST['name'];
            $status = $_POST['status'];
            $price = $_POST['price'];
            return $this -> rm -> newProduct($name,$price,$status);
        }
        function removeProduct(){
            $id = $_POST['fd_id'];
        return $this->rm->removeproduct($id);
        } 
        function updateProduct(){
            $id = $_POST['fd_id'];
            $name = $_POST['name'];
            $price = $_POST['price'];
            $status = $_POST['status'];
            return $this->rm->updateproduct($id,$name,$price,$status)   ;     }
    }