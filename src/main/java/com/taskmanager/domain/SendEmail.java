package com.taskmanager.domain;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import javax.mail.internet.*;

public class SendEmail {

	private MailSender mailSender;

	public void setMailSender(MailSender mailSender) {
		this.mailSender = mailSender;
	}

	public void sendMail(String from, String to, String subject, String msg) {
		System.out.println("inside sendMail()");
		System.out.println(from+to+subject+msg);
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			String from1=new InternetAddress(from,"Prabandh").toString();
			message.setFrom(from1);
			message.setTo(to);
			message.setSubject(subject);
			message.setText(msg);
			mailSender.send(message);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

}
