package com.tagemahale.springboot.security;


import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tagemahale.springboot.exception.ResourceNotFoundException;
import com.tagemahale.springboot.model.User;
import com.tagemahale.springboot.repository.UserRepository;

@Service
public class  CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                // .orElseThrow(() ->
                //         new UsernameNotFoundException("User not found with email : " + email)
        ; 
        return UserPrincipal.create(user,user.getAppUserRoles());
    }
    public User loadUserByUsername2(String email)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                // .orElseThrow(() ->
                //         new UsernameNotFoundException("User not found with email : " + email)
        ; 
        return  user ;
    }

    public UserDetails loadUserById(int id) {
        User user = userRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("User", "id", id)
        );
       
        return UserPrincipal.create(user,user.getAppUserRoles());
    }

    // @Transactional  
    public List<User> findUsers( ) {
        List<User> users = userRepository.findAll();
       
        return  users;
    }

    public boolean isAccountVerified(String email) {
        boolean isVerified = userRepository.findEmailVerifiedByEmail(email);
        return isVerified;
    }
}