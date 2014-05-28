// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.taskmanager.domain;

import com.taskmanager.domain.UserDetail;
import com.taskmanager.domain.UserDetailDataOnDemand;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import org.springframework.stereotype.Component;

privileged aspect UserDetailDataOnDemand_Roo_DataOnDemand {
    
    declare @type: UserDetailDataOnDemand: @Component;
    
    private Random UserDetailDataOnDemand.rnd = new SecureRandom();
    
    private List<UserDetail> UserDetailDataOnDemand.data;
    
    public UserDetail UserDetailDataOnDemand.getNewTransientUserDetail(int index) {
        UserDetail obj = new UserDetail();
        setCity(obj, index);
        setContactNumber(obj, index);
        setEmailId(obj, index);
        setEnabled(obj, index);
        setFirstName(obj, index);
        setLastName(obj, index);
        setPassword(obj, index);
        setRoleName(obj, index);
        setVerificationCode(obj, index);
        setVerified(obj, index);
        return obj;
    }
    
    public void UserDetailDataOnDemand.setCity(UserDetail obj, int index) {
        String city = "city_" + index;
        obj.setCity(city);
    }
    
    public void UserDetailDataOnDemand.setContactNumber(UserDetail obj, int index) {
        String contactNumber = "contactNumber_" + index;
        obj.setContactNumber(contactNumber);
    }
    
    public void UserDetailDataOnDemand.setEmailId(UserDetail obj, int index) {
        String emailId = "foo" + index + "@bar.com";
        obj.setEmailId(emailId);
    }
    
    public void UserDetailDataOnDemand.setEnabled(UserDetail obj, int index) {
        Boolean enabled = Boolean.TRUE;
        obj.setEnabled(enabled);
    }
    
    public void UserDetailDataOnDemand.setFirstName(UserDetail obj, int index) {
        String firstName = "firstName_" + index;
        obj.setFirstName(firstName);
    }
    
    public void UserDetailDataOnDemand.setLastName(UserDetail obj, int index) {
        String lastName = "lastName_" + index;
        obj.setLastName(lastName);
    }
    
    public void UserDetailDataOnDemand.setPassword(UserDetail obj, int index) {
        String password = "password_" + index;
        obj.setPassword(password);
    }
    
    public void UserDetailDataOnDemand.setRoleName(UserDetail obj, int index) {
        String roleName = "roleName_" + index;
        obj.setRoleName(roleName);
    }
    
    public void UserDetailDataOnDemand.setVerificationCode(UserDetail obj, int index) {
        String verificationCode = "verificationCode_" + index;
        obj.setVerificationCode(verificationCode);
    }
    
    public void UserDetailDataOnDemand.setVerified(UserDetail obj, int index) {
        Boolean verified = Boolean.TRUE;
        obj.setVerified(verified);
    }
    
    public UserDetail UserDetailDataOnDemand.getSpecificUserDetail(int index) {
        init();
        if (index < 0) {
            index = 0;
        }
        if (index > (data.size() - 1)) {
            index = data.size() - 1;
        }
        UserDetail obj = data.get(index);
        Long id = obj.getId();
        return UserDetail.findUserDetail(id);
    }
    
    public UserDetail UserDetailDataOnDemand.getRandomUserDetail() {
        init();
        UserDetail obj = data.get(rnd.nextInt(data.size()));
        Long id = obj.getId();
        return UserDetail.findUserDetail(id);
    }
    
    public boolean UserDetailDataOnDemand.modifyUserDetail(UserDetail obj) {
        return false;
    }
    
    public void UserDetailDataOnDemand.init() {
        int from = 0;
        int to = 10;
        data = UserDetail.findUserDetailEntries(from, to);
        if (data == null) {
            throw new IllegalStateException("Find entries implementation for 'UserDetail' illegally returned null");
        }
        if (!data.isEmpty()) {
            return;
        }
        
        data = new ArrayList<UserDetail>();
        for (int i = 0; i < 10; i++) {
            UserDetail obj = getNewTransientUserDetail(i);
            try {
                obj.persist();
            } catch (final ConstraintViolationException e) {
                final StringBuilder msg = new StringBuilder();
                for (Iterator<ConstraintViolation<?>> iter = e.getConstraintViolations().iterator(); iter.hasNext();) {
                    final ConstraintViolation<?> cv = iter.next();
                    msg.append("[").append(cv.getRootBean().getClass().getName()).append(".").append(cv.getPropertyPath()).append(": ").append(cv.getMessage()).append(" (invalid value = ").append(cv.getInvalidValue()).append(")").append("]");
                }
                throw new IllegalStateException(msg.toString(), e);
            }
            obj.flush();
            data.add(obj);
        }
    }
    
}
