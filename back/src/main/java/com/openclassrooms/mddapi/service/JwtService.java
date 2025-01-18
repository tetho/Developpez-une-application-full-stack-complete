package com.openclassrooms.mddapi.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class JwtService implements IJwtService {

    private JwtEncoder jwtEncoder;

    public JwtService(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    @Override
    public String generateToken(Authentication authentication) {
        if (authentication == null) {
            throw new RuntimeException("Authentication object is null. Cannot generate token.");
        }

        String username = authentication.getName();
        if (username == null || username.isEmpty()) {
            throw new RuntimeException("Authentication does not contain a valid username.");
        }

        try {
            Instant now = Instant.now();
            JwtClaimsSet claims = JwtClaimsSet.builder()
                    .issuer("self")
                    .issuedAt(now)
                    .expiresAt(now.plus(1, ChronoUnit.DAYS))
                    .subject(username)
                    .build();
            
            JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters
                    .from(JwsHeader.with(MacAlgorithm.HS256).build(), claims);
            return this.jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while generating the JWT token: " + e.getMessage(), e);
        }
    }
}
