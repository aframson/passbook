<?php

#==================================================================================================
#                                 Mobile App Api (passBook)                                       
#==================================================================================================





function Check_total()
{
    include 'db.php';


    $json_input = file_get_contents('php://input');


    $data = json_decode($json_input, true);

    $date = $data['date'];
    $name = $data['name'];

    $fetch = mysqli_query($con, "SELECT * FROM signups WHERE now = '$date' AND extra1 = '$name' OR extra2 = '$name' ");

    while ($row = mysqli_fetch_array($fetch)) {
       
          $bag[] = $row['amount_collected'];

    }

        $results = array_sum($bag);

        echo json_encode($results);

}




function fetchDetail()
{

    include 'db.php';


    $json_input = file_get_contents('php://input');


    $data = json_decode($json_input, true);

    $name = $data['name'];

    $fetch = mysqli_query($con, "SELECT * FROM signups WHERE extra1 = '$name' OR extra2 = '$name' ORDER BY id DESC");


    while ($row  = mysqli_fetch_array($fetch)) {
        
        $message[] = $row;

      }



     echo json_encode($message);



}

function fetch_prod()
{
    include 'db.php';


    $json_input = file_get_contents('php://input');


    $data = json_decode($json_input, true);


    $search = $data['search'];


    $fetch = mysqli_query($con, "SELECT * FROM oracle WHERE name LIKE '%" . $search . "%'  ");


    while ($row  = mysqli_fetch_array($fetch)) {
        
            $message[] = $row;

    }



    echo json_encode($message);

}

