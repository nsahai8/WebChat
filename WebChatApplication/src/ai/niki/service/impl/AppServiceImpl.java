package ai.niki.service.impl;

import java.util.Arrays;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pubnub.api.PNConfiguration;
import com.pubnub.api.PubNub;
import com.pubnub.api.callbacks.PNCallback;
import com.pubnub.api.callbacks.SubscribeCallback;
import com.pubnub.api.enums.PNStatusCategory;
import com.pubnub.api.models.consumer.PNPublishResult;
import com.pubnub.api.models.consumer.PNStatus;
import com.pubnub.api.models.consumer.pubsub.PNMessageResult;
import com.pubnub.api.models.consumer.pubsub.PNPresenceEventResult;

import ai.niki.config.Constants;
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

	//get all users in his contacts
	public List<User> getAllUsers() {
		List<User> allUsers = userRepository.findAll();
		return allUsers;
	}

	//validate the user is subscribed
	public Boolean isValidUser(String emailId) {
		if (userRepository.findByEmail(emailId) != null) {
			return true;
		}
		return false;
	}

	//get User object by Email of user
	public User getUserByEmailId(String email) {
		return userRepository.findByEmail(email);
	}

	

}
