package com.tagemahale.springboot.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction; 
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email" ),
        @UniqueConstraint(columnNames =  "phone")
})
public class User {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false)
    private String email;
    @Column(nullable = false )
    private String phone;
 

    @Column(nullable = false)
    private Boolean emailVerified = false;

    @JsonIgnore
    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name = "role_name", nullable = false)
  @Enumerated(EnumType.STRING)//this for creating string in data base
      //  @CollectionTable(name = "roles", 
      //        joinColumns = @JoinColumn(name="roles_id"))
     
    List<AppUserRole> appUserRoles;
   
  
    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
       @OnDelete(action = OnDeleteAction.CASCADE)
    private Cart cart;
 

 
}
