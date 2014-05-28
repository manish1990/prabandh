package com.taskmanager.web;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.taskmanager.domain.MyEmail;
import com.taskmanager.domain.SendEmail;



@RequestMapping("/myemails")
@Controller

public class MyEmailController {
	
    @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> createFromJson(@RequestBody String json) {
        MyEmail userDetail = MyEmail.fromJsonToMyEmail(json);
       String from=userDetail.getFrom();
       String to=userDetail.getTo();
       String body=userDetail.getMsgbody();
       String sub=userDetail.getSub();
       
      // SendEmail my=new SendEmail();
       ApplicationContext ac = new ClassPathXmlApplicationContext("META-INF/spring/ApplicationContext.xml");
       SendEmail se = (SendEmail) ac.getBean("SendEmail");
       ((com.taskmanager.domain.SendEmail) se).sendMail(from, to,sub,body);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }
}
