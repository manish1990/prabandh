package com.taskmanager.domain;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import javax.validation.constraints.NotNull;
import javax.persistence.ManyToOne;
import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import java.math.BigInteger;
import org.springframework.roo.addon.json.RooJson;

@RooJavaBean
@RooToString
@RooJson
@RooJpaActiveRecord(finders = { "findTaskDetailsByAssignBy", "findTaskDetailsByAssignTo", "findTaskDetailsByRootTaskId" })
public class TaskDetail {

    /**
     */
    @NotNull
    private String taskName;

    /**
     */
    @NotNull
    @ManyToOne
    private UserDetail assignTo;

    /**
     */
    @NotNull
    @ManyToOne
    private UserDetail assignBy;

    /**
     */
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Date assignDate;

    /**
     */
    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "M-")
    private Date endDate;

    /**
     */
    @NotNull
    private BigInteger rootTaskId;

    /**
     */
    @NotNull
    private Boolean taskStatus;

    /**
     */
    private int taskProgress;

    /**
     */
    private String taskDescription;
}
