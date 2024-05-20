package com.tagemahale.springboot.payload;

import java.util.List;

import com.tagemahale.springboot.model.AppUserRole;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private List<AppUserRole> roles;
    private String email, username;
private int id;
    public AuthResponse(String accessToken, String username, List<AppUserRole> roles, String email,
    int id) {
        this.accessToken = accessToken;
        this.username = username;
        this.roles = roles;
        this.email = email;
this.id=id;
    }
public int getId(){
    return this.id;
}
public void setId(int id){
   this.id=id;
}
    public String getUsername( ) {
        return username;
    }

    public List<AppUserRole> getRoles( ) {
        return roles;
    }

    public String getEmail( ) {
        return email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(List<AppUserRole> roles) {
        this.roles = roles;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
