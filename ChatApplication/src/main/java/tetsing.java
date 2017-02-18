import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import ai.niki.domain.User;
import ai.niki.repository.UserRepository;

public class tetsing {
	public static void main(String[] args) {
		ConfigurableApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath:]classes/application-context.xml");
		
		UserRepository repository = context.getBean(UserRepository.class);

		// cleanup collection before insertion
//		repository.dropCollection();

		// create collection
//		repository.createCollection();

		User user1 = new User();
		user1.setEmailId("newUser@gmail.com");
		user1.setName("NewUser");
		repository.save(user1);

		System.out.println("1. " + repository.findAll());

	}
}
