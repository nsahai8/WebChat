package ai.niki.model;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class GroupChat {
	public enum MessageStatus {
		SeenByAll, NotSeenByAll
	}

	public class SenderMessage {
		private String sender;
		private String message;
		private Date created;

		public String getSender() {
			return this.sender;
		}

		public void setSender(String sender) {
			this.sender = sender;
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

	@Id
	private ObjectId id;
	private String groupName;
	private List<User> groupMembers;
	private List<SenderMessage> messageUserList;
	// to sort groups later on basis of date used
	private Date groupCreated;
	private MessageStatus status;

	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupNames) {
		this.groupName = groupNames;
	}

	public List<User> getGroupMembers() {
		return this.groupMembers;
	}

	public void setGroupMembers(List<User> groupMembers) {
		this.groupMembers = groupMembers;
	}

	public List<SenderMessage> getMessageUserList() {
		return this.messageUserList;
	}

	public void setMessageUserList(List<SenderMessage> messageUserList) {
		this.messageUserList = messageUserList;
	}

	public Date getGroupCreated() {
		return this.groupCreated;
	}

	public void setGroupCreated(Date groupCreated) {
		this.groupCreated = groupCreated;
	}

	public MessageStatus getStatus() {
		return this.status;
	}

	public void setStatus(MessageStatus status) {
		this.status = status;
	}

}
