package com.tagemahale.springboot.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.tagemahale.springboot.model.AppUserRole;
import com.tagemahale.springboot.model.User;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserPrincipal implements OAuth2User, UserDetails {
    private int id;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public UserPrincipal(int id, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    // public static UserPrincipal create(User user) {
    // List<GrantedAuthority> authorities = Collections.
    // singletonList(new SimpleGrantedAuthority("ROLE_USER"));

    // return new UserPrincipal(
    // user.getId(),
    // user.getEmail(),
    // user.getPassword(),
    // authorities
    // );
    // }
    // public String createToken(String username, List<AppUserRole> appUserRoles) {

    // Claims claims = Jwts.claims().setSubject(username);
    // claims.put("auth", appUserRoles.stream().map(s -> new
    // SimpleGrantedAuthority(s.getAuthority()))
    // .filter(Objects::nonNull).collect(Collectors.toList()));

    public static UserPrincipal create(User user, List<AppUserRole> roles) {
        List<GrantedAuthority> authorities = roles.stream().map(s -> new SimpleGrantedAuthority(s.getAuthority()))
                .filter(Objects::nonNull).collect(Collectors.toList()) ;
        
    
        return new UserPrincipal(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    public static UserPrincipal create(User user, Map<String, Object> attributes) {
         
        UserPrincipal userPrincipal = UserPrincipal.create(user, user.getAppUserRoles());
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getName() {
        return String.valueOf(id);
    }
}
