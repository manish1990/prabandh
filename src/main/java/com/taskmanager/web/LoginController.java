package com.taskmanager.web;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;

import com.taskmanager.domain.SendEmail;
import com.taskmanager.domain.UserDetail;

import flexjson.JSONSerializer;
@Controller
@RequestMapping("/")


public class LoginController {
	/*
	 * method that send mail to individual user
	 */
		@RequestMapping("/sendNotification")
		public ResponseEntity<String> sendMailToCandidate(@RequestBody String json,
				HttpServletRequest httpServletRequest, Model model,
				HttpServletResponse response) {
			try {
				JSONParser jsonParser = new JSONParser();
				JSONObject jsonObject = (JSONObject) jsonParser.parse(json);
				String emailId = (String) jsonObject.get("to");
				UserDetail user=new UserDetail();
				user=UserDetail.findUserDetailsByEmailIdEquals(emailId).getSingleResult();
				String recipient=user.getFirstName();
				System.out.println(emailId);
				String mailFrom = "kingsharma508@gmail.com";
				@SuppressWarnings("resource")
				ApplicationContext context = new ClassPathXmlApplicationContext("META-INF/spring/applicationContext.xml");
				SendEmail sendmail = (SendEmail) context.getBean("SendEmail");
				String subjectForUserVerificationMail =(String) jsonObject.get("subject") ;
	            String msgbody=(String) jsonObject.get("body");
	            System.out.println(msgbody);
	            String fromuser=(String) jsonObject.get("sender");
	            String messageForUserVerification = "Dear" + " " + recipient + ",\n\n "
	            		+ msgbody;
	            String signatureString = "\n\nRegards,\n"+fromuser+".";
	            messageForUserVerification = messageForUserVerification + signatureString;
	            try {
	                sendmail.sendMail(mailFrom,emailId,subjectForUserVerificationMail,messageForUserVerification);
	                System.out.println("sending message.....");
	                
	            } catch (Exception sm) {
	                System.out.println("Error/Error when sending message");
	            }
				
				//Message......
				String resMessage = "Message has been send to the given e-mail id ";
				String jsonString = new JSONSerializer().exclude("*.class")
						.serialize(resMessage);
				return new ResponseEntity<String>(jsonString, HttpStatus.OK);

			} catch (Exception e) {
				System.out.println("exeption to sending the mail---" + json);

				String resMessage = "Error in sending mail to the given e-mail id.";
				String jsonString = new JSONSerializer().exclude("*.class")
						.serialize(resMessage);
				return new ResponseEntity<String>(jsonString, HttpStatus.NOT_FOUND);
			}

		}
		
		/*
		 * send default mail to all user.....
		 */
		
		@RequestMapping("/sendNotificationToAll")
		public ResponseEntity<String> sendMailToAllUser(@RequestBody String json,
				HttpServletRequest httpServletRequest, Model model,
				HttpServletResponse response) {
			try {
				JSONParser jsonParser = new JSONParser();
				JSONObject jsonObject = (JSONObject) jsonParser.parse(json);
				String emailId = (String) jsonObject.get("to");
				UserDetail user=new UserDetail();
				user=UserDetail.findUserDetailsByEmailIdEquals(emailId).getSingleResult();
				String recipient=user.getFirstName();
				System.out.println(emailId);
				String mailFrom = "kingsharma508@gmail.com";
				@SuppressWarnings("resource")
				ApplicationContext context = new ClassPathXmlApplicationContext("META-INF/spring/applicationContext.xml");
				SendEmail sendmail = (SendEmail) context.getBean("SendEmail");
				String subjectForUserVerificationMail =(String) jsonObject.get("subject") ;
	            String msgbody=(String) jsonObject.get("body");
	            System.out.println(msgbody);
	            String fromuser=(String) jsonObject.get("sender");
	            String messageForUserVerification = "Dear" + " " + recipient + ",\n\n "
	            		+ msgbody;
	            String signatureString = "\n\nRegards,\n"+fromuser+".";
	            messageForUserVerification = messageForUserVerification + signatureString;
	            try {
	                sendmail.sendMail(mailFrom,emailId,subjectForUserVerificationMail,messageForUserVerification);
	                System.out.println("sending message.....");
	                
	            } catch (Exception sm) {
	                System.out.println("Error/Error when sending message");
	            }
				
				//Message......
				String resMessage = "Message has been send to the given e-mail id ";
				String jsonString = new JSONSerializer().exclude("*.class")
						.serialize(resMessage);
				return new ResponseEntity<String>(jsonString, HttpStatus.OK);

			} catch (Exception e) {
				System.out.println("exeption to sending the mail---" + json);

				String resMessage = "Error in sending mail to the given e-mail id.";
				String jsonString = new JSONSerializer().exclude("*.class")
						.serialize(resMessage);
				return new ResponseEntity<String>(jsonString, HttpStatus.NOT_FOUND);
			}

		}
		
		/*
		 * send mail to user to reset new password........
		 */
		
