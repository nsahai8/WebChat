package ai.niki.service.impl;

import java.io.Serializable;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ai.niki.domain.User;
import ai.niki.repository.UserRepository;
import ai.niki.service.UserService;

@Service
public class UserServiceImpl extends AbstractDataServiceImpl<User, ObjectId>implements UserService {

	private UserRepository userRepository;
	
	@Autowired
	public UserServiceImpl(UserRepository repository) {
		super(repository);
		this.userRepository = repository ;
	}
	
	public List<User> getAllUsers() {
		List<User> allUsers = userRepository.findAll();
		return allUsers;
	}

	public Boolean isValidUser(String emailId) {
		if(userRepository.findByEmail(emailId) != null){
			return true;
		}
		return false;
	}

}
