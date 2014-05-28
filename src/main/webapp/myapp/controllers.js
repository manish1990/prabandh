'use strict';

/* Controllers */

var projectControllers = angular.module('projectControllers', [ 'ngAnimate' ]), rootId;

//reset password controller
projectControllers.controller('resetPasswordCtrl', [ '$scope', '$http',
                                             		'$filter', '$location', '$cookieStore','$routeParams',
                                             		function($scope, $http, $filter, $location, $cookieStore,$routeParams) {
		
													$scope.resetPassword=function(){
														 $scope.resetPasswordForm.verificationcode=$routeParams.code;
														$http({
															method : 'POST',
															url : '../changepassword',
															headers : {
																'content-Type' : 'application/json'
															},
															data : $scope.resetPasswordForm

														}).success(function(data, status, headers, config) {

															$location.path('/login');
															console.log($scope.resetPasswordForm);
														}).error(function(data, status, headers, config) {
															alert('error occured.........');
														});
													};

                                             		} ]);


// mailing controller for all user
projectControllers
		.controller(
				'mailingAllCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'$location',
						'$cookieStore',
						'$routeParams',
						function($scope, $http, $filter, $location,
								$cookieStore, $routeParams) {

							var k = ($cookieStore.get('usrnamecookie'));
							var ary = [];
							var i = 0;
							// alert(k.firstName);
							var l = ($cookieStore.get('loggedinuser'));
							$scope.loginusrmail = l.emailId;
							$scope.loginusrname = k.firstName + " "
									+ k.lastName;
							$scope.logout = function() {
								$cookieStore.remove('loggedinuser');
								$scope.username = null;
								$scope.password = null;
								$cookieStore.remove('usrnamecookie');
								alert('logout successfully');
								$location.path('/login');
							};
							var len=29,msgcount=0;
							var ary=[];var msg;var trimmsg;
								$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
									//$scope.messages=response.data;
									angular.forEach(response.data,function(e){
										//alert(e.sendingDate);
										msg=e.alertMessage;
										trimmsg=msg.substring(0, len);
										ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
														"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
														"alertBy":e.alertBy,"msgStatus":e.msgStatus};
										msgcount++;
									});
									if(msgcount==0)
									{
										$('#noticeboard').removeClass('badge');
									}
									else
									{
										$scope.messages=ary;
										$scope.notificationcount=msgcount;
									}
								});
							var mk=new Date();
							
							$scope.mail={"sendingDate":mk.toLocaleDateString()};
							
							$scope.mailToAll = function() {
								
									$http.get('../userdetails?find=ByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals&emailId='
											+ l.emailId+'&verifiednot=on&enablednot=on&roleName=ROLE_ADMIN').then(function(response) {
									angular.forEach(response.data,function(e) {
										var	data1 = {
										"to" :e.emailId,
										"subject" : $scope.mail.alertTopic,
										"body" : $scope.mail.alertMessage,
										"sender" : k.firstName + " " + k.lastName
									};
								
								// mailing code start here
								
								$http({
									method : 'POST',
									url :'../sendNotificationToAll',
									headers : {'content-Type' : 'application/json'},
									data : data1
								}).success(function(data,status,headers,config) 
									{
										//alert(status);
													$scope.mail={"alertTo":{"firstName":e.firstName,
																"lastName":e.lastName,
																"city":e.city,
																"emailId":e.emailId,
																"contactNumber":e.contactNumber,
																"version":e.version,
																"verified":e.verified,
																"verificationCode":e.verificationCode,
																"password":e.password,
																"enabled":e.enabled,
																"roleName":e.roleName,
																"id":e.id},
																"alertMessage":$scope.mail.alertMessage,
																"alertTopic":$scope.mail.alertTopic,
																"version":0,
																"sendingDate":$scope.mail.sendingDate};

													$scope.mail.alertBy=k;
													$scope.mail.msgStatus=false;
														$http({
															method : 'POST',
															url : '../alertdetails',
															headers : {'content-Type' : 'application/json'},
															data : $scope.mail
														}).success(function(data,status,headers,config) 
															{
																	i++;
																	if(response.data.length==i)
																	{
																		$scope.mail={};
																		$location.path('/tasks');
																	}
																		
																	
														}).error(function(data,status,headers,config)
															{
																alert('error occured.........');
														});
										//end of code
								}).error(function(data,status,headers,config)
									{
										alert('error occured.........');
								});
								});
								});
								//end mailing code here
							};

						} ]);

// inbox controller 
projectControllers.controller('inboxCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$cookieStore',
				'$routeParams',
				function($scope, $http, $filter, $location, $cookieStore,
						$routeParams) {

					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};
					var len=29,msgcount=0;
					var ary=[];var msg;var trimmsg;
	   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
	   					//$scope.messages=response.data;
	   					angular.forEach(response.data,function(e){
	   						//alert(e.sendingDate);
	   						msg=e.alertMessage;
	   						trimmsg=msg.substring(0, len);
	   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
	   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
	   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
	   						msgcount++;
	   					});
	   					if(msgcount==0)
	   					{
	   						$('#noticeboard').removeClass('badge');
	   					}
	   					else
	   					{
	   						$scope.messages=ary;
	   						$scope.notificationcount=msgcount;
	   					}
	   				});
					$http.get('../alertdetails?find=ByAlertTo&alertTo='+k.id).then(function(response){
						$scope.msgs=response.data;
					});
				}]);

//msg controller 
projectControllers.controller('msgCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$cookieStore',
				'$routeParams',
				function($scope, $http, $filter, $location, $cookieStore,
						$routeParams) {

					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};
					
					var len=29,msgcount=0;
					var ary=[];var msg;var trimmsg;
	   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
	   					//$scope.messages=response.data;
	   					angular.forEach(response.data,function(e){
	   						//alert(e.sendingDate);
	   						msg=e.alertMessage;
	   						trimmsg=msg.substring(0, len);
	   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
	   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
	   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
	   						msgcount++;
	   					});
	   					if(msgcount==0)
	   					{
	   						$('#noticeboard').removeClass('badge');
	   					}
	   					else
	   					{
	   						$scope.messages=ary;
	   						
	   						$scope.notificationcount=msgcount;
	   					}
	   				});
					$http.get('../alertdetails/'+$routeParams.id).then(function(response){
						$scope.msg1=response.data;
						//change the status of msg (read/unread)
						var updateStatus;
						// edit contact number controller
						//updateStatus.msgStatus=true;
						$scope.msg1.msgStatus=true;
										$http({
											method : 'PUT',
											url : '../alertdetails/' + $routeParams.id,
											headers : {
												'content-Type' : 'application/json'
											},
											data : $scope.msg1

										}).success(function(data, status, headers, config) {

										}).error(function(data, status, headers, config) {
											alert('error in opening message');
										});
					});
				}]);


//single mailing controller
projectControllers.controller('singlemailCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$cookieStore',
				'$routeParams',
				function($scope, $http, $filter, $location, $cookieStore,
						$routeParams) {

					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};
					var len=29,msgcount=0;
					var ary=[];var msg;var trimmsg;
	   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
	   					//$scope.messages=response.data;
	   					angular.forEach(response.data,function(e){
	   						//alert(e.sendingDate);
	   						msg=e.alertMessage;
	   						trimmsg=msg.substring(0, len);
	   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
	   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
	   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
	   						msgcount++;
	   					});
	   					if(msgcount==0)
	   					{
	   						$('#noticeboard').removeClass('badge');
	   					}
	   					else
	   					{
	   						$scope.messages=ary;
	   						
	   						$scope.notificationcount=msgcount;
	   					}
	   				});
	   				
	   				$http.get('../userdetails?find=ByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals&emailId='
							+ l.emailId+'&verifiednot=on&enablednot=on&roleName=ROLE_ADMIN').then(function(response){
	   					$scope.usrs=response.data;
	   				});
	   				
					var data1, tomail;
					var king = new Date();
					$scope.senddate=king.toLocaleDateString()+" "+king.toLocaleTimeString();
					
					$scope.generate=function(usrid)
					{
						$http.get('../userdetails/'+usrid).then(
								function(response) {

									$scope.mail = {
										"toname" : response.data.firstName + " "
												+ response.data.lastName,
										"sendingDate" : king.toLocaleDateString()+" "+king.toLocaleTimeString()
									};
									$scope.mail.alertTo = response.data;
									// alert($scope.mail.alertBy);
									tomail = response.data.emailId;
									//alert(tomail);
								});
					};
					
					$scope.notification = function() {
						
						// alert($scope.mail.alertMessage);
						data1 = {
							"to" : tomail,
							"subject" : $scope.mail.alertTopic,
							"body" : $scope.mail.alertMessage,
							"sender" : k.firstName + " " + k.lastName
						};
						//alert('notification function call.......');

						$scope.mail.alertBy = k;
						$http({
							method : 'POST',
							url : '../sendNotification',
							headers : {
								'content-Type' : 'application/json'
							},
							data : data1

						}).success(function(data, status, headers, config) {
							//alert(status);

							// code start from here for insert the alert detail
							// into alertdetail table
							$scope.mail.msgStatus=false;
							$http({
								method : 'POST',
								url : '../alertdetails',
								headers : {
									'content-Type' : 'application/json'
								},
								data : $scope.mail

							}).success(function(data, status, headers, config) {
								//alert(status);
								$scope.mail = {};
								$location.path('/tasks');
							}).error(function(data, status, headers, config) {
								alert('error occured.........');
							});
							// code end

						}).error(function(data, status, headers, config) {
							alert('error occured.........');
						});
					};
				} ]);

