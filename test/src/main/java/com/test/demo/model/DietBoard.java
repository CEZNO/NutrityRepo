package com.test.demo.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;

@Data
@Entity
public class DietBoard {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bnum;
	private String memo;
	private Date regdate;
	private Date updatedate;
	
	@ManyToOne
	@JoinColumn(name = "num")
	private Member member;
	
	
	@OneToOne
	@JoinColumn(name = "snum")
	private SuggestNutrient snum;
	
	
}
