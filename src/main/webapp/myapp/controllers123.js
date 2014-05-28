'use strict';

/* Controllers */

var projectControllers = angular.module('projectControllers', []), e;

projectControllers.controller('newProjectCtrl', [ '$scope', '$http', '$filter',
		'$location', function($scope, $http, $filter, $location) {

			$scope.createproject = function() {

				$http({
					method : 'POST',
					url : '../projectdetails/',
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.project
				}).success(function(data, status, headers, config) {
					$location.path('/viewproject');

				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
			};
			$scope.cancelproject = function() {
				$scope.project = {};
			};

		} ]);

projectControllers.controller('taskListCtrl', [ '$scope', '$http',
		'$filter', 'projectview', '$location',
		function($scope, $http, $filter, projectview, $location) {

			$scope.tasks = projectview.query();

		} ]);

projectControllers.controller('viewModuleCtrl', [ '$scope', '$http', '$filter',
		'moduletview', '$location',
		function($scope, $http, $filter, moduleview, $location) {

			$scope.modules = moduleview.getmodule();

		} ]);

projectControllers.controller('viewuserCtrl', [ '$scope', '$http', '$filter',
		'userview', '$location',
		function($scope, $http, $filter, userview, $location) {

			$scope.users = userview.getuserdetail();

		} ]);

projectControllers.controller('teamLeaderCtrl', [ '$scope', '$http', '$filter',
		'leaderview', '$location',
		function($scope, $http, $filter, leaderview, $location) {

			$scope.leaders = leaderview.getleader();
		} ]);

projectControllers
		.controller(
				'loginCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'roleview',
						'$location',
						'$cookieStore',
						function($scope, $http, $filter, roleview, $location,
								$cookieStore) {
							// $scope.roles=roleview.getrole();
							// $scope.roleInfo={"id":1,"roleName":"ROLE_USER"};
							$scope.login = function(mail, pwd) {
								var url = "../userdetails?find=ByEmailIdEqualsAndPasswordEquals&emailId="
										+ encodeURIComponent(mail)
										+ "&password=" + pwd;

								d3
										.json(
												url,
												function(error, data) {
													if (data != null) {
														var ck = {
															"emailId" : mail
														};
														$cookieStore.put(
																'loggedinusr',
																ck);
														var i = ($cookieStore
																.get('loggedinusr'));
														var ur = "../userdetails?find=ByEmailIdEquals&emailId="
																+ encodeURIComponent(i.emailId);
														d3
																.json(
																		ur,
																		function(
																				error,
																				data) {
																			if (data != null) {
																				angular
																						.forEach(
																								data,
																								function(
																										z) {
																									$cookieStore
																											.put(
																													'usrname',
																													z);
																								});
																			}
																		});

														angular
																.forEach(
																		data,
																		function(
																				rl) {
																			if (rl.roleInfo.roleName == 'ROLE_ADMIN') {
																				// $scope.rolestatus="ROLE_ADMIN";
																				$location
																						.path('/newproject');
																			} else if (rl.roleInfo.roleName == 'ROLE_USER') {

																				// $scope.rolestatus="ROLE_USER";
																				$location
																						.path('/viewtask');
																			}

																		});
													}
												});

							};

							$scope.signup = function() {

								$scope.newuser.enabled = true;
								$scope.newuser.roleInfo = {
									"id" : 2,
									"roleName" : "ROLE_USER",
									"version" : 0
								};
								// alert($scope.newuser);
								$http({
									method : 'POST',
									url : '../userdetails',
									headers : {
										'content-Type' : 'application/json'
									},
									data : $scope.newuser
								})
										.success(
												function(data, status, headers,
														config) {
													// var
													// frm=document.getElementsByName('moduleadd');
													// frm.submit();
													alert('data inserted successfully');
													$location
															.path('/newproject');

												})
										.error(
												function(data, status, headers,
														config) {
													alert('error occured.........');
												});
							};

							$scope.cancelsignup = function() {
								$scope.module = {};
							};

						} ]);

projectControllers
		.controller(
				'viewteamCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						'teamview',
						'superordinateinteamview',
						'$location',
						'$route',
						function($scope, $http, $filter, teamview,
								superordinateinteamview, $location, $route) {

							var ary5 = [];
							var ary2 = teamview.getteam();
							var ary3 = superordinateinteamview
									.getsuperordinateinteamview();

							$scope.showme = function() {
								var ary1 = [];
								var ary4 = [];
								var i = 0;
								ary1 = ary2;
								ary4 = ary3;
								angular
										.forEach(
												ary1,
												function(ar) {
													angular
															.forEach(
																	ary4,
																	function(
																			ar1) {
																		if (ar.superOrdinateId == ar1.id) {

																			ary5[i] = {
																				teamName : ar.teamName,
																				memberName : ar.memberName.firstName,
																				memberProjectId : ar.memberProjectId.projectName,
																				memberModuleId : ar.memberModuleId.moduleName,
																				superOrdinateName : ar1.firstName
																			};
																			i++;

																		}
																	});
												});
								$scope.teams = ary5;
							};

						} ]);