// mailing controller
projectControllers.controller('mailingCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$cookieStore',
				'$routeParams',
				function($scope, $http, $filter, $location, $cookieStore,
						$routeParams) {

					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};
					var len=29,msgcount=0;
					var ary=[];var msg;var trimmsg;
	   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
	   					//$scope.messages=response.data;
	   					angular.forEach(response.data,function(e){
	   						//alert(e.sendingDate);
	   						msg=e.alertMessage;
	   						trimmsg=msg.substring(0, len);
	   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
	   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
	   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
	   						msgcount++;
	   					});
	   					if(msgcount==0)
	   					{
	   						$('#noticeboard').removeClass('badge');
	   					}
	   					else
	   					{
	   						$scope.messages=ary;
	   						
	   						$scope.notificationcount=msgcount;
	   					}
	   				});
					var data1, tomail;
					var king = new Date();
					$http.get('../userdetails/' + $routeParams.id).then(
							function(response) {

								$scope.mail = {
									"toname" : response.data.firstName + " "
											+ response.data.lastName,
									"sendingDate" : king.toLocaleDateString()+" "+king.toLocaleTimeString()
								};
								$scope.mail.alertTo = response.data;
								// alert($scope.mail.alertBy);
								tomail = response.data.emailId;
								alert(tomail);
							});

					$scope.notification = function() {
						// alert($scope.mail.alertMessage);
						data1 = {
							"to" : tomail,
							"subject" : $scope.mail.alertTopic,
							"body" : $scope.mail.alertMessage,
							"sender" : k.firstName + " " + k.lastName
						};
						alert('notification function call.......');

						$scope.mail.alertBy = k;
						$http({
							method : 'POST',
							url : '../sendNotification',
							headers : {
								'content-Type' : 'application/json'
							},
							data : data1

						}).success(function(data, status, headers, config) {
							//alert(status);

							// code start from here for insert the alert detail
							// into alertdetail table
							$scope.mail.msgStatus=false;
							$http({
								method : 'POST',
								url : '../alertdetails',
								headers : {
									'content-Type' : 'application/json'
								},
								data : $scope.mail

							}).success(function(data, status, headers, config) {
								//alert(status);
								$scope.mail = {};
								$location.path('/tasks');
							}).error(function(data, status, headers, config) {
								alert('error occured.........');
							});
							// code end

						}).error(function(data, status, headers, config) {
							alert('error occured.........');
						});
					};
				} ]);

// login controller for both
projectControllers
		.controller(
				'newloginCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'$location',
						'$cookieStore',
						function($scope, $http, $filter, $location,
								$cookieStore) {
							$scope.showProgress=false;
							$scope.headerText="Enter Valid Email Id.."
							$scope.showMessage=false;
							$scope.txtMessage="";
							$scope.showModelFooter=true;
							$scope.showModelBody=true;
							
							$scope.checkMail = function(dmail) {
								//alert('checkMail function is call...');
								$http
										.get(
												'../userdetails?find=ByEmailIdEquals&emailId='
														+ dmail)
										.then(
												function(response) {
													if (response.data.length != 0) {
														//alert("email id already exist.....");
														$scope.duplicate=true;
														$scope.user.emailId = "";
													}
													else
													{
														$scope.duplicate=false;
													}
												});
							};
							
							$scope.forgotPassword=function()
							{
								$scope.showProgress=true;
								$scope.showModelFooter=false;
								$scope.showModelBody=false;
								$scope.showMessage=false;
								$scope.headerText="Sending Mail.....";
								$http({
									method : 'POST',
									url : '../forgetpassword',
									headers : {
										'content-Type' : 'application/json'
									},
									data : $scope.fgtPwdfrm

								})
										.success(
												function(data, status, headers,
														config) {
													
													$scope.headerText="";
													$scope.fgtPwdfrm = {};
													$scope.showProgress=false;
													$scope.txtMessage=data;		
													$scope.showMessage=true;
													setInterval(function(){
														$scope.txtMessage="";
														$scope.showModelBody=true;
														$scope.showModelFooter=true;
														$scope.showProgress=false;
														$scope.headerText="Enter Valid Email Id.."
														$scope.showMessage=false;
														$scope.txtMessage="";
														$scope.showModelFooter=true;
														$scope.showModelBody=true;
														document.getElementById('resetButton').click();	
													},3000);

												})
										.error(
												function(data, status, headers,
														config) {	
													$scope.showProgress=false;
													$scope.showMessage=true;
													$scope.showModelBody=true;
													$scope.showModelFooter=true;
													$scope.fgtPwdfrm = {};
													$scope.txtMessage="incorrect email Id...";
													//alert('error occured.........');
												});
							};
							
							//login function
							$scope.login = function(mail, pwd) {
								$http
										.get(
												'../userdetails?find=ByEmailIdEqualsAndPasswordEquals&emailId='
														+ $scope.username
														+ '&password='
														+ $scope.password)
										.then(
												function(response) {
													var ary = response.data;
													var len = ary.length;
													if (len != 0) {
														var ck = {
															'emailId' : $scope.username
														};
														$cookieStore.put(
																'loggedinuser',
																ck);
														var i = ($cookieStore
																.get('loggedinuser'));
														$http
																.get(
																		'../userdetails?find=ByEmailIdEquals&emailId='
																				+ i.emailId)
																.then(
																		function(
																				response) {

																			angular
																					.forEach(
																							response.data,
																							function(
																									e) {
																								//alert(e.contactNumber);
																								var dd = {
																									'firstName' : e.firstName,
																									'lastName' : e.lastName,
																									'roleName' : e.roleName,
																									'id' : e.id,
																									'contactNumber' : e.contactNumber,
																									'emailId' : e.emailId,
																									'enabled' : e.enabled,
																									'password' : e.password,
																									'verificationCode' : e.verificationCode,
																									'verified' : e.verified,
																									'version' : e.version
																								};
																								$cookieStore
																										.put(
																												'usrnamecookie',
																												dd);
																								var j = ($cookieStore
																										.get('usrnamecookie'));
																								// alert(j.lastName);
																							});
																			var g = ($cookieStore
																					.get('usrnamecookie'));
																			if (g.roleName == 'ROLE_ADMIN') {
																				$location
																						.path('/admintasks');
																			} else if(g.roleName == 'ROLE_USER') {
																				$location
																						.path('/tasks');
																			}else{
																				alert('role not defined check your email.....');
																				$scope.username="";
																				$scope.password="";
																			}

																		});
													} else {
														alert('wrong credential....');
													}
												});
							};
							$scope.user = {
								"enabled" : false,
								"verified" : false,
								"verificationCode" : "00000",
								"roleName":"ROLE_USER"
							};

							$scope.signUp = function() {
								// $scope.user.enabled=0;
								// $scope.user.verified=0;
								console.log($scope.user);
								$http({
									method : 'POST',
									url : '../userdetails',
									headers : {
										'content-Type' : 'application/json'
									},
									data : $scope.user

								})
										.success(
												function(data, status, headers,
														config) {
													alert(status);
													//$route.reload();
													$scope.user = {};

												})
										.error(
												function(data, status, headers,
														config) {
													alert('error occured.........');
												});
							};
							$scope.cancelsignup = function() {
								$scope.user = {};
							};

						} ]);

// ************************** user side controller ************************

// user task list controller
projectControllers.controller('taskListCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$location',
		'$cookieStore',
		function($scope, $http, $filter, $location, $cookieStore) {
			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.firstName);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.id + "-" + k.firstName + " " + k.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
				var len=29,msgcount=0;
				var ary=[];var msg;var trimmsg;
   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
   					//$scope.messages=response.data;
   					angular.forEach(response.data,function(e){
   						//alert(e.sendingDate);
   						msg=e.alertMessage;
   						trimmsg=msg.substring(0, len);
   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
   						msgcount++;
   					});
   					if(msgcount==0)
   					{
   						$('#noticeboard').removeClass('badge');
   					}
   					else
   					{
   						$scope.messages=ary;
   						$scope.notificationcount=msgcount;
   					}
   				});
			$http.get('../taskdetails?find=ByAssignTo&assignTo=' + k.id).then(
					function(response) {
						$scope.usertasks = response.data;
/*						if (response.data[0].taskProgress > 45) {
							$('#taskdiv').addClass('panel panel-danger');

						}*/

					});


		} ]);


//user task list in detail view
projectControllers.controller('detailtaskListCtrl', [
                                       		'$scope',
                                       		'$http',
                                       		'$filter',
                                       		'$location',
                                       		'$cookieStore',
                                       		function($scope, $http, $filter, $location, $cookieStore) {
                                       			var k = ($cookieStore.get('usrnamecookie'));
                                       			// alert(k.firstName);
                                       			var l = ($cookieStore.get('loggedinuser'));
                                       			$scope.loginusrmail = l.emailId;
                                       			$scope.loginusrname = k.id + "-" + k.firstName + " " + k.lastName;
                                       			$scope.logout = function() {
                                       				$cookieStore.remove('loggedinuser');
                                       				$scope.username = null;
                                       				$scope.password = null;
                                       				$cookieStore.remove('usrnamecookie');
                                       				alert('logout successfully');
                                       				$location.path('/login');
                                       			};
                                       				var len=29,msgcount=0;
                                       				var ary=[];var msg;var trimmsg;
                                          				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
                                          					//$scope.messages=response.data;
                                          					angular.forEach(response.data,function(e){
                                          						//alert(e.sendingDate);
                                          						msg=e.alertMessage;
                                          						trimmsg=msg.substring(0, len);
                                          						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
                                          										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
                                          										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
                                          						msgcount++;
                                          					});
                                          					if(msgcount==0)
                                          					{
                                          						$('#noticeboard').removeClass('badge');
                                          					}
                                          					else
                                          					{
                                          						$scope.messages=ary;
                                          						$scope.notificationcount=msgcount;
                                          					}
                                          				});
                                       			$http.get('../taskdetails?find=ByAssignTo&assignTo=' + k.id).then(
                                       					function(response) {
                                       						$scope.usertasks = response.data;
                                       						/*if (response.data[0].taskProgress > 45) {
                                       							$('#taskdiv').addClass('panel panel-danger');

                                       						}*/
                                       						angular.forEach(response.data,function(e){
                                       							if(e.taskStatus==false)
                                       							{
                                       								$scope.modulestatus="work in progress"
                                       							}
                                       							else
                                       							{
                                       								$scope.modulestatus="completed";
                                       							}
                                       						});

                                       					});

                                       		} ]);

// user detail controller

projectControllers.controller('userDetailCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$routeParams',
				'$cookieStore',
				function($scope, $http, $filter, $location, $routeParams,
						$cookieStore) {

					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};
					var len=29,msgcount=0;
					var ary=[];var msg;var trimmsg;
	   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
	   					//$scope.messages=response.data;
	   					angular.forEach(response.data,function(e){
	   						//alert(e.sendingDate);
	   						msg=e.alertMessage;
	   						trimmsg=msg.substring(0, len);
	   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
	   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
	   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
	   						msgcount++;
	   					});
	   					if(msgcount==0)
	   					{
	   						$('#noticeboard').removeClass('badge');
	   					}
	   					else
	   					{
	   						$scope.messages=ary;
	   						$scope.notificationcount=msgcount;
	   					}
	   				});
					$http.get('../userdetails/' + $routeParams.id).then(
							function(response) {
								$scope.user = response.data;

							});

				} ]);

// registration controller

projectControllers.controller('regController', [ '$scope', '$http', '$filter',
		'$location', '$routeParams',
		function($scope, $http, $filter, $location, $routeParams) {

		} ]);

