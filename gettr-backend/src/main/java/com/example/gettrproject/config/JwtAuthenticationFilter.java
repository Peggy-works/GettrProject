package com.example.gettrproject.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

/**
 * Our authentication filter that extends OncePerRequestFilter. Spring boot uses servlet architecture which essentially intercepts http request,
 * this class specifically gets invoked once per request and handles authentication of users.
 */
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    /**
     * Once per request filter that intercepts http request, checks if authorization header has token
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        /*
        * Retrieving the value of authorization from header
        * Ex.
        * headers: {
        *   Authorization: Bearer <Token>
        * }
        * */
        final String authenticationHeader = request.getHeader("Authorization");
        final String jwtToken;
        final String username;
        /*
        * If header is null or doesn't contain the bearer token
        * then call filter chain to call/invoke the next filter
        * */
        if(authenticationHeader == null || !authenticationHeader.startsWith("Bearer")){
            filterChain.doFilter(request, response);
            return;
        }
        jwtToken = authenticationHeader.substring(7); // Get the token from header
        username = jwtService.getUsername(jwtToken);             // Get username from token
        /*
        * Here we check if username is null or if the securityContextHolder has already authenticated the user
        * If not create a userDetails object which is already implemented in our user entity class
        *
        *
        * Check if securityContextHolder has user credentials saved
        * If current user credentials have not been saved into our securityContextHolder
        * authenticate user and token while
        * */
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if(jwtService.isValid(jwtToken, userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }

}
