package com.BuzzWrite.BuzzWrite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BuzzWrite.BuzzWrite.dto.JwtRequest;
import com.BuzzWrite.BuzzWrite.dto.JwtResponse;
import com.BuzzWrite.BuzzWrite.dto.Userdto;
import com.BuzzWrite.BuzzWrite.service.AuthService;



@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	AuthService authService;
	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest jwtRequest)
	{
		return new ResponseEntity<>(authService.login(jwtRequest),HttpStatus.OK);
	}
	@PostMapping("/signUp")
	public ResponseEntity<String> login(@RequestBody Userdto userdto)
	{
		return new ResponseEntity<>(authService.signUp(userdto),HttpStatus.OK);
	}
}
