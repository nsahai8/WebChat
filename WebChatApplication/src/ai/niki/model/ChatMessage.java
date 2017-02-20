package ai.niki.model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//save communication
@Document
public class ChatMessage {

	@Id
	private ObjectId id;
	private String sender;
	private String receiver;
	private messageStatus status;
	private String message;
	private Date created;

	public String getSender() {
		return this.sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getReceiver() {
		return this.receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public messageStatus getStatus() {
		return this.status;
	}
	public void setStatus(messageStatus status) {
		this.status = status;
	}
	public String getMessage() {
		return this.message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Date getCreated() {
		return this.created;
	}
	public void setCreated(Date created) {
		this.created = created;
	}
}
enum messageStatus{
	READ,
	UNREAD
}
