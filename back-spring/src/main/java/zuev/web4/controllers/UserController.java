package zuev.web4.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import zuev.web4.beans.UserBean;
import zuev.web4.services.UserServiceImpl;

import java.net.URI;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserServiceImpl userService;
    private final PasswordEncoder passwordEncoder;

    @CrossOrigin
    @PostMapping("/auth")
    private ResponseEntity<?> checkAuth(@RequestBody UserBean user) {
        log.info("user signIn " + user.getUsername());
        UserBean realUser = userService.getUser(user.getUsername());
        if (realUser == null) {
            log.info("No, such user");
            return ResponseEntity.badRequest().body("No such user");
        } else if (!passwordEncoder.matches(user.getPassword(), realUser.getPassword())) {
            log.info("Wrong password");
            return ResponseEntity.badRequest().body("Wrong password");
        } else {
            log.info("User " + user.getUsername() + " is authorized");
            return ResponseEntity.ok().body("Access provided");
        }
    }

    @CrossOrigin
    @PostMapping("/save")
    private ResponseEntity<?> saveUser(@RequestBody UserBean user) {
        log.info("user signUp " + user.getUsername());
        UserBean dbUser = userService.getUser(user.getUsername());
        if (dbUser == null) {
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toString());
            log.info("uri: " + uri);
            log.info("User " + user.getUsername() + " is saving");
            UserBean newUser = userService.saveUser(user);
            newUser.setPassword("");
            return ResponseEntity.created(uri).body(newUser);
        } else {
            log.info("User " + user.getUsername() + " already exists");
            return ResponseEntity.badRequest().body("User already exists");
        }
    }
}
