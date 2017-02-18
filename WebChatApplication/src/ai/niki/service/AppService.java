package ai.niki.service;

import java.util.List;
import org.bson.types.ObjectId;

import ai.niki.model.User;


public interface AppService extends AbstractDataService<User, ObjectId>{
	 List<User> getAllUsers();
	 Boolean isValidUser(String emailId);
	 
}