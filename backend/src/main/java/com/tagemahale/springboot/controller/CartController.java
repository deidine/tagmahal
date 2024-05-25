package com.tagemahale.springboot.controller;

 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tagemahale.springboot.payload.CartDto;
import com.tagemahale.springboot.payload.CartHelp;
import com.tagemahale.springboot.payload.ApiResponse;
import com.tagemahale.springboot.service.CartService;

import java.security.Principal;
import java.util.List;
@RestController
@CrossOrigin
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;


    @PostMapping("/addproduct")
    public ResponseEntity<CartDto> addProduct(@RequestBody CartHelp cartHelp,Principal principal){
        String userEmail = principal.getName();
        System.out.println(userEmail+"deideineee");
        System.out.println(userEmail+"deideineee");
        
        cartHelp.setUserEmail(userEmail);
        System.out.println(cartHelp.toString()+"deideineee");
        CartDto cartDto = this.cartService.addProductToCart(cartHelp);
        return new ResponseEntity<>(cartDto, HttpStatus.valueOf(200));
    }

    @GetMapping("/{userid}")
    public ResponseEntity<CartDto> GetCart(Principal principal){
        String userEmail = principal.getName();
        CartDto cartDto = this.cartService.GetCart(userEmail);

        return new ResponseEntity<>(cartDto, HttpStatus.valueOf(200));
    }
    @GetMapping("/allCarts")
    public ResponseEntity<List<CartDto>> getAllCarts() {
        List<CartDto> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }


    @DeleteMapping("/product/{productid}")
    public ResponseEntity<ApiResponse> DeleteItem(Principal principal, @PathVariable Integer productid){
        String userEmail = principal.getName();
        this.cartService.RemoveById(productid,userEmail);

        return new ResponseEntity<>(new ApiResponse(true,"remove"),HttpStatus.valueOf(200));
    }
}
