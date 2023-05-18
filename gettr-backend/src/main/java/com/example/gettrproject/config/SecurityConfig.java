package com.example.gettrproject.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    /**
     * Defining a bean of type security filter chain that gets invoked depending on the URL.
     * Incoming requests with matching URLs found within .requestMatchers() are whitelisted
     * in particular the endpoints found in AuthController that authenticate/register users within our
     * system need to be allowed for users to register and authenticate in the frontend.
     * @param http
     * @return
     * @throws Exception
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        /*
        * authorizeHttpRequest:
        * Authorizing http requests on paths listed in requestMatchers() exposing/permitting access to any
        * of endpoints listed to httpRequest.
        *
        * RequestMatchers():
        * We require authentication on any request not listed in requestMatchers().
        *
        * sessionCreationPolicy():
        * Configuring sesssionManagement by setting the policy to STATELESS which tells spring boot to disable http sessions
        * and to never return/obtain the securityContext through http sessions. We disable this because we use jwt token for authentication
        *
        * authenticationProvider():
        * Passes our dao authentication provider
        *
        * addFilterBefore():
        * Create jwt filter and add it before usernamePasswordAuthenticationFilter
        * */
        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**", "/user/**","/ws","/ws/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
                /*Configuring */
        http.cors();
        return http.build();
    }
    //"/api/auth/authenticate", "/public", "/index.html"


}
