<?php
    namespace Controllers;
    use vendor\Controller;
    use Models\Employee as EmployeeModel;

    class Employee extends Controller{
        private $em;
        public function __construct(){
            $this->em = new EmployeeModel();
        }
        public function getEmployees(){

        return $this->em->getemployees();

        }
        public function getEmployee(){
            if (isset($_POST['id'])) {
                $id = $_POST['id'];
                return $this->em->getemployee($id);
            } else {
                echo('no_Id');
            }    
        }
        
        public function newEmployee(){
            $id = $_POST['id'];
            $name=$_POST['name'];
            $passwd = $_POST['passwd'];
            $addr = $_POST['addr'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            return $this->em->newemployee($id,$passwd,$name,$addr,$phone,$email);
        }

        public function removeEmployee(){
            $id = $_POST['id'];
            return $this->em->removeemployee($id);
        }

        public function updateEmployee(){
            $id = $_POST['id'];
            $name=$_POST['name'];
            $passwd = $_POST['passwd'];
            $addr = $_POST['addr'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            return $this->em->updateemployee($id,$passwd,$name,$addr,$phone,$email);
        }
    }