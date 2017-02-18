package ai.niki.service.impl;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ai.niki.model.ChatMessage;
import ai.niki.repositories.ChatMessageRepository;
import ai.niki.service.ChatMessageService;

@Service
public class ChatMessageServiceImpl extends AbstractDataServiceImpl<ChatMessage, ObjectId> implements ChatMessageService{

	private ChatMessageRepository chatMessageRepository;
	
	@Autowired
	public ChatMessageServiceImpl(ChatMessageRepository repository) {
		super(repository);
		this.chatMessageRepository = repository;
	}

	@Override
	public void saveMessages(String message, String sender, String receiver) {
		ChatMessage chatMessage = new ChatMessage();
		chatMessage.setSender(sender);
		chatMessage.setReceiver(receiver);
		chatMessage.setMessage(message);
		chatMessage.setCreated(new Date());
		chatMessageRepository.save(chatMessage);
	}

	@Override
	public List<ChatMessage> getMessagesByUser(String sender) {
		return chatMessageRepository.findBySender(sender);
	}

	@Override
	public List<ChatMessage> getMessagesForUser(String receiver) {
		return chatMessageRepository.findByReceiver(receiver);
	}

	@Override
	public List<ChatMessage> getMessagesBetweenSenderAndReceiver(String sender, String receiver) {
		return chatMessageRepository.findBySenderAndReceiver(sender, receiver);
	}

}
