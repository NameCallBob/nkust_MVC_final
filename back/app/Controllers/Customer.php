<?php
    namespace Controllers;
    use vendor\Controller;
    use Models\Customer as CustomerModel;

    class Customer extends Controller{
        private $em;
        public function __construct(){
            $this->em = new CustomerModel();
        }

       
        public function getCustomers(){
        return $this->em->getCustomers();
        }
        public function getCustomer(){
            if (isset($_POST['account'])) {
                $id = $_POST['account'];
                return $this->em->getCustomer($id);
            } else {
                echo('no_Id');
            }    
        }
        public function newCustomer(){
            
            $name=$_POST['name'];
            $account = $_POST['account'];
            $passwd = $_POST['passwd'];
            $addr = $_POST['addr'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $birth = $_POST['birth'];
            return $this->em->newCustomer($account,$passwd,$name,$email,$addr,$phone,$birth);
        }

        public function removeCustomer(){
            $id = $_POST['id'];

            return $this->em->removeCustomer($id);
        }

        public function updateCustomer(){
            if (isset($_POST['passwd']) and isset($_POST['name'])){
                $id = $_POST['account'];
                $name=$_POST['name'];
                $passwd = $_POST['passwd'];
                $addr = $_POST['addr'];
                $email = $_POST['email'];
                $phone = $_POST['phone'];
                $birth = $_POST['birth'];
                return $this->em->updateCustomer($id,$passwd,$name,$email,$addr,$phone,$birth);
            }
            else if(isset($_POST['passwd'])){
                $id = $_POST['account'];
                $passwd = $_POST['passwd'];
                return $this->em->updateCustomer($id,$passwd);
            } 
            
            else {
            $id = $_POST['account'];
            $name=$_POST['name'];
            $passwd = null;
            $addr = $_POST['addr'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $birth = $_POST['birth'];
            return $this->em->updateCustomer($id,$passwd,$name,$email,$addr,$phone,$birth);
        }
           
        }
    }