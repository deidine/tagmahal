// package com.tagemahale.springboot.config;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.io.Decoders;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Service;

// import java.security.Key;
// import java.time.LocalDateTime;
// import java.time.ZoneId;
// import java.util.Date;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.function.Function;

// @Service
// public class JwtService {

//     private static final String SECRET_KEY = "822c4707919bf892c76ad2769465cb794993931a98ec939e6e492c5317fb95e7";

//     // Calculate expiration date
//     private Date calculateExpirationDate() {
//         LocalDateTime now = LocalDateTime.now();
//         LocalDateTime expirationDateTime = now.plusMonths(1);
//         return Date.from(expirationDateTime.atZone(ZoneId.systemDefault()).toInstant());
//     }

//     public String extractUsername(String token) {
//         return extractClaim(token, Claims::getSubject);
//     } 

//     public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
//         final Claims claims = extractAllClaims(token);
//         return claimResolver.apply(claims);
//     }

//     public String generateToken(UserDetails userDetails) {
//         return generateToken(new HashMap<>(), userDetails);
//     }

//     public boolean isTokenValid(String token, UserDetails userDetails) {
//         final String username = extractUsername(token);
//         return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
//     }

//     private boolean isTokenExpired(String token) {
//         return extractExpiration(token).before(new Date());
//     }

//     private Date extractExpiration(String token) {
//         return extractClaim(token, Claims::getExpiration);
//     }

//     public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
//         return Jwts.builder()
//                 .setClaims(extraClaims)
//                 .setSubject(userDetails.getUsername())
//                 .setIssuedAt(new Date(System.currentTimeMillis()))
//                 .setExpiration(calculateExpirationDate()) // Use calculated expiration date
//                 .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     private Claims extractAllClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }

//     private Key getSigningKey() {
//         byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
//         return Keys.hmacShaKeyFor(keyBytes);
//     }
// }
