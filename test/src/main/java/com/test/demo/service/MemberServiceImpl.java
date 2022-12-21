package com.test.demo.service;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.test.demo.model.Job;
import com.test.demo.model.Member;
import com.test.demo.model.PayInfo;
import com.test.demo.model.Product;
import com.test.demo.repository.MemberRepository;
import com.test.demo.repository.PayRepository;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{
	
	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private PayRepository payRepository;
		
	@Transactional
	public void join(Member member) {
								
		String rawPwd = member.getPassword();
		String encPwd = encoder.encode(rawPwd);
		member.setPassword(encPwd);
		memberRepository.save(member);
	}
	
	public void modify(Member member) {
		Member m = memberRepository.findById(member.getNum()).get();
		String rawPwd = member.getPassword();
		String encPwd = encoder.encode(rawPwd);
		m.setPassword(encPwd);
		m.setUseremail(member.getUseremail());
		m.setAddress(member.getAddress());
		m.setPhone(member.getPhone());
		
	}
	
	public Member detailMember(Long num) {
		return memberRepository.findById(num).get();
	}
	
	
	public void subscribe(Member member) {
		Member subscribe = memberRepository.findById(member.getNum()).get();
		subscribe.setSubscribe(1);
	}
	
	public void userDelete(Long num) {
		memberRepository.deleteById(num);
	}

	@Override
	public void unsubscribe(Member member) {
		Member subscribe = memberRepository.findById(member.getNum()).get();
		subscribe.setSubscribe(0);
	}

	@Override
	public Member findByUsername(String username) {
		
		return memberRepository.findByUsername(username);
	}

	@Override
	public List<Member> findAll() {
		return memberRepository.findAll();
	}

	@Override
	@Transactional
	public void fileInsert(Job job, Member principal) {
		UUID uuid = UUID.randomUUID();
		MultipartFile qual = job.getUpload();
		String uploadFileName="";
		Member member = memberRepository.findByUsername(principal.getUsername());
		if(!qual.isEmpty()) {//파일이 선택됨
			uploadFileName=uuid.toString()+"_"+qual.getOriginalFilename();
			File saveFile =new File(uploadFileName);
			try {
				qual.transferTo(saveFile);
				job.setQualName(uploadFileName);
				job.setRole(member.getJob().getRole());
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}//파일 업로드 됨
		}
		member.setJob(job);
	}

	@Override
	@Transactional
	public void savePayInfo(PayInfo payInfo) {
		Calendar time = Calendar.getInstance();
		time.setTime(new Date());
		if(payInfo.getProduct().getName().contains("week")) {
			time.add(Calendar.DATE, 7);
		} else if(payInfo.getProduct().getName().contains("month")) {
			time.add(Calendar.MONTH, 1);
		} else {
			time.add(Calendar.YEAR, 1);
		}       
        Date expiredTime = new Date(time.getTimeInMillis());
        payInfo.setExpiredDate(expiredTime);
		payInfo.getMember().getJob().setRole("ROLE_SUBCRIBE");
		payRepository.save(payInfo);		
	}

	@Override
	public List<Member> qualList() {
		return memberRepository.findRequest();
	}

	@Override
	public void subscribeCheck(Member member) {
		Date date = member.getPayInfo();
		
		
	}


}

