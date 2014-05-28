'use strict';

/* Services */

var projectServices = angular.module('projectServices', [ 'ngResource' ]);


projectServices.factory('moduletview', [ '$resource', '$http',
		function($resource, $http) {

			return $resource('../moduledetails', {}, {
				getmodule : {
					method : 'GET',
					params : {},
					isArray : true
				}

			});
		} ]);
projectServices.factory('projectidview', [ '$resource', '$http',
		function($resource, $http) {

			return $resource('../projectdetails', {}, {
				getid : {
					method : 'GET',
					params : {},
					isArray : true
				}

			});
		} ]);

projectServices.factory('memberidview', [ '$resource', '$http',
		function($resource, $http) {

			return $resource('../userdetails', {}, {
				getmemberid : {
					method : 'GET',
					params : {},
					isArray : true
				}

			});

		} ]);

projectServices.factory('projectviewinteam', [ '$resource', '$http',
		function($resource, $http) {

			return $resource('../projectdetails', {}, {
				getprojectidinteam : {
					method : 'GET',
					params : {},
					isArray : true
				}

			});

		} ]);

projectServices.factory('moduleviewinteam', [ '$resource', '$http',
		function($resource, $http) {

			return $resource('../moduledetails', {}, {
				getmoduleidinteam : {
					method : 'GET',
					params : {},
					isArray : true
				}

			});

		} ]);

projectServices.factory('teamview', [ '$resource', '$http',
		function($resource, $http) {

			return $resource('../teammemberdetails', {}, {
				getteam : {
					method : 'GET',
					params : {},
					isArray : true
				}

			});

		} ]);

projectServices.factory('superordinateview', [ '$resource', '$http',
		function($resource, $http) {

			return $resource('../userdetails', {}, {
				getsuperordinates : {
					method : 'GET',
					params : {},
					isArray : true
				}

			});

		} ]);

projectServices.factory('superordinateinteamview', [ '$resource', '$http',
		function($resource, $http) {

			return $resource('../userdetails', {}, {
				getsuperordinateinteamview : {
					method : 'GET',
					params : {},
					isArray : true
				}

			});

		} ]);

projectServices.factory('userview', [ '$resource', '$http',
		function($resource, $http) {

			return $resource('../userdetails',{}, {
				getuserdetail : {
					method : 'GET',
					isArray : true
				}

			});

		} ]);


projectServices.factory('leaderview', [ '$resource', '$http',
                              		function($resource, $http) {

                              			return $resource('../userdetails',{}, {
                              				getleader: {
                              					method : 'GET',
                              					isArray : true
                              				}

                              			});

                              		} ]);

projectServices.factory('leaderview1', [ '$resource', '$http',
                                  		function($resource, $http) {

                                  			return $resource('../userdetails',{}, {
                                  				getleader1: {
                                  					method : 'GET',
                                  					isArray : true
                                  				}

                                  			});

                                  		} ]);

projectServices.factory('roleview', [ '$resource', '$http',
                                   		function($resource, $http) {

                                   			return $resource('../userroles',{}, {
                                   				getrole: {
                                   					method : 'GET',
                                   					isArray : true
                                   				}

                                   			});

                                   		} ]);

projectServices.factory('superuserview', [ '$resource', '$http',
                                 		function($resource, $http) {

                                 			return $resource('../userdetails',{}, {
                                 				getsuperusr: {
                                 					method : 'GET',
                                 					isArray : true
                                 				}

                                 			});

                                 		} ]);
projectServices.factory('reqrmntview', [ '$resource', '$http',
                                    		function($resource, $http) {

                                    			return $resource('../requirmentdetails',{}, {
                                    				getrequirment: {
                                    					method : 'GET',
                                    					isArray : true
                                    				}

                                    			});

                                    		} ]);

projectServices.factory('newreqrmnt', [ '$resource', '$http',
                                 		function($resource, $http) {

                                 			return $resource('../moduledetails',{}, {
                                 				getreqmodule: {
                                 					method : 'GET',
                                 					isArray : true
                                 				}

                                 			});

                                 		} ]);

projectServices.factory('newmeetingview', [ '$resource', '$http',
                                 		function($resource, $http) {

                                 			return $resource('../meetingdetails',{}, {
                                 				getmeeting: {
                                 					method : 'GET',
                                 					isArray : true
                                 				}

                                 			});

                                 		} ]);