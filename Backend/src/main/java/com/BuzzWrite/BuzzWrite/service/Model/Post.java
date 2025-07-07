package com.BuzzWrite.BuzzWrite.service.Model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "Post")
public class Post {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	Long id;
	
	@Column
	String title;
	@Column
	String author;
	@Column
	String category;
	@Column
	String excerpt;
	@Column
	String content;
	
	@Column
	String tags;
	
	@Column
	String imageUrl;
	@Column
	Boolean isFeatured;
	@Column
	String username;
	@Column
	private LocalDateTime createdAt;
    @Column
	private LocalDateTime updatedAt;
	
	
	@ManyToOne
	@JoinColumn(name = "user_id",nullable = false)
	@JsonBackReference
	User user;

}