// progress controller

projectControllers
		.controller(
				'progressCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'$routeParams',
						'$location',
						'$cookieStore',
						'$rootScope',
						function($scope, $http, $filter, $routeParams,
								$location, $cookieStore, $rootScope) {

							var count = 0, total = 0;
							// $('#show_hide').hide();
							var k = ($cookieStore.get('usrnamecookie'));
							// alert(k.contactNumber);
							var l = ($cookieStore.get('loggedinuser'));
							$scope.loginusrmail = l.emailId;
							$scope.loginusrname = k.firstName + " "
									+ k.lastName;
							$scope.logout = function() {
								$cookieStore.remove('loggedinuser');
								$scope.username = null;
								$scope.password = null;
								$cookieStore.remove('usrnamecookie');
								alert('logout successfully');
								$location.path('/login');
							};
							var len=29,msgcount=0;
							var ary=[];var msg;var trimmsg;
			   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
			   					//$scope.messages=response.data;
			   					angular.forEach(response.data,function(e){
			   						//alert(e.sendingDate);
			   						msg=e.alertMessage;
			   						trimmsg=msg.substring(0, len);
			   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
			   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
			   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
			   						msgcount++;
			   					});
			   					if(msgcount==0)
			   					{
			   						$('#noticeboard').removeClass('badge');
			   					}
			   					else
			   					{
			   						$scope.messages=ary;
			   						$scope.notificationcount=msgcount;
			   					}
			   				});
							$http.get(
									'../taskdetails?find=ByAssignTo&assignTo='
											+ k.id).then(function(response) {
								$scope.tasks = response.data;
							});
							$scope.subtaskfun = function(id) {
								// alert(id);

								$http
										.get(
												'../taskdetails?find=ByRootTaskId&rootTaskId='
														+ id)
										.then(
												function(response) {
													if (response.data.length != 0) {
														// document.getElementbyid("progress").readOnly=true;
														// alert(response.data);
														// $scope.task =
														// response.data;
														angular
																.forEach(
																		response.data,
																		function(
																				e) {

																			total = total
																					+ e.taskProgress;
																			count++;
																			alert("task progress : "
																					+ e.taskProgress
																					+ " total : "
																					+ total
																					+ "count : "
																					+ count);
																		});

														total = total / count;
														$http
																.get(
																		'../taskdetails/'
																				+ id)
																.then(
																		function(
																				response) {

																			// $scope.task=response.data;
																			// alert(response.data.assignDate);
																			$scope.task = {
																				"taskProgress" : total,
																				"id" : response.data.id,
																				"version" : response.data.version,
																				"assignDate" : response.data.assignDate,
																				"assignTo" : response.data.assignTo,
																				"assignBy" : response.data.assignBy,
																				"endDate" : response.data.endDate,
																				"taskStatus" : response.data.taskStatus,
																				"rootTaskId" : response.data.rootTaskId,
																				"taskDescription" : response.data.taskDescription,
																				"taskName" : response.data.taskName
																			};
																			console
																					.log($scope.task);
																		});
														$("#readprg").hide();
													} else {
														$http
																.get(
																		'../taskdetails/'
																				+ id)
																.then(
																		function(
																				response) {
																			// alert(response.data);
																			// document.getElementbyid("progress").readonly=false;
																			$scope.task = response.data;
																			$(
																					"#readprg")
																					.show();
																			// alert(count+"
																			// "+total/count);
																		});
													}
												});
							};
							$scope.updateProgress = function() {

								// alert('../tasldetails/'+$scope.task2.id);
								// alert($scope.task.taskProgress);
								// $scope.task.taskProgress=total;
								$http({
									method : 'PUT',
									url : '../taskdetails/' + $scope.task2.id,
									headers : {
										'content-Type' : 'application/json'
									},
									data : $scope.task

								})
										.success(
												function(data, status, headers,
														config) {
													$location.path('/tasks');
													// alert(status);

												})
										.error(
												function(data, status, headers,
														config) {
													alert('error occured.........');
												});
							};

						} ]);

// sub task list controller
projectControllers.controller('subtaskListCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$routeParams',
				'$cookieStore',
				function($scope, $http, $filter, $location, $routeParams,
						$cookieStore) {
					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};
					var len=29,msgcount=0;
					var ary=[];var msg;var trimmsg;
	   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
	   					//$scope.messages=response.data;
	   					angular.forEach(response.data,function(e){
	   						//alert(e.sendingDate);
	   						msg=e.alertMessage;
	   						trimmsg=msg.substring(0, len);
	   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
	   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
	   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
	   						msgcount++;
	   					});
	   					if(msgcount==0)
	   					{
	   						$('#noticeboard').removeClass('badge');
	   					}
	   					else
	   					{
	   						$scope.messages=ary;
	   						$scope.notificationcount=msgcount;
	   					}
	   				});
					$scope.Rtaskid=$routeParams.id;
					$http.get(
							'../taskdetails?find=ByRootTaskId&rootTaskId='
									+ $routeParams.id).then(function(response) {
						$scope.subtasks = response.data;
					});

				} ]);

// task detail controller

projectControllers.controller('taskDetailCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {

			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.firstName);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			var len=29,msgcount=0;
			var ary=[];var msg;var trimmsg;
				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
					//$scope.messages=response.data;
					angular.forEach(response.data,function(e){
						//alert(e.sendingDate);
						msg=e.alertMessage;
						trimmsg=msg.substring(0, len);
						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
						msgcount++;
					});
					if(msgcount==0)
					{
						$('#noticeboard').removeClass('badge');
					}
					else
					{
						$scope.messages=ary;
						$scope.notificationcount=msgcount;
					}
				});
			$rootScope.id = $routeParams.id;
			$http.get('../taskdetails/' + $routeParams.id).then(
					function(response) {
						// alert(response.data.id);
						$scope.task = response.data;
						var myid=response.data.rootTaskId;
						//alert(response.data.rootTaskId);
						$http.get('../taskdetails/'+myid).then(function(response){
							$scope.roottaskname=response.data.taskName;
						});
						$scope.subtask = response.data;
						if ($scope.task.taskStatus == false) {
							$scope.status = "work in progress";
						} else if ($scope.task.taskStatus == true) {
							$scope.status = "completed";
						} else if ($scope.subtask.taskStatus == false) {
							$scope.status = "work in progress";
						} else if ($scope.subtask.taskStatus == true) {
							$scope.status = "completed";
						}
						rootId = $routeParams.id;

					});
			/*
			 * $scope.sendmail = function(id) { alert(id); $http({ method :
			 * 'POST', url : '../myemails', headers : { 'content-Type' :
			 * 'application/json' }, data : $scope.task
			 * 
			 * }).success(function(data, status, headers, config) {
			 * alert(status); //$scope.task = {};
			 * //$location.path('/subtasklist/' + $rootScope.id);
			 * 
			 * }).error(function(data, status, headers, config) { alert('error
			 * occured.........'); }); };
			 */

		} ]);

// user list controller
projectControllers.controller('userListCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$routeParams',
				'$location',
				'$cookieStore',
				function($scope, $http, $filter, $routeParams, $location,
						$cookieStore) {
					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};
					var len=29,msgcount=0;
					var ary=[];var msg;var trimmsg;
	   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
	   					//$scope.messages=response.data;
	   					angular.forEach(response.data,function(e){
	   						//alert(e.sendingDate);
	   						msg=e.alertMessage;
	   						trimmsg=msg.substring(0, len);
	   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
	   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
	   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
	   						msgcount++;
	   					});
	   					if(msgcount==0)
	   					{
	   						$('#noticeboard').removeClass('badge');
	   					}
	   					else
	   					{
	   						$scope.messages=ary;
	   						$scope.notificationcount=msgcount;
	   					}
	   				});
					$http.get(
							'../userdetails?find=ByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals&emailId='
									+ l.emailId+'&verifiednot=on&enablednot=on&roleName=ROLE_ADMIN').then(function(response) {

						$scope.users = response.data;
					});

				} ]);

// new task creation controller
projectControllers.controller('newTaskCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		'$window',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope,$window) {

			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.contactNumber);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			var len=29,msgcount=0;
			var ary=[];var msg;var trimmsg;
				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
					//$scope.messages=response.data;
					angular.forEach(response.data,function(e){
						//alert(e.sendingDate);
						msg=e.alertMessage;
						trimmsg=msg.substring(0, len);
						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
						msgcount++;
					});
					if(msgcount==0)
					{
						$('#noticeboard').removeClass('badge');
					}
					else
					{
						$scope.messages=ary;
						$scope.notificationcount=msgcount;
					}
				});
			$http.get(
					'../userdetails?find=ByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals&emailId='
					+ l.emailId+'&verifiednot=on&enablednot=on&roleName=ROLE_ADMIN').then(
					function(response) {
						$scope.users = response.data;
						$scope.subusers = response.data;
						$scope.superusers = response.data;
						var d = new Date();
						$scope.task = {
							'assignDate' : d.getMonth() + '/' + d.getDate()
									+ '/' + d.getFullYear(),
							'assignBy' : k.firstName + " " + k.lastName,
							'rootTaskId' : $routeParams.id
						};

					});
			var flag=0;
			$scope.checksuper=function(usrid){
				flag=0;
				$http.get('../taskdetails/'+$routeParams.id).then(function(response){
					//alert(response.data.assignBy.firstName+" "+response.data.assignBy.lastName);
					if(usrid==response.data.assignBy.id){
						
						alert("sorry you can't assign task to this member");
						location.reload();
						flag=1;
					}
				});
			};
			$scope.createtask = function() {
/*				if(flag==1)
				{
					alert("sorry you can't assign task to this member");
				}
				else
				{*/
				$scope.task.taskStatus = false;
				$scope.task.taskProgress = 3;

				$scope.task.assignBy = k;
				console.log($scope.task.assignBy);

				$http({
					method : 'POST',
					url : '../taskdetails',
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.task

				}).success(function(data, status, headers, config) {
					alert(status);
					$scope.task = {};
					$location.path('/subtasklist/' + $routeParams.id);

				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
				
			};
			$scope.canceltask = function() {
				$scope.task = {};
			};

		} ]);

// new task for user controller

