package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.exceptions.RecaptchaValidationException;
import com.kakuritsu.kaku_shops.request.GuestContactUsRequest;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.GoogleRecaptcha.GoogleRecaptchaService;
import com.kakuritsu.kaku_shops.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/contact-us")
public class ContactUsController {
    private final GoogleRecaptchaService recaptchaService;
    private final EmailService emailService;


    @PostMapping
    public ResponseEntity<ApiResponse> sendGuestMessageToEmail(@RequestBody GuestContactUsRequest request){
        try {
            recaptchaService.validateRecaptcha(request.getRecaptchaToken());
            emailService.sendGuestContactUsMessage(request);
            return ResponseEntity.ok().body(new ApiResponse("Message successfully send",null));
        } catch (RecaptchaValidationException e) {
            return ResponseEntity.badRequest().body(new ApiResponse("Invalid reCAPTCHA token",null));
        }
    }
}
