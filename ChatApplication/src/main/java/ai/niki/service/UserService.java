package ai.niki.service;

import java.io.Serializable;
import java.util.List;

import org.bson.types.ObjectId;

import ai.niki.domain.User;

public interface UserService extends AbstractDataService<User, ObjectId>{
	 List<User> getAllUsers();
	 Boolean isValidUser(String emailId);
}
