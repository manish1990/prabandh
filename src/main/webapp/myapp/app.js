'use strict';

/* App Module */

var projectMngmnt = angular.module('projectMngmnt', [ 'ngRoute',

'projectControllers',
'phonecatAnimations',
'ngCookies',
'projectServices',
'angucomplete']);

 projectMngmnt.config([ '$routeProvider', function($routeProvider) {
	
	$routeProvider.when('/login', {
		templateUrl:'./newLogin.html',
		controller:'newloginCtrl'
	}).
	when('/tasks', {
		templateUrl:'./user_task_list.html',
		controller:'taskListCtrl'
	}).
	when('/resetPassword/:code', {
		templateUrl:'./resetPassword.html',
		controller:'resetPasswordCtrl'
	}).
	when('/detailviewtask', {
		templateUrl:'./usrdetailtasklist.html',
		controller:'detailtaskListCtrl'
	}).
	when('/subtasklist/:id', {
		templateUrl:'./childtasklist.html',
		controller:'subtaskListCtrl'
	}).
	when('/subtaskdetail/:id', {
		templateUrl : './subTaskDetail.html',
		controller:'taskDetailCtrl'
	}).
	when('/taskdetail/:id', {
		templateUrl : './taskdetail.html',
		controller:'taskDetailCtrl'
	}).
	when('/userdetail/:id', {
		templateUrl : './userdetail.html',
		controller:'userDetailCtrl'
	}).
	when('/userlist', {
		templateUrl : './userlist.html',
		controller:'userListCtrl'
	}).
	when('/addnewtask/:id', {
		templateUrl : './newtask.html',
		controller : 'newTaskCtrl'
	}).
	when('/usernewtask/:id', {
		templateUrl : './NewTaskForUser.html',
		controller : 'usernewTaskCtrl'
	}).
	when('/userprofile', {
		templateUrl : './user_profile.html',
		controller : 'userprofileCtrl'
	}).
	when('/editusername/:id', {
		templateUrl : './edit_username.html',
		controller :'usernameEditCtrl'
	}).
	when('/editcontact/:id', {
		templateUrl : './edit_contact.html',
		controller:'usercontactEditCtrl'
	}).
	when('/editcity/:id', {
		templateUrl : './edit_city.html',
		controller:'usercityEditCtrl'
	}).
	when('/progressreport', {
		templateUrl : './progress.html',
		controller:'progressCtrl'
	}).	
	when('/viewchart', {
		templateUrl : './charts.html',
		controller:'chartCtrl'
	}).	
	when('/viewganttchart', {
		templateUrl : './ganttchart.html',
		controller:'ganttchartCtrl'
	}).
	when('/ganttchart1',{
		templateUrl:'./newganttchart.html',
		controller:'ganttCtrl'
	}).
	when('/sendnotice/:id',{
		templateUrl:'./mailforward.html',
		controller:'mailingCtrl'
	}).
	when('/mailtoindividual',{
		templateUrl:'./sendToIndividual.html',
		controller:'singlemailCtrl'
	}).
	when('/mailtoall',{
		templateUrl:'./sendToAll.html',
		controller:'mailingAllCtrl'
	}).
	when('/msgview/:id',{
		templateUrl:'./messageview.html',
		controller:'msgCtrl'
	}).
	when('/viewinbox',{
		templateUrl:'./msgInbox.html',
		controller:'inboxCtrl'
	}).
	when('/help',{
		templateUrl:'./Help.html',controller:'taskListCtrl'
	}).

	//******************* admin side mapping********************
/*	when('/newrgstruser', {
		templateUrl:'admin/new_register_user.html',
		controller:'newuserCtrl'
	}).*/
	when('/newuserdetail/:id', {
		templateUrl:'admin/newuserdetail.html',
		controller:'newuserdetailCtrl'
	}).
	when('/adminsinglemail', {
		templateUrl:'admin/sendToIndividual.html',
		controller:'adminsinglemailCtrl'
	}).
	when('/adminmailtoall', {
		templateUrl:'admin/sendToAll.html',
		controller:'adminallmailCtrl'
	}).
	when('/adminsendnotice/:id',{
		templateUrl:'admin/mailforward.html',
		controller:'adminmailingCtrl'
	}).
	when('/admintasks', {
		templateUrl:'admin/tasklist.html',
		controller:'admintaskListCtrl'
	}).
	when('/admintaskdetail/:id', {
		templateUrl : 'admin/taskdetail.html',
		controller:'admintaskDetailCtrl'
	}).
	when('/adminsubtasklist/:id', {
		templateUrl : 'admin/childtasklist.html'
		//controller:'adminsubtasklistCtrl'
	}).
	when('/adminuserdetail/:id', {
		templateUrl :'admin/user_profile.html',
		controller:'adminuserDetailCtrl'
	}).
	when('/adminuserlist', {
		templateUrl : 'admin/userlist.html',
		controller:'adminuserListCtrl'
	}).
	when('/adminnewtask', {
		templateUrl : 'admin/newtask.html',
		controller : 'adminnewTaskCtrl'
	}).
	when('/adminnewsubtask/:id', {
		templateUrl : 'admin/NewSubTask.html',
		controller : 'adminnewsubTaskCtrl'
	}).
	when('/admintaskforuser/:id', {
		templateUrl : 'admin/taskforuser.html',
		controller : 'userTaskCtrl'
	}).
	when('/viewadminchart', {
		templateUrl : 'admin/charts.html',
		controller:'chartCtrl'
	}).	
	when('/viewadminganttchart', {
		templateUrl : 'admin/ganttchart.html',
		controller:'ganttchartCtrl'
	}).
	when('/adminganttchart1',{
		templateUrl:'admin/newganttchart.html',
		controller:'ganttCtrl'
	}).
	when('/editadminusername/:id', {
		templateUrl : 'admin/edit_username.html',
		controller :'adminnameEditCtrl'
	}).
	when('/editadmincontact/:id', {
		templateUrl : 'admin/edit_contact.html',
		controller:'admincontactEditCtrl'
	}).
	when('/editadmincity/:id', {
		templateUrl : 'admin/edit_city.html',
		controller:'admincityEditCtrl'
	}).
	otherwise({
		redirectTo : '/login'
	});

} ]);

