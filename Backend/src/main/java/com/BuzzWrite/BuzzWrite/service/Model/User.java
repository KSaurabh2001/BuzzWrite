package com.BuzzWrite.BuzzWrite.service.Model;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "User")
public class User implements UserDetails{

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column
	private String fullName;
	
	@Column(unique = true)
	private String username;
	
	@Column
	private String email;
	
	@Column
	private String password;
	
	@Column
	private String occupation;
	
	@Column
	private String gender;
	
	@Column
	private String bio;
	
	@Column
	private String image;
	
	@Column
	private LocalDate DOB;
	
	@Column
	private String address;
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
	@JsonManagedReference
	List<Post> post;
	
	@ManyToMany
	@JoinTable(
	  name = "user_saved_posts",
	  joinColumns = @JoinColumn(name = "user_id"),
	  inverseJoinColumns = @JoinColumn(name = "post_id")
	)
	private List<Post> savedPost;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of();
	}
	}