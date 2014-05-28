// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.taskmanager.domain;

import com.taskmanager.domain.UserDetail;
import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

privileged aspect UserDetail_Roo_Json {
    
    public String UserDetail.toJson() {
        return new JSONSerializer().exclude("*.class").serialize(this);
    }
    
    public String UserDetail.toJson(String[] fields) {
        return new JSONSerializer().include(fields).exclude("*.class").serialize(this);
    }
    
    public static UserDetail UserDetail.fromJsonToUserDetail(String json) {
        return new JSONDeserializer<UserDetail>().use(null, UserDetail.class).deserialize(json);
    }
    
    public static String UserDetail.toJsonArray(Collection<UserDetail> collection) {
        return new JSONSerializer().exclude("*.class").serialize(collection);
    }
    
    public static String UserDetail.toJsonArray(Collection<UserDetail> collection, String[] fields) {
        return new JSONSerializer().include(fields).exclude("*.class").serialize(collection);
    }
    
    public static Collection<UserDetail> UserDetail.fromJsonArrayToUserDetails(String json) {
        return new JSONDeserializer<List<UserDetail>>().use(null, ArrayList.class).use("values", UserDetail.class).deserialize(json);
    }
    
}
