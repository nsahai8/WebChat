package ai.niki.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//saves the user registered in  this application
@Document
public class User {
	@Id
	private ObjectId id;
	private String name;
	private String email;
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmailId() {
		return this.email;
	}
	
	public void setEmailId(String emailId) {
		this.email = emailId;
	}
}

