package com.taskmanager.domain;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import javax.persistence.ManyToOne;
import org.springframework.roo.addon.json.RooJson;
import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;

@RooJavaBean
@RooToString
@RooJson
@RooJpaActiveRecord(finders = { "findAlertDetailsBySendingDateNotEquals", "findAlertDetailsByAlertTo", "findAlertDetailsByMsgStatusNot", "findAlertDetailsByAlertToAndMsgStatusNot" })
public class AlertDetail {

    /**
     */
    private String alertTopic;

    /**
     */
    @ManyToOne
    private UserDetail alertTo;

    /**
     */
    @ManyToOne
    private UserDetail alertBy;

    /**
     */
    private String alertMessage;

    /**
     */
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Date sendingDate;

    /**
     */
    private Boolean msgStatus;
}
