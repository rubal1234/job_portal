<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "job_portal";
$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


if(isset($_POST["employeer"])){
	$company_name = $_POST["company_name"];
	$job_requirement = $_POST["job_requirement"];
	$job_responsiblity = $_POST["job_responsiblity"];
	$job_location = $_POST["job_location"];
	$experiance = $_POST["experiance"];
	$salary = $_POST["salary"];
	$key_skills = $_POST["key_skills"];

	$sql = "INSERT INTO employeer(company_name,job_requirements,job_responsiblities,job_location,experiance,salary,skills) VALUES ('$company_name','$job_requirement','$job_responsiblity','$job_location','$experiance','$salary','$key_skills')";

	if ($conn->query($sql) === TRUE) {
           echo "New record created successfully";
    } else {
            echo "Failed";
    }
  }

  if(isset($_POST["fetchall"])){
  	$query = "SELECT * FROM employeer";
  	$result = $conn->query($query);
    $all_data = array();
  	if($result->num_rows > 0){
  		
  		while($row = $result->fetch_assoc()){
  			  $arr = [];
  		      array_push($arr,$row["company_name"],$row["job_requirements"],$row["job_responsiblities"],$row["job_location"],$row["experiance"],$row["salary"],$row["skills"]);
  		      array_push($all_data,$arr);
               
  		}
  		
  	}

  	  	echo json_encode($all_data);
  	
  }

  if(isset($_POST["applicants"])){
  	$query = "SELECT * FROM candidate";
  	$result = $conn->query($query);
  	$candidate_info = array();

  	if($result->num_rows > 0){
  		while($row = $result->fetch_assoc()){
  			$arr = [];
  			array_push($arr,$row["company_name"],$row["position"],$row["candidate_name"],$row["candidate_email"],$row["candidate_number"]);
  			array_push($candidate_info,$arr);
  		}
  	}
  	echo json_encode($candidate_info);
  }


  if(isset($_POST["all_data"])){
     $company_name = $_POST["applied_data"][0][0];
     $position = $_POST["applied_data"][0][1];
     $candidate_name = $_POST["applied_data"][1][0];
     $candidate_email = $_POST["applied_data"][1][1];
     $candidate_number = $_POST["applied_data"][1][2];
     $candidate_document = $_POST["applied_data"][1][3];

     $sql = "INSERT INTO candidate(company_name,position,candidate_name,candidate_email,candidate_number,candidate_document) VALUES ('$company_name','$position','$candidate_name','$candidate_email','$candidate_number','$candidate_document')";

     	if ($conn->query($sql) === TRUE) {
           echo "New record created successfully";
        } else {
            echo "Failed";
        }

  }
?>

