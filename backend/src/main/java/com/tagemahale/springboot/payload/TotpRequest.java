package com.tagemahale.springboot.payload;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter; 
@Getter
@Setter
public class TotpRequest {

    @NotBlank

	private String code;
    @NotBlank

private String email;
}