		@RequestMapping(value="/forgetpassword", produces="text/html")
		public ResponseEntity<String> mailtoforgotuser(@RequestBody String json,
				HttpServletRequest httpServletRequest, Model model,
				HttpServletResponse response) {
			System.out.println("function call");
			try {
				JSONParser jsonParser = new JSONParser();
				JSONObject jsonObject = (JSONObject) jsonParser.parse(json);
				String emailId = (String) jsonObject.get("EMailId");
				UserDetail user=new UserDetail();
				boolean verify=false;
				user=UserDetail.findUserDetailsByEmailIdEqualsAndVerifiedNot(emailId,verify).getSingleResult();
				if(user.getEmailId()!=null){
					String usermail=user.getEmailId();
					String recipient=user.getFirstName()+" "+user.getLastName();
					System.out.println(emailId);
					String mailFrom = "kingsharma508@gmail.com";
					@SuppressWarnings("resource")
					
					UUID vcode = UUID.randomUUID();
					user.setVerificationCode(vcode.toString());
					user.merge();
					
					ApplicationContext context = new ClassPathXmlApplicationContext("META-INF/spring/applicationContext.xml");
					SendEmail sendmail = (SendEmail) context.getBean("SendEmail");
					String subjectForUserVerificationMail ="Reset Password";
					String url=httpServletRequest.getRequestURL().toString();
					//String newurl = httpServletRequest.getRequestURL().toString().replaceAll("userdetails", "rsetpassword") + "?verficationcode=" + vcode;
					url=url.substring(0,url.indexOf("/forgetpassword"));
					
		            String msgbody=url+"/resetpassword?verificationcode=" + vcode;
		            System.out.println(msgbody);
		            String fromuser=(String) jsonObject.get("sender");
		            String messageForUserVerification = "Dear" + " " + recipient + ",\n\n"+
		            		"You are receiving this mail as a request has been placed to reset your"+
		            		" password at Prabandh.in If you did not place this request, kindly\n" +
		            		" ignore this email else use the below link for resetting password. You can \n"+
							" also copy and paste this link on your browser address bar.\n" +msgbody;
		            String signatureString = "\n\nRegards,\n"+"Prabandh"+".";
		            messageForUserVerification = messageForUserVerification + signatureString;
		            try {
		                sendmail.sendMail(mailFrom,usermail,subjectForUserVerificationMail,messageForUserVerification);
		                System.out.println("sending message.....");
		                
		            } catch (Exception sm) {
		                System.out.println("Error/Error when sending message");
		            }
					
					//Message......
					String resMessage = "Message has been send to the given e-mail id ";
					String jsonString = new JSONSerializer().exclude("*.class")
							.serialize(resMessage);
					return new ResponseEntity<String>(jsonString, HttpStatus.OK);
				}
				else{
					String resMessage = "Email id you have entered is not found , try again...!!!";
					String jsonString = new JSONSerializer().exclude("*.class")
							.serialize(resMessage);
					return new ResponseEntity<String>(jsonString, HttpStatus.OK);
					
				}
				

			} catch (Exception e) {
				System.out.println("exeption to sending the mail---" + json);

				String resMessage = "Error in sending mail to the given e-mail id.";
				String jsonString = new JSONSerializer().exclude("*.class")
						.serialize(resMessage);
				return new ResponseEntity<String>(jsonString, HttpStatus.NOT_FOUND);
			}
			

		}
		
		/*
		 * function to map the reset password......
		 */
		
		@RequestMapping(value = "/resetpassword", produces = "text/html")
		public String forgotpwd(
				@RequestParam(value="verificationcode",required=true) String userVerificationCode,
				Model uiModel) {
			System.out.println("\n-------in user verified process---------");
			try {
				UserDetail users = UserDetail.findUserDetailsByVerificationCodeEquals(userVerificationCode).getSingleResult();
				
				if (users != null) {
					return "redirect:/getVcode?verificationcode="+userVerificationCode;
					

				} else {
					return "redirect:/myapp";
				}
			} catch (Exception e) {
				System.out
						.println("\n-------failure in User verification process---------");
				return "redirect:/myapp";
			}

		}	
		
		
		/*
		 * change password finally....
		 */
		@RequestMapping(value = "/changepassword", produces = "text/html")
		public ResponseEntity<String> changingpwd(@RequestBody String json,
				HttpServletRequest httpServletRequest, Model model,
				HttpServletResponse response) {
			System.out.println("function call....");
			
			try {
				JSONParser jsonParser = new JSONParser();
				JSONObject jsonObject = (JSONObject) jsonParser.parse(json);
				String mycode = (String) jsonObject.get("verificationcode");
				String newpwd=(String)jsonObject.get("password");
				System.out.println(mycode+"----"+newpwd);
				UserDetail users=new UserDetail();
				System.out.println(newpwd);
				users = UserDetail.findUserDetailsByVerificationCodeEquals(mycode).getSingleResult();
				System.out.println("USEr detail before change:"+users.toString());
				users.setPassword(newpwd);
				users.merge();
				System.out.println("USEr detail after change:"+users);
				String resMessage = "password successfully changed.......";
				String jsonString = new JSONSerializer().exclude("*.class")
						.serialize(resMessage);
				return new ResponseEntity<String>(jsonString, HttpStatus.OK);
			} catch (Exception e) {
				String resMessage = "Error in changing password!!!!!!!!";
				String jsonString = new JSONSerializer().exclude("*.class")
						.serialize(resMessage);
				return new ResponseEntity<String>(jsonString, HttpStatus.OK);
			}

		}
		

}
