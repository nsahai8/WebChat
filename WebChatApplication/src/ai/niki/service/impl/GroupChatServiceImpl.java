package ai.niki.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ai.niki.model.GroupChat;
import ai.niki.model.User;
import ai.niki.repositories.GroupChatRepository;
import ai.niki.service.GroupChatService;

@Service
public class GroupChatServiceImpl extends AbstractDataServiceImpl<GroupChat, ObjectId> implements GroupChatService {

	private GroupChatRepository groupChatRepository;

	@Autowired
	public GroupChatServiceImpl(GroupChatRepository repository) {
		super(repository);
		this.groupChatRepository = repository;
	}

	@Override
	public List<String> getAllGroups(String member) {
		List<GroupChat> allgroupChats = groupChatRepository.findAll();
		List<String> allGroupNames = new ArrayList<>();
		for (GroupChat groupChat : allgroupChats) {
			if (isUserMemberOfGroup(member, groupChat)) {
				allGroupNames.add(groupChat.getGroupName());
			}
		}
		return allGroupNames;
	}

	private boolean isUserMemberOfGroup(String member, GroupChat groupChat) {
		List<User> allUsers = groupChat.getGroupMembers();
		for (User user : allUsers) {
			if (user.getEmailId().equalsIgnoreCase(member)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public GroupChat getGroupByName(String groupName) {
		return groupChatRepository.findByGroupName(groupName);
	}

	@Override
	public void saveGroup(GroupChat groupChat) {
		groupChatRepository.save(groupChat);
	}

	@Override
	public void saveMessages(String message, String groupName, String sender) {
		GroupChat groupChat = groupChatRepository.findByGroupName(groupName);
		List<GroupChat.SenderMessage> messageSenderList = groupChat.getMessageUserList();
		if (messageSenderList == null) {
			messageSenderList = new ArrayList<>();
		}
		GroupChat.SenderMessage senderMessage = new GroupChat().new SenderMessage();
		senderMessage.setSender(sender);
		senderMessage.setMessage(message);
		senderMessage.setCreated(new Date());
		messageSenderList.add(senderMessage);
		groupChat.setMessageUserList(messageSenderList);
		groupChatRepository.save(groupChat);
	}

}
