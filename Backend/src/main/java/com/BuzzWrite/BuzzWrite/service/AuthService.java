package com.BuzzWrite.BuzzWrite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.BuzzWrite.BuzzWrite.Repository.UserRepository;
import com.BuzzWrite.BuzzWrite.dto.JwtRequest;
import com.BuzzWrite.BuzzWrite.dto.JwtResponse;
import com.BuzzWrite.BuzzWrite.dto.Userdto;
import com.BuzzWrite.BuzzWrite.jwt.JwtAuthenticationHelper;
import com.BuzzWrite.BuzzWrite.service.Model.User;

@Service
public class AuthService {

	@Autowired
	AuthenticationManager manager;
	
	@Autowired
	JwtAuthenticationHelper jwtHelper;
	
	@Autowired 
	UserDetailsService userDetailsService;
	
	@Autowired 
	UserRepository userRepository;
	
	public JwtResponse login(JwtRequest jwtRequest) {
		
		//authenticate with Authentication manager
		this.doAuthenticate(jwtRequest.getUsername(),jwtRequest.getPassword());
		
		UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		String token = jwtHelper.generateToken(userDetails);
		
		JwtResponse response = JwtResponse.builder().jwtToken(token).build();
		return response;
	}

	private void doAuthenticate(String username, String password) {
		
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
		try {
			manager.authenticate(authenticationToken);

		}catch (BadCredentialsException e) {
			throw new BadCredentialsException("Invalid Username or Password");
		}
	}

	public String signUp(Userdto userdto) {

		 if (userRepository.findByUsername(userdto.getUsername()).isPresent()) {
		        return "Username already taken.";
		    }

		 BCryptPasswordEncoder bCryptPasswordEncoder= new BCryptPasswordEncoder();
			String encodedPassword = bCryptPasswordEncoder.encode(userdto.getPassword());
			
		    User user = User.builder()
		            .username(userdto.getUsername())
		            .email(userdto.getEmail())
		            .fullName(userdto.getFullName())
		            .password(encodedPassword)
		            .build();

		    userRepository.save(user);

		    
		
		return "Account Created for: " + userdto.getUsername();
	}

}
