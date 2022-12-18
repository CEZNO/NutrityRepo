package com.test.demo.model;

import javax.persistence.Embeddable;

import org.springframework.lang.Nullable;

import lombok.Getter;
import lombok.ToString;

@Getter
@Embeddable
@ToString
public class Address {
	 
	private String address1;
	@Nullable
	private String address2;
	private String zipcode;
	
	public Address() {
		
	}
	
	public Address(String address1, String address2, String zipcode) {
		this.address1 = address1;
		this.address2 = address2;
		this.zipcode = zipcode;
	}

}
