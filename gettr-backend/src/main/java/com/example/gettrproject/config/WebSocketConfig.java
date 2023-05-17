package com.example.gettrproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Configuration
@EnableWebSocketMessageBroker
@CrossOrigin("http://localhost:3000")
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    /*The configureMessageBroker method configures the message broker used by the WebSocket server.
    It sets the application destination prefix to "/app", which means that messages sent to paths
    starting with this prefix will be routed to methods annotated with @MessageMapping in the
    controller classes. It also enables a simple message broker with two
    destinations: "/chatroom" and "/user". Messages sent to "/chatroom" will be broadcasted to
    all connected clients, while messages sent to "/user" will be sent only to the specified user.*/
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/chatroom","/user");
        registry.setUserDestinationPrefix("/user");
    }

    /*The registerStompEndpoints method registers a STOMP endpoint at the path "/ws".
    The setAllowedOriginPatterns("*") method call allows connections from any origin,
    and the withSockJS() method call enables fallback options for clients that do not
    support WebSocket natively.*/
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event) {
        //LOGGER.debug("Client with username {} disconnected", event.getUser());
        // handle user disconnecting here:
        System.out.println(event.getUser().getName()); // test
    }

}