projectControllers.controller('usernewTaskCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {

			var k = ($cookieStore.get('usrnamecookie'));
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			var len=29,msgcount=0;
			var ary=[];var msg;var trimmsg;
				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
					//$scope.messages=response.data;
					angular.forEach(response.data,function(e){
						//alert(e.sendingDate);
						msg=e.alertMessage;
						trimmsg=msg.substring(0, len);
						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
						msgcount++;
					});
					if(msgcount==0)
					{
						$('#noticeboard').removeClass('badge');
					}
					else
					{
						$scope.messages=ary;
						$scope.notificationcount=msgcount;
					}
				});
			var assigtoobjrct;
			$http.get('../userdetails/' + $routeParams.id).then(
					function(response) {
						assigtoobjrct = response.data;
						var assignto = response.data.firstName + " "
								+ response.data.lastName;
						var d = new Date();
						$scope.task = {
							'assignDate' : d.getMonth() + '/' + d.getDate()
									+ '/' + d.getFullYear(),
							'assignBy' : k.firstName + " " + k.lastName,
							'assignTo' : assignto
						};

					});
			$http.get('../taskdetails?find=ByAssignTo&assignTo=' + k.id).then(
					function(response) {
						angular.forEach(response.data, function(o) {
							// alert(o.taskName);
						});
						$scope.projects = response.data;
					});
			

			
			$scope.createtask = function() {
					
				//var flag=2;
				$http.get('../taskdetails/'+$scope.task.rootTaskId).then(function(response){
					//alert(response.data.assignBy.firstName+" "+response.data.assignBy.lastName);
					if(response.data.assignBy.id==$routeParams.id){
						//flag=1;
						alert('sorry you cant assign task to this user....');
						location.reload();
					}else
					{
						//flag=0;
						$scope.task.taskStatus = false;
						$scope.task.taskProgress = 3;
						$scope.task.assignTo = assigtoobjrct;
						$scope.task.assignBy = k;

						$http({
							method : 'POST',
							url : '../taskdetails',
							headers : {
								'content-Type' : 'application/json'
							},
							data : $scope.task

						}).success(function(data, status, headers, config) {
							// alert(status);
							var nn = $scope.task.rootTaskId;
							$scope.task = {};
							$location.path('/subtasklist/' + nn);

						}).error(function(data, status, headers, config) {
							alert('error occured.........');
						});
					}
					
				});
								
				
			};
			$scope.canceltask = function() {
				$scope.task = {};
			};

		} ]);

// user profile controller

projectControllers.controller('userprofileCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {

			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.firstName);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			var len=29,msgcount=0;
			var ary=[];var msg;var trimmsg;
				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
					//$scope.messages=response.data;
					angular.forEach(response.data,function(e){
						//alert(e.sendingDate);
						msg=e.alertMessage;
						trimmsg=msg.substring(0, len);
						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
						msgcount++;
					});
					if(msgcount==0)
					{
						$('#noticeboard').removeClass('badge');
					}
					else
					{
						$scope.messages=ary;
						$scope.notificationcount=msgcount;
					}
				});
			$http.get('../userdetails/' + k.id).then(function(response) {
				$scope.userprofile = response.data;
			});

		} ]);

// edit username controller

projectControllers.controller('usernameEditCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {
			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.contactNumber);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			var len=29,msgcount=0;
			var ary=[];var msg;var trimmsg;
				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
					//$scope.messages=response.data;
					angular.forEach(response.data,function(e){
						//alert(e.sendingDate);
						msg=e.alertMessage;
						trimmsg=msg.substring(0, len);
						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
						msgcount++;
					});
					if(msgcount==0)
					{
						$('#noticeboard').removeClass('badge');
					}
					else
					{
						$scope.messages=ary;
						$scope.notificationcount=msgcount;
					}
				});
			$http.get('../userdetails/' + $routeParams.id).then(
					function(response) {
						$scope.usredit = response.data;
					});

			$scope.updateusername = function() {

				$http({
					method : 'PUT',
					url : '../userdetails/' + $routeParams.id,
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.userForm

				}).success(function(data, status, headers, config) {
					$location.path('/userprofile/');

				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
			};

		} ]);

// edit contact number controller

projectControllers.controller('usercontactEditCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {
			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.contactNumber);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			var len=29,msgcount=0;
			var ary=[];var msg;var trimmsg;
				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
					//$scope.messages=response.data;
					angular.forEach(response.data,function(e){
						//alert(e.sendingDate);
						msg=e.alertMessage;
						trimmsg=msg.substring(0, len);
						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
						msgcount++;
					});
					if(msgcount==0)
					{
						$('#noticeboard').removeClass('badge');
					}
					else
					{
						$scope.messages=ary;
						$scope.notificationcount=msgcount;
					}
				});
			$http.get('../userdetails/' + $routeParams.id).then(
					function(response) {
						$scope.usredit = response.data;
					});

			$scope.updatecontact = function() {

				$http({
					method : 'PUT',
					url : '../userdetails/' + $routeParams.id,
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.usredit

				}).success(function(data, status, headers, config) {
					$location.path('/userprofile');

				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
			};

		} ]);

// user city edit controller

projectControllers.controller('usercityEditCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {
			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.contactNumber);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			var len=29,msgcount=0;
			var ary=[];var msg;var trimmsg;
				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
					//$scope.messages=response.data;
					angular.forEach(response.data,function(e){
						//alert(e.sendingDate);
						msg=e.alertMessage;
						trimmsg=msg.substring(0, len);
						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
						msgcount++;
					});
					if(msgcount==0)
					{
						$('#noticeboard').removeClass('badge');
					}
					else
					{
						$scope.messages=ary;
						$scope.notificationcount=msgcount;
					}
				});
			$http.get('../userdetails/' + $routeParams.id).then(
					function(response) {
						$scope.usredit = response.data;
					});

			$scope.updatecity = function() {

				$http({
					method : 'PUT',
					url : '../userdetails/' + $routeParams.id,
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.usredit

				}).success(function(data, status, headers, config) {
					$location.path('/userprofile');

				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
			};

		} ]);

// *******************************************************************************************************************************************************************
// *********************** admin side controller ************************


//admin single mailing controller
projectControllers.controller('adminsinglemailCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$cookieStore',
				'$routeParams',
				function($scope, $http, $filter, $location, $cookieStore,
						$routeParams) {

					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};
					var len=29,msgcount=0;
					var ary=[];var msg;var trimmsg;
	   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
	   					//$scope.messages=response.data;
	   					angular.forEach(response.data,function(e){
	   						//alert(e.sendingDate);
	   						msg=e.alertMessage;
	   						trimmsg=msg.substring(0, len);
	   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
	   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
	   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
	   						msgcount++;
	   					});
	   					if(msgcount==0)
	   					{
	   						$('#noticeboard').removeClass('badge');
	   					}
	   					else
	   					{
	   						$scope.messages=ary;
	   						
	   						$scope.notificationcount=msgcount;
	   					}
	   				});
	   				
	   				$http.get('../userdetails?find=ByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals&emailId='
							+ l.emailId+'&verifiednot=on&enablednot=on&roleName=ROLE_ADMIN').then(function(response){
	   					$scope.usrs=response.data;
	   				});
	   				
					var data1, tomail;
					var king = new Date();
					$scope.senddate=king.toLocaleDateString()+" "+king.toLocaleTimeString();
					
					$scope.generate=function(usrid)
					{
						$http.get('../userdetails/'+usrid).then(
								function(response) {

									$scope.mail = {
										"toname" : response.data.firstName + " "
												+ response.data.lastName,
										"sendingDate" : king.toLocaleDateString()+" "+king.toLocaleTimeString()
									};
									$scope.mail.alertTo = response.data;
									// alert($scope.mail.alertBy);
									tomail = response.data.emailId;
									//alert(tomail);
								});
					};
					
					$scope.notification = function() {
						
						// alert($scope.mail.alertMessage);
						data1 = {
							"to" : tomail,
							"subject" : $scope.mail.alertTopic,
							"body" : $scope.mail.alertMessage,
							"sender" : k.firstName + " " + k.lastName
						};
						//alert('notification function call.......');

						$scope.mail.alertBy = k;
						$http({
							method : 'POST',
							url : '../sendNotification',
							headers : {
								'content-Type' : 'application/json'
							},
							data : data1

						}).success(function(data, status, headers, config) {
							//alert(status);

							// code start from here for insert the alert detail
							// into alertdetail table
							$scope.mail.msgStatus=false;
							$http({
								method : 'POST',
								url : '../alertdetails',
								headers : {
									'content-Type' : 'application/json'
								},
								data : $scope.mail

							}).success(function(data, status, headers, config) {
								//alert(status);
								$scope.mail = {};
								$location.path('/admintasks');
							}).error(function(data, status, headers, config) {
								alert('error occured.........');
							});
							// code end

						}).error(function(data, status, headers, config) {
							alert('error occured.........');
						});
					};
				} ]);


//mailing controller for all user
projectControllers
		.controller(
				'adminallmailCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'$location',
						'$cookieStore',
						'$routeParams',
						function($scope, $http, $filter, $location,
								$cookieStore, $routeParams) {

							var k = ($cookieStore.get('usrnamecookie'));
							var ary = [];
							var i = 0;
							// alert(k.firstName);
							var l = ($cookieStore.get('loggedinuser'));
							$scope.loginusrmail = l.emailId;
							$scope.loginusrname = k.firstName + " "
									+ k.lastName;
							$scope.logout = function() {
								$cookieStore.remove('loggedinuser');
								$scope.username = null;
								$scope.password = null;
								$cookieStore.remove('usrnamecookie');
								alert('logout successfully');
								$location.path('/login');
							};
							var mk=new Date();
							
							$scope.mail={"sendingDate":mk.toLocaleDateString()};
							
							$scope.mailToAll = function() {
								
									$http.get('../userdetails?find=ByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals&emailId='
											+ l.emailId+'&verifiednot=on&enablednot=on&roleName=ROLE_ADMIN').then(function(response) {
									angular.forEach(response.data,function(e) {
										var	data1 = {
										"to" :e.emailId,
										"subject" : $scope.mail.alertTopic,
										"body" : $scope.mail.alertMessage,
										"sender" : k.firstName + " " + k.lastName
									};
								
								// mailing code start here
								
								$http({
									method : 'POST',
									url :'../sendNotificationToAll',
									headers : {'content-Type' : 'application/json'},
									data : data1
								}).success(function(data,status,headers,config) 
									{
										//alert(status);
													$scope.mail={"alertTo":{"firstName":e.firstName,
																"lastName":e.lastName,
																"city":e.city,
																"emailId":e.emailId,
																"contactNumber":e.contactNumber,
																"version":e.version,
																"verified":e.verified,
																"verificationCode":e.verificationCode,
																"password":e.password,
																"enabled":e.enabled,
																"roleName":e.roleName,
																"id":e.id},
																"alertMessage":$scope.mail.alertMessage,
																"alertTopic":$scope.mail.alertTopic,
																"version":0,
																"sendingDate":$scope.mail.sendingDate};
													$scope.mail.alertBy=k;
													$scope.mail.msgStatus=false;
														$http({
															method : 'POST',
															url : '../alertdetails',
															headers : {'content-Type' : 'application/json'},
															data : $scope.mail
														}).success(function(data,status,headers,config) 
															{
																	i++;
																	if(response.data.length==i)
																	{
																		$scope.mail={};
																		$location.path('/admintasks');
																	}
																		
																	
														}).error(function(data,status,headers,config)
															{
																alert('error occured.........');
														});
										//end of code
								}).error(function(data,status,headers,config)
									{
										alert('error occured.........');
								});
								});
								});
								//end mailing code here
							};

						} ]);

