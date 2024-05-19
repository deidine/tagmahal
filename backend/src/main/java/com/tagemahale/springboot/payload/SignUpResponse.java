package com.tagemahale.springboot.payload;

 
import lombok.Value;

@Value
public class SignUpResponse {
	private boolean using2FA;
	private String qrCodeImage;
	private String email;
}