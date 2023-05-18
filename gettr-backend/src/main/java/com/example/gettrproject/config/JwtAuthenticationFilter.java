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

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService; //interface available in spring framework

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
        username = jwtUtils.getUsername(jwtToken);             // Get username from token
        /*
        * Here we check if username is null or if the securityContextHolder has already authenticated the user
        * If not create a userDetails object that's fetches user information from database.
        * */
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            /*
            * Calls isValid from jwtUtils class to check if user fetched from database matches user who holds the token
            * */
            if(jwtUtils.isValid(jwtToken, userDetails)){
                /*
                * If valid Create username password authentication token used by spring and security context holder to update security context.
                * Security context holder is where spring boot stores credentials of users who are validated
                * */
                UsernamePasswordAuthenticationToken authorizationToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
                /*
                * Builds a details object based on the httpServletRequest object
                * */
                authorizationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                /*
                * Updating the security context holder to the authentication token for the current user
                * */
                SecurityContextHolder.getContext().setAuthentication(authorizationToken);
            }
        }
        /*
        * Call next filter
        * */
        filterChain.doFilter(request, response);
    }

}
