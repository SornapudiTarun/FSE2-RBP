package com.techademy.authorization.util;

import com.techademy.authorization.dto.ValidTokenResponseDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private String secretkey = "${jwt.secret}";


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }
    public Boolean isTokenExpired(String token) {
        final Date expiration = extractExpiration(token);
        return expiration.before(new Date());
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);

    }
    public List<String> extractRole(String token){
        Claims claims = extractAllClaims(token);
        return (List<String>) claims.get("roles");
    }
    private Claims extractAllClaims(String token) {

        return Jwts.parser().setSigningKey(secretkey).parseClaimsJws(token).getBody();
    }
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails);
    }
    private String createToken(Map<String, Object> claims, UserDetails userDetails) {
        List<String> roles= userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        Map<String, Object> claimRoleDetails = new HashMap<>();
        claimRoleDetails.put("roles", roles);
        return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*10))
                .signWith(SignatureAlgorithm.HS256, secretkey).addClaims(claimRoleDetails).compact();
    }
    public ValidTokenResponseDTO validateToken(String token) {
        if(!isTokenExpired(token)) {
            try {
                Claims extractClaimsInfo = extractAllClaims(token);
                List<String> claimRoles = extractClaimsInfo.get("roles", List.class);
                String email = extractUsername(token);
                ValidTokenResponseDTO validTokenResponseDTO = getValidTokenResponseDTO(claimRoles, email, true, false);
                return validTokenResponseDTO;

            }catch(Exception tokenValidationException){
                System.out.println(tokenValidationException.getMessage());
            }
        }
        return getValidTokenResponseDTO(null, null,true , true);
    }
    private ValidTokenResponseDTO getValidTokenResponseDTO(List<String> claimRoles, String email, boolean b, boolean b1) {
        ValidTokenResponseDTO validTokenResponseDTO = new ValidTokenResponseDTO();
        validTokenResponseDTO.setIsTokenValid(true);
        validTokenResponseDTO.setRole(claimRoles);
        validTokenResponseDTO.setEmailId(email);
        validTokenResponseDTO.setIsExpired(false);
        return validTokenResponseDTO;
    }
}
