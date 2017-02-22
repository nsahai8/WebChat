package ai.niki.service;

import java.util.List;

import org.bson.types.ObjectId;

import ai.niki.model.GroupChat;

public interface GroupChatService extends AbstractDataService<GroupChat, ObjectId>{
	List<String> getAllGroups(String member);
	GroupChat getGroupByName(String groupName);
	void saveMessages(String message,String groupName,String sender);
	void saveGroup(GroupChat groupChat);

}
