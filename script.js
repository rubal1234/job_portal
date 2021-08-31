
$(document).ready(function(){
	var titles = ["Company:","Job Requirements:","Job Responsiblitis:","Job Location:","Years Of Experiance:","Salary:","Required Skills:"];
	var job_applied_title = ["Company Name :","Applied Position :" ,"Candidate Name :","Candidate Email :","Candidate Phone Number :"];
	$.ajax({
		url : "get.php",
		type : "post",
		data : {applicants : 1},
		success : function(data){
			var get_data = JSON.parse(data);
			if(get_data.length > 0){
				for(var i=0;i<get_data.length;i++){
					var html = "<div class ='applicants-inner-div mt-4'></div>";
					$(".applicants-div").append(html);

					for(var j=0;j<get_data[0].length;j++){
						var inner_content = "<div class = 'applicant-content-div'>"+"<span class = 'title'>"+job_applied_title[j] + "</span>" + " "+"<span class = 'info'>"+get_data[i][j]+" "+"</span>"+"</div>";
						$(".applicants-inner-div:last-child").append(inner_content);
					}
				}
			}
		}
	})
	$.ajax({
          url : "get.php",
          type : "post",
          data : {fetchall : true},
          success : function(data){
             var all_data = JSON.parse(data);
             if(all_data.length>0){
               for(var i=0;i<all_data.length;i++){
               	var html = "<div class ='inner-div mt-4'></div>";
               	$(".jobs-div").append(html);
                 for(var j=0;j<all_data[0].length;j++){
                 		var inner_content = "<div class = 'content-div'>"+"<span class = 'title'>"+titles[j] + "</span>" + " "+"<span class = 'info'>"+all_data[i][j]+" "+"</span>"+"</div>";
               	        $(".inner-div:last-child").append(inner_content);
                 }
                 var button = "<div class = 'text-right'>" + "<button class = 'btn btn-primary apply'>Apply</button>" + "</div>";
                 $(".inner-div:last-child").append(button);
               }	
             }
             
          }
      })
});
var applied_data = [];
$(document).on("click",".apply",function(e){
	$(".modal").show();
	var company_info = $(this).closest(".inner-div").find(".info").text();
	var new_arr = company_info.split(" ");
    applied_data.push(new_arr);
})
$(document).on("click",".applied",function(e){
	var user_info = [];
	$(".modal").hide();
	// console.log(applied_data[0][0]);
	var name = $("#name").val();
	var email = $("#email").val();
	var number = $("#number").val();
    var filename = $("#file").val();
	user_info.push(name,email,number,filename);
	applied_data.push(user_info);
    $("#name").val("");
    $("#email").val("");
    $("#number").val("");
    $("#file").val("");

    $.ajax({
    	url : "get.php",
    	type : "post",
    	data : {all_data : 1, applied_data : applied_data},
    	success : function(data){
    		console.log("aaa");
    	}
    })

})



function validate(){
	var val0 = $("#input0").val();
	var val1 = $("#input1").val();
	var val2 = $("#input2").val();
	var val3 = $("#input3").val();
	var val4 = $("#input4").val();
	var val5 = $("#input5").val();
	var val6 = $("#input6").val();

	if(val0.trim() == ""){
		$(".alert0").show();
	}else{
		$(".alert0").hide();
	}

	if(val1.trim() == ""){
		$(".alert").show();
	}else{
		$(".alert").hide();
	}

		if(val2.trim() == ""){
		$(".alert2").show();
	}else{
		$(".alert2").hide();
	}

		if(val3.trim() == ""){
		$(".alert3").show();
	}else{
		$(".alert3").hide();
	}
		if(val4.trim() == ""){
		$(".alert4").show();
	}else{
		$(".alert4").hide();
	}
		if(val5.trim() == ""){
		$(".alert5").show();
	}else{
		$(".alert5").hide();
	}
		if(val6.trim() == ""){
		$(".alert6").show();
	}else{
		$(".alert6").hide();
	}

	if(val0.trim() != "" && val1.trim() != "" && val2.trim() != "" && val3.trim() != "" && val4.trim() != "" && val5.trim() != "" && val6.trim() != ""){
		$(".model").show();
		$("#input0").val("");
		$("#input1").val("");
		$("#input2").val("");
		$("#input3").val("");
		$("#input4").val("");
		$("#input5").val("");
		$("#input6").val("");

		$.ajax({
          url : "get.php",
          type : "post",
          data : {employeer : true,company_name : val0,job_requirement : val1,job_responsiblity :val2,job_location : val3,experiance : val4,salary : val5,key_skills : val6},
          success : function(data){
          	console.log("aaa");
          }
		})
	}
}