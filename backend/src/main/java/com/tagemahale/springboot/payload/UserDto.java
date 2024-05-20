package com.tagemahale.springboot.payload;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {


    private int id;

    private String name;
    private String email;
    private String password;
    // private String Contact;


    // private Date date;

    // private String Role;

//     private CartDto cart;

}