//mail to individual controller

projectControllers.controller('adminmailingCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$cookieStore',
				'$routeParams',
				function($scope, $http, $filter, $location, $cookieStore,
						$routeParams) {

					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};
					var data1, tomail;
					var king = new Date();
					$http.get('../userdetails/' + $routeParams.id).then(
							function(response) {

								$scope.mail = {
									"toname" : response.data.firstName + " "
											+ response.data.lastName,
									"sendingDate" : king.toLocaleDateString()+" "+king.toLocaleTimeString()
								};
								$scope.mail.alertTo = response.data;
								// alert($scope.mail.alertBy);
								tomail = response.data.emailId;
								alert(tomail);
							});

					$scope.notification = function() {
						// alert($scope.mail.alertMessage);
						data1 = {
							"to" : tomail,
							"subject" : $scope.mail.alertTopic,
							"body" : $scope.mail.alertMessage,
							"sender" : k.firstName + " " + k.lastName
						};
						alert('notification function call.......');

						$scope.mail.alertBy = k;
						$http({
							method : 'POST',
							url : '../sendNotification',
							headers : {
								'content-Type' : 'application/json'
							},
							data : data1

						}).success(function(data, status, headers, config) {
							//alert(status);

							// code start from here for insert the alert detail
							// into alertdetail table
							$scope.mail.msgStatus=false;
							$http({
								method : 'POST',
								url : '../alertdetails',
								headers : {
									'content-Type' : 'application/json'
								},
								data : $scope.mail

							}).success(function(data, status, headers, config) {
								//alert(status);
								$scope.mail = {};
								$location.path('/admintasks');
							}).error(function(data, status, headers, config) {
								alert('error occured.........');
							});
							// code end

						}).error(function(data, status, headers, config) {
							alert('error occured.........');
						});
					};
				} ]);


// new register user controller
projectControllers
		.controller(
				'newuserCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'$location',
						'$cookieStore',
						function($scope, $http, $filter, $location,
								$cookieStore) {
							var k = ($cookieStore.get('usrnamecookie'));
							// alert(k.firstName);
							var l = ($cookieStore.get('loggedinuser'));
							$scope.loginusrmail = l.emailId;
							$scope.loginusrname = k.firstName + " "
									+ k.lastName;
							$scope.loginusrid=k.id;
							$scope.logout = function() {
								$cookieStore.remove('loggedinuser');
								$cookieStore.remove('usrnamecookie');
								alert('logout successfully');
								$location.path('/login');
							};

							$http
									.get(
											'../userdetails?find=ByEnabledNotAndVerifiedNot&enabled=on&verified=on')
									.then(function(response) {
										$scope.newusers = response.data;
									});

						} ]);

// new user detail controller

projectControllers.controller('newuserdetailCtrl', [ '$scope', '$http',
		'$filter', '$location', '$cookieStore',
		function($scope, $http, $filter, $location, $cookieStore) {
			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.firstName);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.loginusrid=k.id;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};

		} ]);

// admin task controller

projectControllers.controller('admintaskListCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$location',
		'$cookieStore',
		function($scope, $http, $filter, $location, $cookieStore) {

			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.firstName);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.loginusrid=k.id;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};

			$http.get('../taskdetails?find=ByRootTaskId&rootTaskId=0').then(
					function(response) {
						$scope.tasks = response.data;
					});

		} ]);

// admin sub task list controller
projectControllers.controller('adminsubtasklistCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$cookieStore',
				'$routeParams',
				function($scope, $http, $filter, $location, $cookieStore,
						$routeParams) {
					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.loginusrid=k.id;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login')
					};
					$scope.rid = $routeParams.id;
					$http.get(
							'../taskdetails?find=ByRootTaskId&rootTaskId='
									+ $routeParams.id).then(function(response) {
						$scope.tasks = response.data;
					});

				} ]);
// user detail controller

projectControllers.controller('adminuserDetailCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$routeParams',
				'$cookieStore',
				function($scope, $http, $filter, $location, $routeParams,
						$cookieStore) {
					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.loginusrid=k.id;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};

					$http.get('../userdetails/' + $routeParams.id).then(
							function(response) {
								$scope.userprofile = response.data;

							});

				} ]);

// task detail controller

projectControllers
		.controller(
				'admintaskDetailCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'$routeParams',
						'$location',
						'$cookieStore',
						function($scope, $http, $filter, $routeParams,
								$location, $cookieStore) {

							var k = ($cookieStore.get('usrnamecookie'));
							// alert(k.firstName);
							var l = ($cookieStore.get('loggedinuser'));
							$scope.loginusrmail = l.emailId;
							$scope.loginusrname = k.firstName + " "
									+ k.lastName;
							$scope.loginusrid=k.id;
							$scope.logout = function() {
								$cookieStore.remove('loggedinuser');
								$scope.username = null;
								$scope.password = null;
								$cookieStore.remove('usrnamecookie');
								alert('logout successfully');
								$location.path('/login');
							};
							// $rootScope.rootid=$routeParams.id;
							$http
									.get('../taskdetails/' + $routeParams.id)
									.then(
											function(response) {
												// alert(response.data.id);
												$scope.admintask = response.data;
												var myid=response.data.rootTaskId;
												//alert(response.data.rootTaskId);
												$http.get('../taskdetails/'+myid).then(function(response){
													$scope.roottaskname=response.data.taskName;
												});
												if ($scope.admintask.taskStatus == false) {
													$scope.adminstatus = "work in progress";
												} else if ($scope.admintask.taskStatus == true) {
													$scope.adminstatus = "completed";
												}
											});

						} ]);

// user list controller

projectControllers.controller('adminuserListCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$routeParams',
				'$location',
				'$cookieStore',
				function($scope, $http, $filter, $routeParams, $location,
						$cookieStore) {
					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.loginusrid=k.id;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};

					$http.get('../userdetails?find=ByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals&emailId='
							+ l.emailId+'&verifiednot=on&enablednot=on&roleName=ROLE_ADMIN').then(function(response) {
						// alert(response.data[0].id);
						$scope.users = response.data;
					});

				} ]);

// new task creation controller
projectControllers.controller('adminnewTaskCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$routeParams',
				'$location',
				'$cookieStore',
				function($scope, $http, $filter, $routeParams, $location,
						$cookieStore) {
					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.loginusrid=k.id;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};

					$http.get('../userdetails?find=ByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals&emailId='
							+ l.emailId+'&verifiednot=on&enablednot=on&roleName=ROLE_ADMIN').then(
							function(response) {
								// alert(response.data[0].id);
								$scope.users = response.data;
								$scope.subusers = response.data;
								//$scope.superusers = response.data;
								var d = new Date();
								
								// $scope.task.taskProgress=3;
								$scope.task = {
									'assignDate':d.toLocaleDateString(),
									'rootTaskId' : 0,
									'assignBy':k.firstName+" "+k.lastName
								};

							});

					$scope.createtask = function() {
						$scope.task.taskStatus = false;
						$scope.task.taskProgress = 3;
						$scope.task.assignBy=k;
						$http({
							method : 'POST',
							url : '../taskdetails',
							headers : {
								'content-Type' : 'application/json'
							},
							data : $scope.task

						}).success(function(data, status, headers, config) {
							alert(status);
							$scope.task = {};
							$location.path('/admintasks');
						}).error(function(data, status, headers, config) {
							alert('error occured.........');
						});
					};
					$scope.canceltask = function() {
						$scope.task = {};
					};

				} ]);

// create sub task controller
projectControllers.controller('adminnewsubTaskCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$routeParams',
				'$location',
				'$cookieStore',
				function($scope, $http, $filter, $routeParams, $location,
						$cookieStore) {
					var k = ($cookieStore.get('usrnamecookie'));
					// alert(k.firstName);
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.loginusrid=k.id;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};

					$http.get('../userdetails?find=ByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals&emailId='
							+ l.emailId+'&verifiednot=on&enablednot=on&roleName=ROLE_ADMIN').then(
							function(response) {
								$scope.users = response.data;
								$scope.subusers = response.data;
								$scope.superusers = response.data;
								var d = new Date();
								// $scope.task.taskProgress=3;
								$scope.task = {
									'assignDate' : d.getMonth() + '/'
											+ d.getDate() + '/'
											+ d.getFullYear(),
									'rootTaskId' : $routeParams.id,
									'assignBy' : k.firstName + " " + k.lastName
								};

							});

					$scope.createsubtask = function() {
						// console.log(k);
						$scope.task.taskStatus = false;
						$scope.task.taskProgress = 3;
						$scope.task.assignBy = k;
						$http({
							method : 'POST',
							url : '../taskdetails',
							headers : {
								'content-Type' : 'application/json'
							},
							data : $scope.task

						}).success(
								function(data, status, headers, config) {
									alert(status);
									$scope.task = {};
									$location.path('/adminsubtasklist/'
											+ $routeParams.id);
									// $location.path('/tasklist');

								}).error(
								function(data, status, headers, config) {
									alert('error occured.........');
								});
					};
					$scope.cancelsubtask = function() {
						$scope.task = {};
					};

				} ]);

// allocate new task for user controller

