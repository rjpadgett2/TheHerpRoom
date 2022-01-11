package api.herproom.api.controllers;

import api.herproom.api.Utility.Utility;
import api.herproom.api.exceptions.NotFoundException;
import api.herproom.api.models.User;
import api.herproom.api.payload.response.MessageResponse;
import api.herproom.api.repository.EmailRepository;
import api.herproom.api.repository.UserRepository;
import api.herproom.api.security.services.UserDetailsServiceImpl;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reset")
public class ForgotPasswordController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    PasswordEncoder encoder;

    // Process form submission from forgotPassword page
    @RequestMapping(value = "/forgot", method = RequestMethod.POST)
    public ResponseEntity<?> resetPassword(@RequestBody String userEmail, HttpServletRequest request) {

        // Lookup user in database by e-mail
        Optional<User> optional = userRepository.findByEmail("jordan.blakeleey@gmail.com");

        if (!optional.isPresent()) {
            ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("We did not find account with this email address"));
        } else {

            // Generate random 36-character string token for reset password
            User user = optional.get();
            user.setResetPasswordToken(UUID.randomUUID().toString());

            // Save token to database
            userRepository.save(user);

            String appUrl = request.getScheme() + "://" + request.getServerName();

            // Email message
            SimpleMailMessage passwordResetEmail = new SimpleMailMessage();
            passwordResetEmail.setFrom("support@demo.com");
            passwordResetEmail.setTo(user.getEmail());
            passwordResetEmail.setSubject("Password Reset Request");
            passwordResetEmail.setText("To reset your password, click the link below:\n" + appUrl
                    + "/reset?token=" + user.getResetPasswordToken());

            emailRepository.sendEmail(passwordResetEmail);


        }

        // Add success message to view
        return ResponseEntity.ok(new MessageResponse("successMessage, A password reset link has been sent to " + userEmail));

    }

    // Process reset password form
    @RequestMapping(value = "/reset", method = RequestMethod.POST)
    public ResponseEntity<?> setNewPassword(@RequestParam Map<String, String> requestParams, RedirectAttributes redir) {

        // Find the user associated with the reset token
        Optional<User> user = userRepository.findByResetPasswordToken(requestParams.get("token"));

        // This should always be non-null but we check just in case
        if (user.isPresent()) {

            User resetUser = user.get();

            // Set new password
            resetUser.setPassword(encoder.encode(requestParams.get("password")));

            // Set the reset token to null so it cannot be used again
            resetUser.setResetPasswordToken(null);

            // Save user
            userRepository.save(resetUser);

            // In order to set a model attribute on a redirect, we must use
            // RedirectAttributes
            redir.addFlashAttribute("successMessage", "You have successfully reset your password.  You may now login.");

            // Add success message to view
            return ResponseEntity.ok(new MessageResponse("successMessage, You have successfully reset your password.  You may now login."));

        } else {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Oops!  This is an invalid password reset link."));
        }
    }
}
