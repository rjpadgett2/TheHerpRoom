package api.herproom.api.repository;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository {
    public void sendEmail(SimpleMailMessage email);
}