projectControllers.controller('newModuleCtrl', [ '$scope', '$http', '$filter',
		'projectidview', '$location',
		function($scope, $http, $filter, projectidview, $location) {

			$scope.ids = projectidview.getid();
			$scope.module = {
				moduleAllocation : true
			};
			$scope.createmodule = function() {
				$http({
					method : 'POST',
					url : '../moduledetails/',
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.module
				}).success(function(data, status, headers, config) {
					// var frm=document.getElementsByName('moduleadd');
					// frm.submit();
					$location.path('/viewmodule');

				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
			};
			$scope.cancelmodule = function() {
				$scope.module = {};
			};
		} ]);

projectControllers.controller('newTeamCtrl', [
		'$scope',
		'$http',
		'$filter',
		'memberidview',
		'projectviewinteam',
		'moduleviewinteam',
		'superordinateview',
		'$location',
		function($scope, $http, $filter, memberidview, projectviewinteam,
				moduleviewinteam, superordinateview, $location) {

			$scope.ids = memberidview.getmemberid();
			$scope.pids = projectviewinteam.getprojectidinteam();
			$scope.mids = moduleviewinteam.getmoduleidinteam();
			$scope.superordinates = superordinateview.getsuperordinates();

			$scope.createteam = function() {
				$http({
					method : 'POST',
					url : '../teammemberdetails/',
					headers : {
						'content-Type' : 'application/json'
					},
					data : $scope.team
				}).success(function(data, status, headers, config) {
					$location.path('/viewteam');
				}).error(function(data, status, headers, config) {
					alert('error occured.........');
				});
			};
			$scope.cancelteam = function() {
				$scope.team = {};
			};
		} ]);

/*
 * projectControllers.controller('viewtaskCtrl', [ '$scope', '$http', '$filter',
 * 'taskview', '$location', function($scope, $http, $filter, taskview,
 * $location) {
 * 
 *  } ]);
 */

/*projectControllers.controller('logusrCtrl', [ '$scope', '$http', '$filter',
 '$location','$cookieStore','$route',
 function($scope, $http, $filter, $location,$cookieStore,$route) {


 var uid=($cookieStore.get('loggedinusr'));
 $scope.logusr=uid.emailId;
 // $route.reload();
 $scope.getusrname=function()
 {
 var url="../userdetails?find=ByEmailIdEquals&emailId="+encodeURIComponent(uid.emailId);
 d3.json(url,function(error,data){
 if(data!=null)
 {
 angular.forEach(data,function(e)
 {
 $cookieStore.put('usrname',e);
 });                                          
 }

 });
 var j=($cookieStore.get('usrname'));
 $scope.logusrname=j.firstName+" "+j.lastName;
 alert((j.firstName));

 };

 $scope.logout=function()
 {
 $cookieStore.remove('loggedinusr');
 $cookieStore.remove('usrname');
 $location.path('/projects');
 }

 } ]);*/

projectControllers.controller('viewtaskCtrl',
		[
				'$scope',
				'$http',
				'$filter',
				'$location',
				'$cookieStore',
				'superuserview',
				function($scope, $http, $filter, $location, $cookieStore,
						superuserview) {

					/*var usrary=[];
					var ary1=[];
					var i=0;
					var res=[];
					//$scope.tasks=taskview.gettask();
					var eid=$cookieStore.get('usrname');
					
					var i=0;
					d3.json('../teammemberdetails?find=ByMemberName&memberName='+eid.id,function(error,data){
						if(data!=null)
						{
							//alert('inside the matching');
							ary1=data;
							d3.json('../userdetails',function(error,data){
								if(data!=null)
								{
									usrary=data;
									angular.forEach(usrary,function(e){
										angular.forEach(ary1,function(e1){
											if(e.id==e1.superOrdinateId)
											{
												alert(e.firstName);
												res[i]={"teamName":e1.teamName,
														"superOrdinateName":e.firstName,
														"moduleName":e1.memberModuleId.moduleName,
														"projectName":e1.memberProjectId.projectName,
														"moduleStartDate":e1.memberModuleId.moduleStartDate,
														"moduleEndDate":e1.memberModuleId.moduleEndDate};
												i++;
												
												
											}
										});
									});
									$scope.tasks=res;
								}
								
							});
							
						}
					});*/
					var eid=$cookieStore.get('usrname');
					d3.json('../teammemberdetails?find=ByMemberName&memberName='+eid.id,function(error,data){
					if(data!=null)
					{
						//alert('inside the matching');
						$scope.tasks=data;
					}
					});
					alert('welcome! user');
					//$scope.tasks=res;
				} ]);

projectControllers.controller('logusrCtrl', [ '$scope', '$http', '$filter',
		'moduletview', '$location', '$cookieStore',
		function($scope, $http, $filter, moduleview, $location, $cookieStore) {

			var eid = $cookieStore.get('usrname');
			$scope.logusr = eid.emailId;
			$scope.logusrname = eid.firstName + " " + eid.lastName;
			$scope.logout = function() {
				$cookieStore.remove('loggedinusr');
				$cookieStore.remove('usrname');
				$location.path('/projects');
			};
		} ]);

projectControllers.controller('requirmentCtrl', [ '$scope', '$http', '$filter',
                                      		'$location', '$cookieStore','reqrmntview',
                                      		function($scope, $http, $filter,$location, $cookieStore,reqrmntview) {

                                      			var eid = $cookieStore.get('usrname');
                                      			$scope.requirments=reqrmntview.getrequirment();
                                      			
                                      		} ]);

projectControllers.controller('deliverableCtrl', [ '$scope', '$http', '$filter',
                                            		'$location', '$cookieStore','newreqrmnt',
                                            		function($scope, $http, $filter,$location, $cookieStore,newreqrmnt) {

                                            			
                                            					$scope.deliverables=newreqrmnt.getproject();
                                            				
                                            			
                                            		} ]);

projectControllers.controller('newMeetingCtrl', [ '$scope', '$http', '$filter',
                                           		'$location', '$cookieStore','newreqrmnt',
                                           		function($scope, $http, $filter,$location, $cookieStore,newreqrmnt) {

                                           			
                                           					$scope.addMeeing=function()
                                           					{
                                           						$http({
                                           							method : 'POST',
                                           							url : '../meetindetails',
                                           							headers : {
                                           								'content-Type' : 'application/json'
                                           							},
                                           							data : $scope.meeting
                                           						}).success(function(data, status, headers, config) {
                                           							$location.path('/membermeeting');
                                           						}).error(function(data, status, headers, config) {
                                           							alert('error occured.........');
                                           						});
                                           					};
                                           		} ]);

projectControllers.controller('addattendeesCtrl', [ '$scope', '$http', '$filter',
                                             		'$location', '$cookieStore','newreqrmnt',
                                             		function($scope, $http, $filter,$location, $cookieStore,newreqrmnt) {

                                             			
                                             					$scope.addMeeing=function()
                                             					{
                                             						$http({
                                             							method : 'POST',
                                             							url : '../meetindetails',
                                             							headers : {
                                             								'content-Type' : 'application/json'
                                             							},
                                             							data : $scope.meeting
                                             						}).success(function(data, status, headers, config) {
                                             							//$location.path('/adminviewmeeting');
                                             							alert('meeting conducted...');
                                             						}).error(function(data, status, headers, config) {
                                             							alert('error occured.........');
                                             						});
                                             					};
                                             					
                                             				
                                             			
                                             		} ]);

projectControllers.controller('adminviewmeetingCtrl', [ '$scope', '$http', '$filter',
                                             		'$location', '$cookieStore','newmeetingview',
                                             		function($scope, $http, $filter,$location, $cookieStore,newmeetingview) {
															
													$scope.meetings=newmeetingview.getmeeting();
	
                                             		} ]);

projectControllers.controller('newrequirmentCtrl', [ '$scope', '$http', '$filter',
                                            		'$location', '$cookieStore','newreqrmnt',
                                            		function($scope, $http, $filter,$location, $cookieStore,newreqrmnt) {

                                            			//i$scope.reqprojects
                                            			d3.json('../projectdetails?find=ByProjectStatusNot&projectStatus=1',function(error,data){
                                            				if(data!=null)
                                            				{
                                            					$scope.reqprojects=data;
                                            					
                                            				}
                                            			});
                                            			
                                            			$scope.findModule=function(prjid)
                                            			{
                                            				
                                            				//$scope.reqmodules
                                            				//var aryy=newreqrmnt.getreqmodule();
                                            				//$scope.reqmodules=aryy;
                                            				d3.json('../moduledetails?find=ByProjectId&projectId='+prjid,function(error,data){
                                            					if(data!=null)
                                            					{
                                            						$scope.reqmodules=data;
                                            						alert(data);
                                            					}
                                            				});
                                            				
                                            			
                                            			};
                                            		} ]);

