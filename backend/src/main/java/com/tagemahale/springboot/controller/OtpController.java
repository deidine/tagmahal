package com.tagemahale.springboot.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tagemahale.springboot.exception.BadRequestException;
import com.tagemahale.springboot.payload.ApiResponse;
import com.tagemahale.springboot.payload.VerifyEmailRequest;
import com.tagemahale.springboot.service.AuthService;
import com.tagemahale.springboot.service.OtpService;

@RestController
@RequestMapping("/auth")
public class OtpController {
    
    @Autowired
    private OtpService otpService;

    @Autowired
    private AuthService authService;

    @PostMapping("/generate-otp")
    public ResponseEntity<?> generateOtp(@Valid @RequestBody 
        VerifyEmailRequest emailRequest) {
        
        if(authService.existsByEmail(emailRequest.getEmail())) {
            if(otpService.generateOtp(emailRequest.getEmail())) {
                return ResponseEntity.ok(new ApiResponse(true, "Otp sent on email account"));
            } else {
                throw new BadRequestException("Unable to send OTP. try again");
            }
        } else {
            throw new BadRequestException("Email is not associated with any account.");
        }
    }
    @PostMapping("/validate-otp")
    public ResponseEntity<?> validateOtp(@Valid @RequestBody VerifyEmailRequest emailRequest) {
        if(emailRequest.getOtpNo() != null) {
            if(otpService.validateOTP(emailRequest.getEmail(), emailRequest.getOtpNo())) {
                return ResponseEntity.ok(new ApiResponse(true, "OTP verified successfully"));
            }
        }
        return ResponseEntity.badRequest().body("Invalid OTP");
    }
}