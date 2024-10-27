package com.openclassrooms.mddapi.utils;

import java.util.Date;

import com.openclassrooms.mddapi.service.IJwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtGenerator {

	private static final String SECRET_KEY = "aaSwDbRdKcpElZwUk36tYpaNvEkKw0PxUYx1062p7X4=";

    IJwtService jwtService;
    
    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiration
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                .compact();
    }

    public static void main(String[] args) {
        String token = generateToken("test@test.com");
        System.out.println("Generated Token: " + token);
    }
}