projectControllers.controller('userTaskCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$routeParams',
				'$location',
				'$cookieStore',
				function($scope, $http, $filter, $routeParams, $location,
						$cookieStore) {

					$http.get('../taskdetails').then(function(response) {
						$scope.roottasks = response.data;
					});
					var k = ($cookieStore.get('usrnamecookie'));
					var mm;
					var l = ($cookieStore.get('loggedinuser'));
					$scope.loginusrmail = l.emailId;
					$scope.loginusrname = k.firstName + " " + k.lastName;
					$scope.loginusrid=k.id;
					$scope.logout = function() {
						$cookieStore.remove('loggedinuser');
						$scope.username = null;
						$scope.password = null;
						$cookieStore.remove('usrnamecookie');
						alert('logout successfully');
						$location.path('/login');
					};

					/*
					 * $http.get('../userdetails').then(function(response) {
					 * $scope.users = response.data; $scope.subusers =
					 * response.data; $scope.superusers = response.data; });
					 */
					$http.get('../userdetails/' + $routeParams.id).then(
							function(response) {

								// alert(response.data.firstName);
								mm = response.data;
								var str = response.data.firstName + " "
										+ response.data.lastName;
								var d = new Date();
								// $scope.task.taskProgress=3;
								$scope.task = {
									'assignDate' : d.getMonth() + 1 + '/'
											+ d.getDate() + '/'
											+ d.getFullYear(),
									'assignTo' : str,
									'assignBy' : k.firstName + " " + k.lastName
								};

							});

					$scope.createsubtask = function() {
						$scope.task.taskStatus = false;
						$scope.task.taskProgress = 3;
						$scope.task.assignBy = k;
						$scope.task.assignTo = mm;
						$http({
							method : 'POST',
							url : '../taskdetails',
							headers : {
								'content-Type' : 'application/json'
							},
							data : $scope.task

						}).success(function(data, status, headers, config) {
							// alert(status);
							var id = $scope.task.rootTaskId;
							$scope.task = {};
							if (id == 0) {
								$location.path('/admintasks');
							} else {
								$location.path('/adminsubtasklist/' + id);
							}

							// $location.path('/tasklist');

						}).error(function(data, status, headers, config) {
							alert('error occured.........');
						});
					};
					$scope.cancelsubtask = function() {
						$scope.task = {};
					};

				} ]);


/*//admin profile controller

projectControllers.controller('adminprofileCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {

			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.firstName);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			$http.get('../userdetails/' + k.id).then(function(response) {
				$scope.userprofile = response.data;
			});

		} ]);*/

// edit username controller

projectControllers.controller('adminnameEditCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {
			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.contactNumber);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.loginusrid=k.id;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			$http.get('../userdetails/' + $routeParams.id).then(
					function(response) {
						$scope.usredit = response.data;
					});

			$scope.updateusername = function() {

				$http({
					method : 'PUT',
					url : '../userdetails/' + $routeParams.id,
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.userForm

				}).success(function(data, status, headers, config) {
					$location.path('/adminuserdetail/'+$routeParams.id);

				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
			};

		} ]);

// edit contact number controller

projectControllers.controller('admincontactEditCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {
			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.contactNumber);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.loginusrid=k.id;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			$http.get('../userdetails/' + $routeParams.id).then(
					function(response) {
						$scope.usredit = response.data;
					});

			$scope.updatecontact = function() {

				$http({
					method : 'PUT',
					url : '../userdetails/' + $routeParams.id,
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.usredit

				}).success(function(data, status, headers, config) {
					$location.path('/adminuserdetail/'+$routeParams.id);

				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
			};

		} ]);

// user city edit controller

projectControllers.controller('admincityEditCtrl', [
		'$scope',
		'$http',
		'$filter',
		'$routeParams',
		'$location',
		'$cookieStore',
		'$rootScope',
		function($scope, $http, $filter, $routeParams, $location, $cookieStore,
				$rootScope) {
			var k = ($cookieStore.get('usrnamecookie'));
			// alert(k.contactNumber);
			var l = ($cookieStore.get('loggedinuser'));
			$scope.loginusrmail = l.emailId;
			$scope.loginusrname = k.firstName + " " + k.lastName;
			$scope.loginusrid=k.id;
			$scope.logout = function() {
				$cookieStore.remove('loggedinuser');
				$scope.username = null;
				$scope.password = null;
				$cookieStore.remove('usrnamecookie');
				alert('logout successfully');
				$location.path('/login');
			};
			$http.get('../userdetails/' + $routeParams.id).then(
					function(response) {
						$scope.usredit = response.data;
					});

			$scope.updatecity = function() {

				$http({
					method : 'PUT',
					url : '../userdetails/' + $routeParams.id,
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.usredit

				}).success(function(data, status, headers, config) {
					$location.path('/adminuserdetail/'+$routeParams.id);

				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
			};

		} ]);

// graph controller
projectControllers
		.controller(
				'chartCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'$routeParams',
						'$location',
						'$cookieStore',
						function($scope, $http, $filter, $routeParams,
								$location, $cookieStore) {

							var k = ($cookieStore.get('usrnamecookie'));
							// alert(k.firstName);
							var l = ($cookieStore.get('loggedinuser'));
							$scope.loginusrmail = l.emailId;
							$scope.loginusrname = k.firstName + " "
									+ k.lastName;
							$scope.loginusrid=k.id;
							$scope.logout = function() {
								$cookieStore.remove('loggedinuser');
								$scope.username = null;
								$scope.password = null;
								$cookieStore.remove('usrnamecookie');
								alert('logout successfully');
								$location.path('/login');
							};
							var len=29,msgcount=0;
							var ary=[];var msg;var trimmsg;
			   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
			   					//$scope.messages=response.data;
			   					angular.forEach(response.data,function(e){
			   						//alert(e.sendingDate);
			   						msg=e.alertMessage;
			   						trimmsg=msg.substring(0, len);
			   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
			   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
			   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
			   						msgcount++;
			   					});
			   					if(msgcount==0)
			   					{
			   						$('#noticeboard').removeClass('badge');
			   					}
			   					else
			   					{
			   						$scope.messages=ary;
			   						$scope.notificationcount=msgcount;
			   					}
			   				});
							var margin = {
								top : 5,
								right : 10,
								bottom : 150,
								left : 80
							}, width = 860 - margin.left - margin.right, height = 500
									- margin.top - margin.bottom;

							var x = d3.scale.ordinal().rangeRoundBands(
									[ 0, width ], .05);

							var y = d3.scale.linear().range([ height, 0 ]);

							var xAxis = d3.svg.axis().scale(x).orient("bottom")
									.tickSize(0);

							var yAxis = d3.svg.axis().scale(y).orient("left")
									.ticks(10);

							var svg = d3
									.select("#project")
									.append("svg")
									.attr("width",
											width + margin.left + margin.right)
									.attr("id", "chart")
									.attr("viewBox", "0 0 960 500")
									.attr("preserveAspectRatio", "xMidYMid")
									.attr("height",
											height + margin.top + margin.bottom)
									.append("g").attr(
											"transform",
											"translate(" + margin.left + ","
													+ margin.top + ")");

							var aspect = 960 / 500, chart = $("#chart");
							$(window).on("resize", function() {
								var targetWidth = chart.parent().width() - 100;
								chart.attr("width", targetWidth);
								chart.attr("height", targetWidth / aspect);
							});

							var div = d3.select("#project").append("div").attr(
									"class", "tooltip").style("opacity", 0);

							d3
									.json(
											"../taskdetails?find=ByRootTaskId&rootTaskId=0",
											function(error, data) {
												data
														.forEach(function(d) {
															d.taskProgress = +d.taskProgress;

														});
												var barwidth = (width - 100)
														/ data.length;
												x.domain(data.map(function(d) {
													return d.taskName;
												}));
												y.domain([ 0, 100 ]);

												svg.append("g").attr("class",
														"x axis").attr(
														"transform",
														"translate(0," + height
																+ ")").call(
														xAxis)
														.selectAll("text")
														.style("text-anchor",
																"end")
														.style("font-size", 15)
														.attr("dx", "-.5em")
														.attr("dy", "-.4em")
														.attr("transform",
																"rotate(-65)");

												svg.append("g").attr("class",
														"y axis").call(yAxis)
														.append("text").attr(
																"transform",
																"rotate(-90)")
														.attr("y", 6).attr(
																"dy", ".71em")
														.style("text-anchor",
																"end");

												svg
														.selectAll("bar")
														.data(data)
														.enter()
														.append("rect")
														.style(
																"fill",
																function(d) {
																	if (d.taskProgress > 40)
																		return "steelblue";
																	else
																		return "red";
																})

														.attr(
																"x",
																function(d) {
																	return x(d.taskName);
																})
														.attr("width",
																barwidth - 2)
														.attr(
																"y",
																function(d) {
																	return y(d.taskProgress);
																})
														.attr(
																"height",
																function(d) {
																	return height
																			- y(d.taskProgress);
																})
														.on(
																'mouseover',
																function(d) {
																	d3
																			.select(
																					this)
																			.transition()
																			.duration(
																					200)
																			.style(
																					'fill',
																					'#008cff')
																			.attr(
																					"x",
																					function(
																							d) {
																						return x(d.taskName) + 1;
																					})
																			.attr(
																					"width",
																					barwidth + 2)
																			.attr(
																					"y",
																					function(
																							d) {
																						return y(d.taskProgress) - 10;
																					})
																			.attr(
																					"height",
																					function(
																							d) {
																						return height
																								- y(d.taskProgress)
																								+ 10;
																					});
																	div
																			.transition()
																			.duration(
																					200)
																			.style(
																					"opacity",
																					.9);
																	div
																			.html(
																					"<strong>Task Name : "
																							+ d.taskName
																							+ "</strong> <span style='color:#66ccff;font-weight:bold'>"
																							+ "</span><br> <strong>Task Progress  :  </strong> <span style='color:steelblue;font-weight:bold'>"
																							+ d.taskProgress
																							+ "</span>")
																			.style(
																					"left",
																					(d3.event.pageX - 65)
																							+ "px")
																			.style(
																					"top",
																					(d3.event.pageY - 65)
																							+ "px");

																})
														.on(
																'mouseout',
																function(d) {

																	d3
																			.select(
																					this)
																			.transition()
																			.duration(
																					500)
																			.style(
																					'fill',
																					function() {
																						if (d.taskProgress > 40)
																							return 'steelblue';
																						else
																							return 'red';
																					})
																			.attr(
																					"x",
																					function(
																							d) {
																						return x(d.taskName);
																					})
																			.attr(
																					"width",
																					barwidth - 2)
																			.attr(
																					"y",
																					function(
																							d) {
																						return y(d.taskProgress);
																					})
																			.attr(
																					"height",
																					function(
																							d) {
																						return height
																								- y(d.taskProgress);
																					});
																	div
																			.transition()
																			.duration(
																					500)
																			.style(
																					"opacity",
																					0);
																});
												d3.select("input#sort_me").on(
														"change", change);

												var sortTimeout = setTimeout(
														function() {
															d3
																	.select(
																			"input")
																	.on(
																			"change",
																			change);
														}, 750);

												function change() {
													clearTimeout(sortTimeout);
													var x0 = x
															.domain(
																	data
																			.sort(
																					this.checked ? function(
																							a,
																							b) {
																						return b.taskProgress
																								- a.taskProgress;
																					}
																							: function(
																									a,
																									b) {
																								return d3
																										.ascending(
																												a.taskName,
																												b.taskName);
																							})
																			.map(
																					function(
																							d) {
																						return d.taskName;
																					}))
															.copy();

													var transition = svg
															.transition()
															.duration(750), delay = function(
															d, i) {
														return i * 50;
													};

													transition
															.selectAll("rect")
															.delay(delay)
															.attr(
																	"x",
																	function(d) {
																		return x(d.taskName);
																	})

													transition
															.select(".x.axis")
															.call(xAxis)
															.selectAll("text")
															.style(
																	"text-anchor",
																	"end")
															.style("font-size",
																	15)
															.attr("dx", "-.5em")
															.attr("dy", "-.4em")
															.attr("transform",
																	"rotate(-65)")
															.selectAll("g")
															.delay(delay);

												}

											});
						} ]);

