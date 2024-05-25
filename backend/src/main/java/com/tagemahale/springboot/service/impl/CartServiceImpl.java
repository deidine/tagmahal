package com.tagemahale.springboot.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tagemahale.springboot.model.Cart;
import com.tagemahale.springboot.model.CartDetalis;
import com.tagemahale.springboot.model.Product;
import com.tagemahale.springboot.model.User;
import com.tagemahale.springboot.payload.CartDetailDto;
import com.tagemahale.springboot.payload.CartDto;
import com.tagemahale.springboot.payload.CartHelp;
import com.tagemahale.springboot.payload.ProductDto;
import com.tagemahale.springboot.repository.CartDetailsRepo;
import com.tagemahale.springboot.repository.CartRepo;
import com.tagemahale.springboot.repository.ProductRepo;
import com.tagemahale.springboot.repository.UserRepository;
import com.tagemahale.springboot.service.CartService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

import javax.persistence.JoinColumn;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartDetailsRepo cartDetailsRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CartDto CreateCart(CartHelp cartHelp) {
        return null;
    }

    @Override
    public List<CartDto> getAllCarts() {
        List<Cart> carts = cartRepo.findAll();
        return carts.stream().map(cart -> {
            CartDto cartDto = modelMapper.map(cart, CartDto.class);
            List<CartDetailDto> cartDetailsDtos = cartDto.getCartDetalis().stream().map(cartDetailDto -> {
                ProductDto productDto = cartDetailDto.getProducts();
                productDto.setImg(null);
                cartDetailDto.setProducts(productDto);
                return cartDetailDto;
            }).collect(Collectors.toList());
            cartDto.setCartDetalis(cartDetailsDtos);
            return cartDto;
        }).collect(Collectors.toList());
    }

  @Override
public CartDto addProductToCart(CartHelp cartHelp) {
    int productId = cartHelp.getProductId();
    int quantity = cartHelp.getQuantity();
    String userEmail = cartHelp.getUserEmail();

    User user = this.userRepo.findByEmail(userEmail);
    Product product = this.productRepo.findById(productId).orElseThrow();

    Cart cart = user.getCart();
    if (cart == null) {
        cart = createNewCart(user, product, quantity);
    } else {
        updateExistingCart(cart, product, quantity);
    }

    Cart savedCart = this.cartRepo.save(cart);
    return convertToCartDto(savedCart);
}

private Cart createNewCart(User user, Product product, int quantity) {
    Cart cart = new Cart();
    cart.setUser(user);

    CartDetalis cartDetalis = createCartDetail(cart, product, quantity);
    List<CartDetalis> cartDetailsList = new ArrayList<>();
    cartDetailsList.add(cartDetalis);
    
    cart.setCartDetalis(cartDetailsList);
    cart.setTotalAmount(cartDetalis.getAmount());

    return cart;
}

private void updateExistingCart(Cart cart, Product product, int quantity) {
    List<CartDetalis> cartDetailsList = cart.getCartDetalis();
    AtomicReference<Integer> totalAmount = new AtomicReference<>(0);
    AtomicReference<Boolean> flag = new AtomicReference<>(false);

    cartDetailsList.stream().forEach(cartDetalis -> {
        if (cartDetalis.getProducts().getProductId() == product.getProductId()) {
            cartDetalis.setQuantity(quantity);
            cartDetalis.setAmount((int) (quantity * product.getSellePrice()));
            flag.set(true);
        }
        totalAmount.updateAndGet(v -> v + cartDetalis.getAmount());
    });

    if (!flag.get()) {
        CartDetalis newCartDetalis = createCartDetail(cart, product, quantity);
        cartDetailsList.add(newCartDetalis);
        totalAmount.updateAndGet(v -> v + newCartDetalis.getAmount());
    }

    cart.setTotalAmount(totalAmount.get());
}

private CartDetalis createCartDetail(Cart cart, Product product, int quantity) {
    CartDetalis cartDetalis = new CartDetalis();
    cartDetalis.setCart(cart);
    cartDetalis.setProducts(product);
    cartDetalis.setQuantity(quantity);
    cartDetalis.setAmount((int) (product.getSellePrice() * quantity));
    return cartDetalis;
}

private CartDto convertToCartDto(Cart cart) {
    CartDto cartDto = this.modelMapper.map(cart, CartDto.class);
    List<CartDetailDto> cartDetailDtoList = cartDto.getCartDetalis();

    cartDetailDtoList.forEach(cartDetailDto -> {
        ProductDto productDto = cartDetailDto.getProducts();
        productDto.setImg(productDto.getImg());
    });

    cartDto.setCartDetalis(cartDetailDtoList);
    return cartDto;
}

    @Override
    public CartDto GetCart(String userEmail) {
        User user = this.userRepo.findByEmail(userEmail);
        Cart byUser = this.cartRepo.findByUser(user);

        // img decompressBytes
        CartDto map = this.modelMapper.map(byUser, CartDto.class);
        List<CartDetailDto> cartDetalis1 = map.getCartDetalis();

        for (CartDetailDto i : cartDetalis1) {
            ProductDto p = i.getProducts();
            p.setImg( p.getImg());
        }
        map.setCartDetalis(cartDetalis1);
        return map;
    }

    @Override
    public void RemoveById(Integer ProductId, String userEmail) {
        User user = this.userRepo.findByEmail(userEmail);

        Product product = this.productRepo.findById(ProductId).orElseThrow();
        Cart cart = this.cartRepo.findByUser(user);

        CartDetalis byProductsAndCart = this.cartDetailsRepo.findByProductsAndCart(product, cart);
        int amount = byProductsAndCart.getAmount();
        cart.setTotalAmount(cart.getTotalAmount() - amount);
        this.cartRepo.save(cart);

        this.cartDetailsRepo.delete(byProductsAndCart);
        // this.cartRepo.delete(cart);

    }

    @Override
    public void RemoveByCart(String email) {
    
        User user = this.userRepo.findByEmail(email);
        Cart cart = this.cartRepo.findByUser(user);
      
        if (cart != null) {
            List<CartDetalis> cartDetailsList = cartDetailsRepo.findByCart(cart);
            cart.setTotalAmount(0);
            cartDetailsRepo.deleteAll(cartDetailsList);
            cartRepo.delete(cart);
        }
    
    }

    public Product changeImg(Product product) {

        product.setImg(product.getImg());

        System.out.println("hello");
        return product;
    }

    public int totalP(int t1, int total) {
        return total + t1;
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}

// @Override
// public List<CartDto> getAllCarts() {
// List<Cart> carts = cartRepo.findAll();

// // Filter carts to include only those with cart details (indicating a
// purchase)
// List<Cart> purchasedCarts = carts.stream()
// .filter(cart -> !cart.getCartDetalis().isEmpty())
// .collect(Collectors.toList());

// // Map filtered carts to CartDto
// return purchasedCarts.stream().map(cart -> {
// CartDto cartDto = modelMapper.map(cart, CartDto.class);

// // Map CartDetalis to CartDetailDto and set product images to null
// List<CartDetailDto> cartDetailsDtos =
// cart.getCartDetalis().stream().map(cartDetail -> {
// CartDetailDto cartDetailDto = modelMapper.map(cartDetail,
// CartDetailDto.class);
// ProductDto productDto = cartDetailDto.getProducts();
// if (productDto != null) {
// productDto.setImg(null); // Setting image to null
// cartDetailDto.setProducts(productDto);
// }
// return cartDetailDto;
// }).collect(Collectors.toList());

// cartDto.setCartDetalis(cartDetailsDtos);
// return cartDto;
// }).collect(Collectors.toList());
// }