function Register_user()
{

    include 'db.php';

    $json_input = file_get_contents('php://input');

    $data = json_decode($json_input, true); 

    $cus_id      = $data['cus_id'];
    $name        = $data['name'];
    $occupation  = $data['occupation'];
    $location    = $data['location'];
    $number      = $data['number'];
    $item_type   = $data['item_type'];   
    $item        = $data['item'];
    $price       = $data['price'];
    $amount_paid = $data['amount_paid'];
    $date_reg    = $data['date_reg'];
    $date_to_fin = $data['date_to_finish'];
    $person      = $data['person'];

    

    if (mysqli_query($con,"INSERT INTO signups(cus_id,name,occupation,location,phone_number,item_type,item,price,amount_paid,date_initiated,date_completion,extra1)
    VALUES('$cus_id','$name','$occupation','$location','$number','$item_type','$item','$price','$amount_paid','$date_reg','$date_to_fin','$person')")){

        $message[]  = 'done';

    }

        echo json_encode($message);
}



function update_user_info()
{
    include 'db.php';

    $json_input = file_get_contents('php://input');

    $data = json_decode($json_input, true);

    $update = $data['update'];

    $cus_id = $data['cus_id'];

    $name = $data['name'];

    $date = $data['date'];

    $check  = mysqli_query($con, "SELECT * FROM signups where cus_id = '$cus_id' ");

    $row = mysqli_fetch_array($check);

    $current_dept = $row['amount_paid'];

    $new_price = $current_dept + $update;


    if (mysqli_query($con, "UPDATE signups SET  amount_paid = '$new_price', extra2 = '$name', amount_collected = '$update', now = '$date'  WHERE cus_id = '$cus_id' ")) {
        $message[] = 'done';
    }


    echo json_encode($message);
}


function  fetch_user_det()
{
    include 'db.php';

    $json_input = file_get_contents('php://input');

    $data = json_decode($json_input, true);

    $search = $data['search'];

    $fetch = mysqli_query($con, "SELECT * FROM signups WHERE cus_id LIKE '%" . $search . "%'  ");


    while ($row = mysqli_fetch_array($fetch)) {

        $fetched_items[] = $row;
    }


    echo json_encode($fetched_items);
}



function Login()
{
    include 'db.php';

    $json_input = file_get_contents('php://input');

    $data = json_decode($json_input, true);

    $user_name = $data['uname'];
    $pass = $data['pass'];

    $check  = mysqli_query($con, "SELECT * FROM  staff WHERE usr_name = '$user_name' AND usr_pass = '$pass' ");

    if ($row = mysqli_fetch_array($check)) {

        $send_data[] = $row;
    }

    echo json_encode($send_data);
}

















#=====================================================================================================
#                                  End of mobile app Api(passBook)
#=====================================================================================================

function add()
{
    include 'db.php';

    $UserName = strtolower($_POST['uname']);
    $Password = rand(0, 999999);
    $cate = $_POST['cate'];
    $date = $_POST['date'];
    if (mysqli_query($con, "INSERT INTO staff(usr_name,usr_pass,date_registered,salesperson)VALUES('" . $UserName . "','" . $Password . "','" . $date . "','" . $cate . "')")) {
        echo "<h2 > Submission Successful...</h2>";
    }
}

function data()
{
    header("location:error.php");

    include 'db.php';

    $uname = strtolower($_POST['uname']);
    $upass = $_POST['upass'];

    if ($sele = mysqli_query($con, "SELECT * FROM stuff WHERE usr_name = '$uname' and usr_pass= '$upass' ")) {

        while ($row = mysqli_fetch_array($sele)) {

            $salesperson = $row['salesperson'];
            if ($salesperson == 'collectors') {
                $_SESSION['staff_id'] = $row['usr_id'];
                $_SESSION['staff_name'] = $row['usr_name'];
                $id = $_SESSION['staff_id'];
                mysqli_query($con, "INSERT INTO logs(salesperson_id)VALUES('" . $id . "')");
                //  echo '<script>window.location.href="staff/collect.php"</script>';
                echo '<script>window.location.href="success.php"</script>';
            }
            if ($salesperson == 'signups') {
                $_SESSION['staff_id'] = $row['usr_id'];
                $_SESSION['staff_name'] = $row['usr_name'];
                $id = $_SESSION['staff_id'];

                mysqli_query($con, "INSERT INTO logs(salesperson_id)VALUES('" . $id . "')");
                echo '<script>window.location.href="staff/signups.php"</script>';
            }
        }
    } else {
        echo "<h3> Oops could not Login </h3>";
    }
}
function data1()
{

    include 'db.php';

    $uname = strtolower($_POST['uname']);
    $upass = $_POST['upass'];
    header("location:success.php");

    //validation starts here
    // $con = mysqli_connect('localhost', 'root', '', 'PassBook');

    // Check connection
    /*  if ($con->connect_error) {
                    die("Connection failed: " . $con->connect_error);
                }
                    */
    $sql = "SELECT usr_name, usr_pass FROM stuff";
    $result = $con->query($sql);

    while ($row = mysqli_fetch_array($result)) {

        $name = $row['usr_name'];
        $password = $row['usr_pass'];
    }




    $vlue = ($name === $uname) ?  header("location:success.php") : "<h1>login details wrong<h2>";
    echo $vlue;

    $vlue1 = ($password === $upass) ?  header("location:success.php") : "<h1>login details wrong<h2>";
    echo $vlue1;

    echo "<h3> Oops could not Login </h3>";
}

function signups()
{
    include 'db.php';
    $cus_id = $_POST['cusid'];
    $name = $_POST['name'];
    $location = $_POST['location'];
    $phonum = $_POST['phonum'];
    $cate = $_POST['cate'];
    $order_name = $_POST['order'];
    $order_price = $_POST['price'];

    if (mysqli_query($con, "INSERT INTO signups(cus_id,name,location,pho_num,item,order_name,price)
    VALUES('" . $cus_id . "','" . $name . "','" . $location . "','" . $phonum . "','" . $cate . "','" . $order_name . "','" . $order_price . "')")) {
        echo "<h2> Submission Successful...</h2>";
    }
}

function signupform()
{
    $count = 0;


    include 'db.php';
    $cus_id = $_POST['cusid'];
    if ($cus_id != '') {
        $count = 1 + $count;
    }
    $name = $_POST['name'];
    if ($name != '') {

        $count = 1 + $count;
    }
    $location = $_POST['location'];

    if ($location != '') {
        $count = 1 + $count;
    }
    $phonum = $_POST['phonum'];

    if ($phonum != '') {
        $count = 1 + $count;
    }
    //  $cate = $_POST['cate'];
    // $order_name = $_POST['order'];
    $occupation = $_POST['occupation'];

    if ($occupation != '') {
        $count = 1 + $count;
    }
    $item_type = $_POST['item_type'];

    if ($item_type != '') {
        $count = 1 + $count;
    }
    $item = $_POST['item'];

    if ($item != '') {
        $count = 1 + $count;
    }
    $amount_paid = $_POST['amount_paid'];
    if ($amount_paid != '') {
        $count = 1 + $count;
    }
    $date_initiated = $_POST['date_initiated'];
    if ($date_initiated != '') {
        $count = 1 + $count;
    }
    $price = $_POST['price'];
    if ($price != '') {
        $count = 1 + $count;
    }
    $date_completion = $_POST['date_completion'];
    if ($date_completion != '') {
        $count = 1 + $count;
    }


    if ($count > 10) {
        $_SESSION['update'] = '';
        //$_SESSION['update'] = 'Submission Successful...';
        $_SESSION['update'] = 'Submission successful..!';

        //insert data into db
        if (mysqli_query($con, "INSERT INTO signups(cus_id,name,location,phone_number,item_type,item,occupation,price,amount_paid,date_initiated,date_completion,extra1)
            VALUES('" . $cus_id . "','" . $name . "','" . $location . "','" . $phonum . "','" . $item_type . "','" . $item . "','" . $occupation . "','" . $price . "','" . $amount_paid . "', '" . $date_initiated . "','" . $date_completion . "','" . $_SESSION['staff_name'] . "')"))

            //if data insertion fails
            if ($con->connect_error) {
                echo "failed to insert data into passbook databse <br>";

                die("Connection failed: " . $conn->connect_error);
            }




        $cus1 =   $cus_id;

        $details = mysqli_query($con, "SELECT * FROM signups WHERE cus_id = '$cus1'");


        //  $details = mysqli_query($con,"SELECT * FROM signups");

        while ($row = mysqli_fetch_array($details)) {

            # calculating for balance
            $amount_paid = $row['amount_paid'];
            $price = $row['price'];
            $balance = ($price - $amount_paid);

            #calculating for delivery status
            $delivered = 1;
            $delivered_not = 2;
            $about_delivered = 3;
            $color = null;

            if ($delivered == 1) {
                $color = 'green';
            }
            if ($delivered_not == 2) {
                $color = 'green';
            }
            if ($about_delivered == 3) {
                $color = 'green';
            }

            echo ' 
                        Submission successful..! <br>
                        <table class="tablefocus">
       <tr>
       <td id="focus_">CustomerID</td>
       <td id="focus_1">' . $row['cus_id'] . '</td>
       </tr>
       <tr>
       <td id="focus_">Name</td>
       <td id="focus_1">' . $row['name'] . '</td>
       </tr>
       <tr>
       <td id="focus_">Product</td>
       <td id="focus_1">' . $row['item'] . '</td>
       </tr>
       <tr>
       <td id="focus_">Product Type</td>
       <td id="focus_1">' . $row['item_type'] . '</td>
       </tr>
       <tr>
       <td id="focus_">Delivery Date</td>
       <td id="focus_1">' . $row['date_completion'] . '</td>
       </tr>
       <tr>
       <td id="focus_">Price</td>
       <td id="focus_1">' . $row['price'] . '</td>
       </tr>
       <tr>
       <td id="focus_">Amount Paid</td>
       <td id="focus_1">' . $row['amount_paid'] . '</td>
       </tr>
       <tr>
       <td id="focus_">Balance</td>
       <td id="focus_1">' . $balance . '</td>
       </tr>
     </table>
                    ';
        }
        //   echo   '<script>window.location.href="signups.php"</script>';

    } else {
        $_SESSION['update'] = " <h4> all fields are required, please fill all </h4>";
        /*  //delete
              $sql = "DELETE FROM signups WHERE cus_id = DK034";
    
            if ($con->query($sql) === TRUE) {
                echo "Record deleted successfully";
            } else {
                echo "Error deleting record: " . $con->error;
            }
              
    */
        //    echo " All fields are required, please fill all..!!!";
        echo  // '<script>window.location.href="signups.php"</script>';
            "<h4> all fields are required, please fill all </h4>";
    }
}

function addmoney()
{
    include 'db.php';
    $newAmount = $_POST['newamount'];

    if (mysqli_query($con, "INSERT INTO signups(cus_id,name,location,pho_num,item,order_name,price)
    VALUES('" . $cus_id . "','" . $name . "','" . $location . "','" . $phonum . "','" . $cate . "','" . $order_name . "','" . $order_price . "')")) {
        echo "<h3> Submission Successfull...</h3>";
    }
}

function live()
{
    include 'db.php';

    $value = $_POST['cid'];

    $sele = mysqli_query($con, "SELECT * FROM signups where cus_id = '$value' ");

    while ($row = mysqli_fetch_array($sele)) {
        $amount_paid = $row['amount_paid'];
        $price = $row['price'];
        $var1 =  $row['cus_id'];
        $balance = ($price - $amount_paid);
        $_SESSION['cus'] = $var1;

        echo '<div class="live">

                  <div class="gr1"><span id="d1">Customer Name :</span> ' . $row['name'] . '</div>
                  <div class="gr1"><span id="d1">Customer Location :</span> ' . $row['location'] . '</div>
                  <div class="gr1"><span id="d1">Customer Number :</span> ' . $row['phone_number'] . '</div>
                  <div class="gr1"><span id="d1">Item Type :</span> ' . $row['item'] . '</div>
                  <div class="gr1"><span id="d1">Item :</span> ' . $row['item_type'] . '</div>
                  <div class="gr1"><span id="d1">Item Price :</span> ' . $row['price'] . '</div>
                  <div class="gr1"><span id="d1">Date Registered :</span> ' . $row['date_initiated'] . '</div>
                  <div class="gr1"><span id="d1">Balance Left :</span> ' . $balance . '</div>
                 
                  <div>
                  <form action="insertcollect.php" id="collect_" method="POST">
                         
                            
  

                  <div class="gr1"><input type="text" class="inp" name="money" id="" placeholder="Ente recent amount paid required "> </div>
                  <input type="submit" name="newmoney" id="searchbtn_1"  value="Submit" class= "btn btn-primary">
                
                  
                  
                  </form> </div>
               </div>';
    }
}




/**
 * 
 */


function fetch_details()
{
    include 'db.php';

    $details = mysqli_query($con, "SELECT * FROM signups");

    while ($row = mysqli_fetch_array($details)) {

        # calculating for balance
        $amount_paid = $row['amount_paid'];
        $price = $row['price'];
        $balance = ($price - $amount_paid);

        #calculating for delivery status
        $delivered = 1;
        $delivered_not = 2;
        $about_delivered = 3;
        $color = null;

        if ($delivered == 1) {
            $color = 'green';
        }
        if ($delivered_not == 2) {
            $color = 'green';
        }
        if ($about_delivered == 3) {
            $color = 'green';
        }

        echo ' 
                   <tr >  
                   <td>' . $row['cus_id'] . '</td>
                   <td>' . $row['name'] . '</td>
                   <td>' . $row['phone_number'] . '</td>
                   <td>' . $row['location'] . '</td>
                   <td>' . $row['item'] . '</td>
                    <td>' . $row['item_type'] . '</td>
                     <td>' . $row['date_initiated'] . '</td>
                      <td>' . $row['date_completion'] . '</td>
                   <td>' . $price . '</td>
                   <td>' . $amount_paid . '</td>
                   <td>' . $balance . '</td>
                    <td>' . $row['extra1'] . '</td>
                  
                   
                    </tr>
               ';
    }
}

function fetch_details1()
{
    include 'db.php';
    $uname1 = $_SESSION['staff_name'];
    $details = mysqli_query($con, "SELECT * FROM signups WHERE extra1 = '$uname1'");


    $details = mysqli_query($con, "SELECT * FROM signups");

    while ($row = mysqli_fetch_array($details)) {

        # calculating for balance
        $amount_paid = $row['amount_paid'];
        $price = $row['price'];
        $balance = ($price - $amount_paid);

        #calculating for delivery status
        $delivered = 1;
        $delivered_not = 2;
        $about_delivered = 3;
        $color = null;

        if ($delivered == 1) {
            $color = 'green';
        }
        if ($delivered_not == 2) {
            $color = 'green';
        }
        if ($about_delivered == 3) {
            $color = 'green';
        }

        echo ' 
                   <tr >  
                   <td>' . $row['cus_id'] . '</td>
                   <td>' . $row['name'] . '</td>
                   
                   <td>' . $balance . '</td>
               
                
                   <td>' . '<button id="modify_">Update </button>' . '</td>
                  
                  
                   
                
                   
                    </tr>
               
  
               
               ';
    }
}


function recent_signups()
{
    include 'db.php';
    $uname1 = $_SESSION['staff_name'];
    $details = mysqli_query($con, "SELECT * FROM signups WHERE extra1 = '$uname1'");


    $details = mysqli_query($con, "SELECT * FROM signups  ORDER BY date_initiated DESC LIMIT 30");

    while ($row = mysqli_fetch_array($details)) {

        # calculating for balance
        $amount_paid = $row['amount_paid'];
        $price = $row['price'];
        $balance = ($price - $amount_paid);

        #calculating for delivery status
        $delivered = 1;
        $delivered_not = 2;
        $about_delivered = 3;
        $color = null;

        if ($delivered == 1) {
            $color = 'green';
        }
        if ($delivered_not == 2) {
            $color = 'green';
        }
        if ($about_delivered == 3) {
            $color = 'green';
        }

        echo ' 
               <tr>
               <td>' . $row['cus_id'] . '</td>
    <td>' . $row['name'] . '</td>
    
    <td>' . $balance . '</td>

 
    <td>' . '<button id="modify_">Update </button>' . '</td>
                   
                    </tr>
     
              
                    ';
    }
}

function pending_delivery()
{
    include 'db.php';

    $sele = mysqli_query($con, "SELECT * FROM signups where extra2 = 'not' ");

    while ($row = mysqli_fetch_array($sele)) {
        $amount_paid = $row['amount_paid'];
        $price = $row['price'];
        $balance = ($price - $amount_paid);
        echo '    
    
    <tr >  
    <td>' . $row['cus_id'] . '</td>
    <td>' . $row['name'] . '</td>
    
    <td>' . $balance . '</td>

 
    <td>' . '<button id="modify_">Update </button>' . '</td>';
    }
}

function agent_report()
{

    include 'db.php';
    $agent = $_REQUEST["agent_"];

    $sele = mysqli_query($con, "SELECT * FROM signups where extra1 = '$agent' ");

    while ($row = mysqli_fetch_array($sele)) {
        $amount_paid = $row['amount_paid'];
        $price = $row['price'];
        $balance = ($price - $amount_paid);


        echo '
    <td>' . $row['cus_id'] . '</td>
    <td>' . $row['name'] . '</td>
    
    <td>' . $balance . '</td>

 
    <td>' . '<button id="modify_">Update </button>' . '</td>';
    }
}
