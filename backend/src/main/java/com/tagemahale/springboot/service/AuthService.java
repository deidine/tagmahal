package com.tagemahale.springboot.service;

import dev.samstevens.totp.secret.SecretGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tagemahale.springboot.model.Cart;
import com.tagemahale.springboot.model.ConfirmationToken;
import com.tagemahale.springboot.model.User;
import com.tagemahale.springboot.payload.SignUpRequest;
import com.tagemahale.springboot.repository.ConfirmationTokenRepository;
import com.tagemahale.springboot.repository.UserRepository;

@Service
public class AuthService {

	@Autowired
	private SecretGenerator secretGenerator;
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);        
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public User saveUser(SignUpRequest signUpRequest) {
        User user = new User();
              Cart cart= new Cart();
        cart.setUser(user);
        user.setCart(cart);

        user.setAppUserRoles(signUpRequest.getAppUserRoles());
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword()); 
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean changePassword(String email, String password) {
        User user = findByEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        if(save(user) != null) {
            return true;
        }
        return false;
    }

    public ConfirmationToken createToken(User user) {
        ConfirmationToken confirmationToken = new ConfirmationToken(user);
        return confirmationTokenRepository.save(confirmationToken);
    }
    public ConfirmationToken findByConfirmationToken(String token) {
        return confirmationTokenRepository.findByConfirmationToken(token);
    }
    public void deleteToken(ConfirmationToken confirmationToken) {
        this.confirmationTokenRepository.delete(confirmationToken);
    }
}