// gantt chart controller

projectControllers
		.controller(
				'ganttchartCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'$routeParams',
						'$location',
						'$cookieStore',
						function($scope, $http, $filter, $routeParams,
								$location, $cookieStore) {
							var k = ($cookieStore.get('usrnamecookie'));
							// alert(k.firstName);
							var l = ($cookieStore.get('loggedinuser'));
							$scope.loginusrmail = l.emailId;
							$scope.loginusrname = k.firstName + " "
									+ k.lastName;
							$scope.loginusrid=k.id;
							$scope.logout = function() {
								$cookieStore.remove('loggedinuser');
								$scope.username = null;
								$scope.password = null;
								$cookieStore.remove('usrnamecookie');
								alert('logout successfully');
								$location.path('/login');
							};
							var len=29,msgcount=0;
							var ary=[];var msg;var trimmsg;
			   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
			   					//$scope.messages=response.data;
			   					angular.forEach(response.data,function(e){
			   						//alert(e.sendingDate);
			   						msg=e.alertMessage;
			   						trimmsg=msg.substring(0, len);
			   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
			   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
			   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
			   						msgcount++;
			   					});
			   					if(msgcount==0)
			   					{
			   						$('#noticeboard').removeClass('badge');
			   					}
			   					else
			   					{
			   						$scope.messages=ary;
			   						$scope.notificationcount=msgcount;
			   					}
			   				});
							var w = 800;
							var h = 400;

							var svg = d3.selectAll(".svg")
							// .selectAll("svg")
							.append("svg").attr("width", w).attr("height", h)
									.attr("class", "svg");

							var taskArray = [
									{
										task : "chat",
										type : "chat",
										startTime : "2014-04-27", // year/month/day
										endTime : "2014-04-28",
										details : "This actually didn't take any conceptualization"
									},

									{
										task : "task2",
										type : "task2",
										startTime : "2014-03-27",
										endTime : "2014-04-24",
										details : "No sketching either, really"
									},

									{
										task : "task3.3",
										type : "task3.3",
										startTime : "2014-03-28",
										endTime : "2014-05-1"
									},

									{
										task : "task4",
										type : "task4",
										startTime : "2014-04-01",
										endTime : "2014-04-30",
										details : "all three lines of it"
									}, {
										task : "task5",
										type : "task5",
										startTime : "2014-04-17",
										endTime : "2014-05-01",
										details : "all three lines of it"
									}, {
										task : "task6",
										type : "task6",
										startTime : "2014-03-20",
										endTime : "2014-04-1",
										details : "all three lines of it"
									},

							];

							var dateFormat = d3.time.format("%Y-%m-%d");

							var timeScale = d3.time.scale().domain(
									[ d3.min(taskArray, function(d) {
										return dateFormat.parse(d.startTime);
									}), d3.max(taskArray, function(d) {
										return dateFormat.parse(d.endTime);
									}) ]).range([ 0, w - 150 ]);

							var categories = new Array();

							for (var i = 0; i < taskArray.length; i++) {
								categories.push(taskArray[i].type);
							}

							var catsUnfiltered = categories; // for vert
							// labels

							categories = checkUnique(categories);

							makeGant(taskArray, w, h);

							var title = svg.append("text").text(
									"Gantt Chart Process").attr("x", w / 2)
									.attr("y", 25)
									.attr("text-anchor", "middle").attr(
											"font-size", 18).attr("fill",
											"#009FFC");

							function makeGant(tasks, pageWidth, pageHeight) {

								var barHeight = 20;
								var gap = barHeight + 4;
								var topPadding = 35;
								var sidePadding = 75;

								var colorScale = d3.scale.linear().domain(
										[ 0, categories.length ]).range(
										[ "#00B9FA", "#F95002" ]).interpolate(
										d3.interpolateHcl);

								makeGrid(sidePadding, topPadding, pageWidth,
										pageHeight);
								drawRects(tasks, gap, topPadding, sidePadding,
										barHeight, colorScale, pageWidth,
										pageHeight);
								vertLabels(gap, topPadding, sidePadding,
										barHeight, colorScale);

							}

							function drawRects(theArray, theGap, theTopPad,
									theSidePad, theBarHeight, theColorScale, w,
									h) {

								var bigRects = svg
										.append("g")
										.selectAll("rect")
										.data(theArray)
										.enter()
										.append("rect")
										.attr("x", 0)
										.attr("y", function(d, i) {
											return i * theGap + theTopPad - 2;
										})
										.attr("width", function(d) {
											return w - theSidePad / 2;
										})
										.attr("height", theGap)
										.attr("stroke", "none")
										.attr(
												"fill",
												function(d) {
													for (var i = 0; i < categories.length; i++) {
														if (d.type == categories[i]) {
															return d3
																	.rgb(theColorScale(i));
														}
													}
												}).attr("opacity", 0.2);

								var rectangles = svg.append('g').selectAll(
										"rect").data(theArray).enter();

								var innerRects = rectangles
										.append("rect")
										.attr("rx", 3)
										.attr("ry", 3)
										.attr(
												"x",
												function(d) {
													return timeScale(dateFormat
															.parse(d.startTime))
															+ theSidePad;
												})
										.attr("y", function(d, i) {
											return i * theGap + theTopPad;
										})
										.attr(
												"width",
												function(d) {
													return (timeScale(dateFormat
															.parse(d.endTime)) - timeScale(dateFormat
															.parse(d.startTime)));
												})
										.attr("height", theBarHeight)
										.attr("stroke", "none")
										.attr(
												"fill",
												function(d) {
													for (var i = 0; i < categories.length; i++) {
														if (d.type == categories[i]) {
															return d3
																	.rgb(theColorScale(i));
														}
													}
												})

								var rectText = rectangles
										.append("text")
										.text(function(d) {
											return d.task;
										})
										.attr(
												"x",
												function(d) {
													return (timeScale(dateFormat
															.parse(d.endTime)) - timeScale(dateFormat
															.parse(d.startTime)))
															/ 2
															+ timeScale(dateFormat
																	.parse(d.startTime))
															+ theSidePad;
												}).attr("y", function(d, i) {
											return i * theGap + 14 + theTopPad;
										}).attr("font-size", 11).attr(
												"text-anchor", "middle").attr(
												"text-height", theBarHeight)
										.attr("fill", "#fff");

								rectText
										.on(
												'mouseover',
												function(e) {
													// console.log(this.x.animVal.getItem(this));
													var tag = "";

													if (d3.select(this).data()[0].details != undefined) {
														tag = "Task: "
																+ d3.select(
																		this)
																		.data()[0].task
																+ "<br/>"
																+ "Type: "
																+ d3.select(
																		this)
																		.data()[0].type
																+ "<br/>"
																+ "Starts: "
																+ d3.select(
																		this)
																		.data()[0].startTime
																+ "<br/>"
																+ "Ends: "
																+ d3.select(
																		this)
																		.data()[0].endTime
																+ "<br/>"
																+ "Details: "
																+ d3.select(
																		this)
																		.data()[0].details;
													} else {
														tag = "Task: "
																+ d3.select(
																		this)
																		.data()[0].task
																+ "<br/>"
																+ "Type: "
																+ d3.select(
																		this)
																		.data()[0].type
																+ "<br/>"
																+ "Starts: "
																+ d3.select(
																		this)
																		.data()[0].startTime
																+ "<br/>"
																+ "Ends: "
																+ d3.select(
																		this)
																		.data()[0].endTime;
													}
													var output = document
															.getElementById("tag");

													var x = this.x.animVal
															.getItem(this)
															+ "px";
													var y = this.y.animVal
															.getItem(this)
															+ 25 + "px";

													output.innerHTML = tag;
													output.style.top = y;
													output.style.left = x;
													output.style.display = "block";
												})
										.on(
												'mouseout',
												function() {
													var output = document
															.getElementById("tag");
													output.style.display = "none";
												});

								innerRects
										.on(
												'mouseover',
												function(e) {
													// console.log(this);
													var tag = "";

													if (d3.select(this).data()[0].details != undefined) {
														tag = "Task: "
																+ d3.select(
																		this)
																		.data()[0].task
																+ "<br/>"
																+ "Type: "
																+ d3.select(
																		this)
																		.data()[0].type
																+ "<br/>"
																+ "Starts: "
																+ d3.select(
																		this)
																		.data()[0].startTime
																+ "<br/>"
																+ "Ends: "
																+ d3.select(
																		this)
																		.data()[0].endTime
																+ "<br/>"
																+ "Details: "
																+ d3.select(
																		this)
																		.data()[0].details;
													} else {
														tag = "Task: "
																+ d3.select(
																		this)
																		.data()[0].task
																+ "<br/>"
																+ "Type: "
																+ d3.select(
																		this)
																		.data()[0].type
																+ "<br/>"
																+ "Starts: "
																+ d3.select(
																		this)
																		.data()[0].startTime
																+ "<br/>"
																+ "Ends: "
																+ d3.select(
																		this)
																		.data()[0].endTime;
													}
													var output = document
															.getElementById("tag");

													var x = (this.x.animVal.value + this.width.animVal.value / 2)
															+ "px";
													var y = this.y.animVal.value
															+ 25 + "px";

													output.innerHTML = tag;
													output.style.top = y;
													output.style.left = x;
													output.style.display = "block";
												})
										.on(
												'mouseout',
												function() {
													var output = document
															.getElementById("tag");
													output.style.display = "none";

												});

							}

							function makeGrid(theSidePad, theTopPad, w, h) {

								var xAxis = d3.svg.axis().scale(timeScale)
										.orient('bottom')
										.ticks(d3.time.days, 1).tickSize(
												-h + theTopPad + 20, 0, 0)
										.tickFormat(d3.time.format('%d %b'));

								var grid = svg
										.append('g')
										.attr('class', 'grid')
										.attr(
												'transform',
												'translate(' + theSidePad
														+ ', ' + (h - 20) + ')')
										.call(xAxis).selectAll("text").style(
												"text-anchor", "middle").attr(
												"fill", "#000").attr("stroke",
												"none").attr("font-size", 10)
										.attr("dy", "1em").attr("transform",
												function(d) {
													return "rotate(65)"
												});
							}

							function vertLabels(theGap, theTopPad, theSidePad,
									theBarHeight, theColorScale) {
								var numOccurances = new Array();
								var prevGap = 0;

								for (var i = 0; i < categories.length; i++) {
									numOccurances[i] = [
											categories[i],
											getCount(categories[i],
													catsUnfiltered) ];
								}

								var axisText = svg
										.append("g")
										// without doing this,
										// impossible to put
										// grid lines behind
										// text
										.selectAll("text")
										.data(numOccurances)
										.enter()
										.append("text")
										.text(function(d) {
											return d[0];
										})
										.attr("x", 10)
										.attr(
												"y",
												function(d, i) {
													if (i > 0) {
														for (var j = 0; j < i; j++) {
															prevGap += numOccurances[i - 1][1];
															// console.log(prevGap);
															return d[1]
																	* theGap
																	/ 2
																	+ prevGap
																	* theGap
																	+ theTopPad;
														}
													} else {
														return d[1] * theGap
																/ 2 + theTopPad;
													}
												})
										.attr("font-size", 11)
										.attr("text-anchor", "start")
										.attr("text-height", 14)
										.attr(
												"fill",
												function(d) {
													for (var i = 0; i < categories.length; i++) {
														if (d[0] == categories[i]) {
															// console.log("true!");
															return d3
																	.rgb(
																			theColorScale(i))
																	.darker();
														}
													}
												});

							}

							// from this stackexchange question:
							// http://stackoverflow.com/questions/1890203/unique-for-arrays-in-javascript
							function checkUnique(arr) {
								var hash = {}, result = [];
								for (var i = 0, l = arr.length; i < l; ++i) {
									if (!hash.hasOwnProperty(arr[i])) { // it
										// works
										// with
										// objects!
										// in FF, at
										// least
										hash[arr[i]] = true;
										result.push(arr[i]);
									}
								}
								return result;
							}

							// from this stackexchange question:
							// http://stackoverflow.com/questions/14227981/count-how-many-strings-in-an-array-have-duplicates-in-the-same-array
							function getCounts(arr) {
								var i = arr.length, // var to loop over
								obj = {}; // obj to store results
								while (i)
									obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count
								// occurrences
								return obj;
							}

							// get specific from everything
							function getCount(word, arr) {
								return getCounts(arr)[word] || 0;
							}

						} ]);
