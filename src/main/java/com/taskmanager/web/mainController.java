package com.taskmanager.web;

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
public class mainController {

	@RequestMapping
	public String startuop()
	{
		return "redirect:/myapp";
	}
	
	@RequestMapping(value = "/confirm", produces = "text/html")
	public String verifyUser(
			@RequestParam(value="verficationcode",required=true) String userVerificationCode,
			Model uiModel) {
		System.out.println("\n-------in user verified process---------");
		try {
			UserDetail users = UserDetail.findUserDetailsByVerificationCodeEquals(userVerificationCode).getSingleResult();
			
			System.out
					.println("\n-------after fetching UserInfo object---------"
							+ users);
			if (users != null) {
				System.out
						.println("\n-------in if condition to set the enable---------"
								+ users);
				users.setVerified(true);
				users.setEnabled(true);
				users.persist();
				System.out.println("--------user enabled check:"+ users.getEnabled());
				try {
					users.persist();
				} catch (Exception ex) {
					System.out.println(ex.getMessage());
				}
				
				return "redirect:/myapp";

			} else {
				System.out
						.println("\n-------failure in User verification process---------");
				return "redirect:/myapp";
			}
		} catch (Exception e) {
			System.out
					.println("\n-------failure in User verification process---------");
			return "redirect:/myapp";
		}

	}	
	

	
	/*
	 * reset password function
	 */
	
	@RequestMapping(value = "/getVcode", produces = "text/html")
	public String rsetpwd(
			@RequestParam(value="verificationcode",required=true) String userVerificationCode,
			Model uiModel) {
		return "redirect:/myapp/#/resetPassword/"+userVerificationCode;

	}	
}

	
