package ai.niki.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import ai.niki.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId>  {

	User findByName(String name);
	User findByEmail(String email);
	List<User> findAll();
	
}