//gantt chart

projectControllers
		.controller(
				'ganttCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'$routeParams',
						'$location',
						'$cookieStore',
						function($scope, $http, $filter, $routeParams,
								$location, $cookieStore) {

							var k = ($cookieStore.get('usrnamecookie'));
							// alert(k.firstName);
							var l = ($cookieStore.get('loggedinuser'));
							$scope.loginusrmail = l.emailId;
							$scope.loginusrname = k.firstName + " "
									+ k.lastName;
							$scope.loginusrid=k.id;
							$scope.logout = function() {
								$cookieStore.remove('loggedinuser');
								$scope.username = null;
								$scope.password = null;
								$cookieStore.remove('usrnamecookie');
								alert('logout successfully');
								$location.path('/login');
							};
							var len=29,msgcount=0;
							var ary=[];var msg;var trimmsg;
			   				$http.get('../alertdetails?find=ByAlertToAndMsgStatusNot&alertTo='+k.id+'&msgStatus=on').then(function(response){
			   					//$scope.messages=response.data;
			   					angular.forEach(response.data,function(e){
			   						//alert(e.sendingDate);
			   						msg=e.alertMessage;
			   						trimmsg=msg.substring(0, len);
			   						ary[msgcount]={"id":e.id,"alertTopic":e.alertTopic,"alertMessage":trimmsg,
			   										"sendingDate":e.sendingDate,"version":e.version,"alertTo":e.alertTo,
			   										"alertBy":e.alertBy,"msgStatus":e.msgStatus};
			   						msgcount++;
			   					});
			   					if(msgcount==0)
			   					{
			   						$('#noticeboard').removeClass('badge');
			   					}
			   					else
			   					{
			   						$scope.messages=ary;
			   						$scope.notificationcount=msgcount;
			   					}
			   				});
							$http.get('../taskdetails?find=ByRootTaskId&rootTaskId=1').then(function(response){
								$scope.tasks=response.data;
							});
							
							$scope.drawGantt=function()
							{
								
							document.getElementById('project').innerHTML = "";
							var m = [ 70, 10, 10, 50 ], w = 960 - m[1] - m[3], h = 430
									- m[0] - m[3];

							var format = d3.format(",.0f");
							var x = d3.time.scale().range([ 0, w ], .5), y = d3.scale
									.ordinal().rangeRoundBands([ 0, h ], .6);

							var svg = d3.select("#project").append("svg").attr(
									"width", w + m[1] + m[3]).attr("height",
									h + m[0] + m[2]).append("g").attr(
									"transform",
									"translate(" + m[3] + "," + m[0] + ")");
							var div = d3.select("#project").append("div").attr(
									"class", "tooltip").style("opacity", 0);
							d3
									.json(
											"../taskdetails?find=ByRootTaskId&rootTaskId="+$scope.taskid,
											function(error, data) {
												// Parse numbers, and sort by
												// value.
												if(data.length==0)
												{
													document.getElementById('project').innerHTML = "<p style='font-size:50px;color:red'> ! No Child Task</p>";
													//alert('no child task......');
												}
												data.forEach(function(d) {
													//alert(d.taskName);
													d.endDate = +d.endDate;
												});
												data.sort(function(a, b) {
													return b.endDate
															- a.endDate;
												});

												// Set the scale domain.

												// var
												// mindate=data.map(function(d){return
												// new Date(d.assignDate);});
												var mindate = d3
														.min(
																data,
																function(d) {
																	return new Date(
																			d.assignDate);
																});
												var maxdate = d3.max(data,
														function(d) {
															return new Date(
																	d.endDate);
														});

												var xAxis = d3.svg
														.axis()
														.scale(x)
														.orient("top")
														.tickSize(-h)
														.tickPadding(6)
														.ticks(d3.time.date, 1)
														.tickFormat(
																d3.time
																		.format("%Y-%m-%d")),

												yAxis = d3.svg.axis().scale(y)
														.orient("left")
														.tickSize(0);
												// alert("mindate : "+mindate);
												// alert("maxdate : "+maxdate);
												x
														.domain([ (mindate),
																maxdate ]);
												y.domain(data.map(function(d) {
													return d.taskName;
												}));

												var bar = svg
														.selectAll("g.bar")
														.data(data)
														.enter()
														.append("g")
														.attr("class", "bar")
														.on(
																'mouseover',
																function(d) {
																	d3
																			.select(
																					this)
																			.transition()
																			.duration(
																					200)
																			.style(
																					'fill',
																					'#008cff')
																			.attr(
																					"x",
																					function(
																							d) {
																						return x(d.taskName) + 1;
																					})
																			.attr(
																					"y",
																					function(
																							d) {
																						return y(d.taskProgress) - 10;
																					})
																			.attr(
																					"height",
																					function(
																							d) {
																						return h
																								- y(d.taskProgress)
																								+ 10;
																					});
																	div
																			.transition()
																			.duration(
																					200)
																			.style(
																					"opacity",
																					.9);
																	var n = new Date();
																	div
																			.html(
																					"<p style='text-align:left'><strong>task Name :</strong> <span style='color:#66ccff;font-weight:bold'>"
																							+ d.taskName
																							+ "</span><br> <strong>Task Progress :</strong> <span style='color:steelblue;font-weight:bold'>"
																							+ d.taskProgress
																							+ "%"
																							+ "</span><br><strong>Start Date :</strong> <span style='color:steelblue;font-weight:bold'>"
																							+ new Date(
																									d.assignDate)
																							+ "</span><br><strong>End Date:</strong> <span style='color:steelblue;font-weight:bold'>"
																							+ new Date(
																									d.endDate)
																							+ "</p>")
																			.style(
																					"left",
																					(d3.event.pageX - 65)
																							+ "px")
																			.style(
																					"top",
																					(d3.event.pageY - 65)
																							+ "px");

																})
														.on(
																'mouseout',
																function(d) {

																	d3
																			.select(
																					this)
																			.transition()
																			.duration(
																					500)
																			.style(
																					'fill',
																					'steelblue')
																			.attr(
																					"y",
																					function(
																							d) {
																						return x(d.taskName);
																					})
																			.attr(
																					"x",
																					function(
																							d) {
																						return y(d.taskProgress);
																					})
																			.attr(
																					"height",
																					function(
																							d) {
																						return h
																								- y(d.taskProgress);
																					});
																	div
																			.transition()
																			.duration(
																					500)
																			.style(
																					"opacity",
																					0);
																})
														.attr(
																"transform",
																function(d) {
																	return "translate(0,"
																			+ y(d.taskName)
																			+ ")";
																});

												bar
														.append("rect")
														.attr("x", 0)
														.attr(
																"width",
																function(d) {
																	return x(d.endDate);
																}).attr(
																"height",
																y.rangeBand());
												bar
														.append("rect")
														.attr("x", 0)
														.style('fill', '#cccccc')
														.attr(
																"width",
																function(d) {
																	return x(d.assignDate);
																}).attr(
																"height",
																y.rangeBand());

												svg
														.append("g")
														.attr("class", "x axis")
														.call(xAxis)
														.selectAll("text")
														.style("text-anchor",
																"end")
														.attr("dx", "-.8em")
														.attr("dy", ".15em")
														.attr(
																"transform",
																function(d) {
																	return "rotate(65)";
																});
												bar
														.append("text")
														.attr("class", "value")
														.attr(
																"x",
																function(d) {
																	return x(d.endDate);
																})
														.attr(
																"y",
																y.rangeBand() / 2)
														.attr("dx", -3).attr(
																"dy", ".35em")
														.attr("text-anchor",
																"end")
														.text(function(d) {
															return d.taskName;
														});

												svg.append("g").attr("class",
														"y axis").call(yAxis);
											});
							};
						} ]);
