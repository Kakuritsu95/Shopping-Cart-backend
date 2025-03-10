package com.kakuritsu.kaku_shops.service.email;

import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.GuestContactUsRequest;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    @Value("${spring.mail.username}")
    private String applicationEmailAddress;


    @Override
    @Async
    public void sendOrderConfirmationEmail(Order order, String serverDomain) {
        try {
            ClassPathResource logoImagePath = new ClassPathResource("static/logo.png");
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true, "UTF-8");
            helper.setFrom(applicationEmailAddress);
            helper.setTo(order.getEmail());
            helper.setSubject("Order confirmation - Kakushops.com");
            Context context = new Context();
            context.setVariable("serverDomain",serverDomain);
            context.setVariable("order", order);
            String process = templateEngine.process("order-confirmation.html",context);
            helper.setText(process,true);
            helper.addInline("logoImage",logoImagePath);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    @Async
    public void sendAccountVerificationEmail(User user, String serverDomain, String verificationToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setFrom(applicationEmailAddress);
            helper.setTo(user.getEmail());
            helper.setSubject("Account verification - Kakushops.com");
            Context context = new Context();
            context.setVariable("user", user);
            context.setVariable("serverDomain",serverDomain);
            context.setVariable("verificationToken", verificationToken);
            String process = templateEngine.process("account-verification.html",context);
            helper.setText(process,true);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public void sendGuestContactUsMessage(GuestContactUsRequest request) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);
            helper.setTo(applicationEmailAddress);
            helper.setSubject(request.getEmail() + " " + request.getSubject());
            Context context = new Context();
            context.setVariable("contactRequest", request);
            String process = templateEngine.process("guest-contact-message.html",context);
            helper.setText(process,true);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

}
