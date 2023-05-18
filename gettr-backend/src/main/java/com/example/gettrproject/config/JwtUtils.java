package com.example.gettrproject.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtils {

    private static final String SECRET_KEY = "753778214125442A472D4B6150645367566B59703373367638792F423F452848";

    /**
     * Method that gets username from jwtToken. Uses method reference which refers to Claims.getSubject()
     * and used on all claims instances to return the subject username.
     * @param jwtToken
     * @return
     */
    public String getUsername(String jwtToken) {
        return getClaim(jwtToken, Claims::getSubject);
    }

    /**
     * Function that extracts claims based on the function we pass through as a parameter,
     * in our case used when getting username via getSubject() or getting expiration using getExpiration()
     * from the jwt token.
     * @param jwtToken
     * @param claimsResolver
     * @param <T>
     * @return
     */
    public <T> T getClaim(String jwtToken, Function<Claims, T> claimsResolver){
        final Claims claims = getAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

    /**
     * function that parses the jwtToken and returns its claims
     * @param jwtToken
     * @return
     */
    private Claims getAllClaims(String jwtToken){
        /*
        * Parses the JWS token string and returns the resulting Claims JWS instance.
        * Need to setSigningKey with the secret key used in our signature algorithm to verify the digital signature.
        * key size: 256;
        * */
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    /**
     * function that generates a new token for the user
     * @param userDetails
     * @return
     */
    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        String subjectUsername = userDetails.getUsername();
        return generateToken(claims, subjectUsername);
    }

    /**
     * function that generates a jwt token based off username and claims.
     * <pre>
     *     {@code
     *
     * Example token: (1)xxxxx.(2)yyyyy.(3)zzzzz
     *
     *     1.Payload: Algorithm & token type
     *          {
     *              "alg": Encryption alg used
     *              "typ": ..
     *          }
     *     2.Payload: token
     *          {
     *              "sub": username,
     *              "iat": issued at,
     *              "exp": expired time
     *          }
     *     3.Signature
     *          {
     *              base64UrlEncode(header) + "." +
     *              base64UrlEncode(payload),
     *              SECRET_KEY
     *          }
     *     }
     * </pre>
     *
     *
     * @param claims
     * @param username
     * @return token
     */
    public String generateToken(Map<String, Object> claims, String username) {
        return Jwts
                .builder()
                //.setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 3600*1000)) //Setting expiration date
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * function that validates the jwt token by extracting username from token and
     * checking if it's the same username in userDetails
     *
     * @param jwtToken
     * @param userDetails
     * @return boolean
     */
    public boolean isValid(String jwtToken, UserDetails userDetails){
        final String username = getUsername(jwtToken);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(jwtToken);
    }

    /**
     * Getting jwt token expiration value and checking if it's after the current date/time
     * if it is then token is still eligible and returns false otherwise return true
     * re.
     * @param token
     * @return boolean
     */
    private boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

    /**
     * Function that gets expiration date of the jwt token.
     * @param token
     * @return Date
     */
    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    /**
     * function that decodes the current secret key
     * and returns a SecretKey object based on the HMAC-SHA algorithm
     * @return Key
     */
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
