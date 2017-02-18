package ai.niki.repository;

import org.springframework.stereotype.Repository;
import ai.niki.domain.User;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository("userRepository")

public interface UserRepository extends MongoRepository<User, ObjectId>  {

	User findByName(String name);
	User findByEmail(String email);
	List<User> findAll();
	
}
