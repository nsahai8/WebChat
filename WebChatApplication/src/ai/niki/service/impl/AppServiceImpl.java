package ai.niki.service.impl;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

import ai.niki.model.User;
import ai.niki.repositories.UserRepository;
import ai.niki.service.AppService;

@Service
public class AppServiceImpl extends AbstractDataServiceImpl<User, ObjectId> implements AppService {

	
	private UserRepository userRepository;
	
	@Autowired
	public AppServiceImpl(UserRepository repository) {
		super(repository);
		this.userRepository = repository;

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

