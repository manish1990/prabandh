package com.taskmanager.domain;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;
import javax.validation.constraints.NotNull;
import org.springframework.roo.addon.json.RooJson;
import javax.persistence.Column;

@RooJavaBean
@RooToString
@RooJson
@RooJpaActiveRecord(finders = { "findUserDetailsByEmailIdEquals", "findUserDetailsByEmailIdEqualsAndPasswordEquals", "findUserDetailsByVerificationCodeEquals", "findUserDetailsByEmailIdNotEquals", "findUserDetailsByEnabledNotAndVerifiedNot", "findUserDetailsByEmailIdEqualsAndVerifiedNot", "findUserDetailsByEmailIdNotEqualsAndRoleNameNotEquals", "findUserDetailsByEmailIdEqualsAndRoleNameNotEqualsAndVerifiedNotAndEnabledNot", "findUserDetailsByEmailIdNotEqualsAndVerifiedNotAndEnabledNotAndRoleNameNotEquals" })
public class UserDetail {

    /**
     */
    @NotNull
    private String firstName;

    /**
     */
    @NotNull
    private String lastName;

    /**
     */
    @NotNull
    private String verificationCode;

    /**
     */
    @NotNull
    private String contactNumber;

    /**
     */
    @NotNull
    private Boolean enabled;

    /**
     */
    @NotNull
    private Boolean verified;

    /**
     */
    @NotNull
    private String password;

    /**
     */
    @NotNull
    @Column(unique = true)
    private String emailId;

    /**
     */
    private String roleName;

    /**
     */
    private String city;
}
