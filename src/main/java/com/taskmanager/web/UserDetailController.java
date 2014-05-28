package com.taskmanager.web;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import com.taskmanager.domain.SendEmail;
import com.taskmanager.domain.UserDetail;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.roo.addon.web.mvc.controller.finder.RooWebFinder;

@RooWebJson(jsonObject = UserDetail.class)
@Controller
@RequestMapping("/userdetails")
@RooWebScaffold(path = "userdetails", formBackingObject = UserDetail.class)
@RooWebFinder
public class UserDetailController {

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> showJson(@PathVariable("id") Long id) {
        UserDetail userDetail = UserDetail.findUserDetail(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (userDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(userDetail.toJson(), headers, HttpStatus.OK);
    }

    @RequestMapping(headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> listJson() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        List<UserDetail> result = UserDetail.findAllUserDetails();
        return new ResponseEntity<String>(UserDetail.toJsonArray(result), headers, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> createFromJson(@RequestBody String json, HttpServletRequest httpServletRequest) {
        System.out.println("in the userdetail controller");
        UserDetail userDetail = UserDetail.fromJsonToUserDetail(json);
        userDetail.persist();
        String to = userDetail.getEmailId();
        System.out.println("email :  " + to);
        if (to != null) {
            UUID vcode = UUID.randomUUID();
            userDetail.setVerificationCode(vcode.toString());
            System.out.println(vcode.toString());
            System.out.println(userDetail.getVerificationCode());
            String verificationUrl = httpServletRequest.getRequestURL().toString() + "?verificationCode=" + vcode;
            String newurl = httpServletRequest.getRequestURL().toString().replaceAll("userdetails", "confirm") + "?verficationcode=" + vcode;
            System.out.println(newurl);
            String verificationMsg = "Dear " + userDetail.getFirstName() + " " + userDetail.getLastName() + ",\n this is your verification code click on below link to verify your registeration.\n\n" + newurl;
            userDetail.setVerified(false);
            //SendEmail se=new SendEmail();
            //InputStream in=null;
            //in=this.getClass().getResourceAsStream("/email.propertiess");
            ApplicationContext ac = new ClassPathXmlApplicationContext("META-INF/spring/ApplicationContext.xml");
            SendEmail se = (SendEmail) ac.getBean("SendEmail");
            ((com.taskmanager.domain.SendEmail) se).sendMail("kingsharma508@gmail.com", to, "registeration", verificationMsg);
            userDetail.persist();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/jsonArray", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> createFromJsonArray(@RequestBody String json) {
        for (UserDetail userDetail : UserDetail.fromJsonArrayToUserDetails(json)) {
            userDetail.persist();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    //coding for sending email
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<String> updateFromJson(@RequestBody String json, @PathVariable("id") Long id) {
        HttpServletRequest httpServletRequest = null;
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        UserDetail userDetail = UserDetail.fromJsonToUserDetail(json);
        if (userDetail.merge() == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public ResponseEntity<String> deleteFromJson(@PathVariable("id") Long id) {
        UserDetail userDetail = UserDetail.findUserDetail(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        if (userDetail == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        userDetail.remove();
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }

    @RequestMapping(params = "find=ByEmailIdEquals", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> jsonFindUserDetailsByEmailIdEquals(@RequestParam("emailId") String emailId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(UserDetail.toJsonArray(UserDetail.findUserDetailsByEmailIdEquals(emailId).getResultList()), headers, HttpStatus.OK);
    }

    @RequestMapping(params = "find=ByEmailIdEqualsAndPasswordEquals", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> jsonFindUserDetailsByEmailIdEqualsAndPasswordEquals(@RequestParam("emailId") String emailId, @RequestParam("password") String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(UserDetail.toJsonArray(UserDetail.findUserDetailsByEmailIdEqualsAndPasswordEquals(emailId, password).getResultList()), headers, HttpStatus.OK);
    }

    @RequestMapping(params = "find=ByEmailIdNotEquals", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> jsonFindUserDetailsByEmailIdNotEquals(@RequestParam("emailId") String emailId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(UserDetail.toJsonArray(UserDetail.findUserDetailsByEmailIdNotEquals(emailId).getResultList()), headers, HttpStatus.OK);
    }

    @RequestMapping(params = "find=ByEnabledNotAndVerifiedNot", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> jsonFindUserDetailsByEnabledNotAndVerifiedNot(@RequestParam(value = "enabled", required = false) Boolean enabled, @RequestParam(value = "verified", required = false) Boolean verified) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(UserDetail.toJsonArray(UserDetail.findUserDetailsByEnabledNotAndVerifiedNot(enabled == null ? Boolean.FALSE : enabled, verified == null ? Boolean.FALSE : verified).getResultList()), headers, HttpStatus.OK);
    }

    @RequestMapping(params = "find=ByVerificationCodeEquals", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> jsonFindUserDetailsByVerificationCodeEquals(@RequestParam("verificationCode") String verificationCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(UserDetail.toJsonArray(UserDetail.findUserDetailsByVerificationCodeEquals(verificationCode).getResultList()), headers, HttpStatus.OK);
    }
}
