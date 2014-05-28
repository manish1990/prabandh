package com.taskmanager.domain;

import flexjson.JSONDeserializer;

public class MyEmail {
	String msgbody;
	String to;
	String from;
	String sub;
	
    public String getMsgbody() {
		return msgbody;
	}
	public void setMsgbody(String msgbody) {
		this.msgbody = msgbody;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getSub() {
		return sub;
	}
	public void setSub(String sub) {
		this.sub = sub;
	}
	public static MyEmail fromJsonToMyEmail(String json) {
        return new JSONDeserializer<MyEmail>().use(null, MyEmail.class).deserialize(json);
    }

}
