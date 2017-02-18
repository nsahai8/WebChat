package ai.niki.service;

import java.util.List;

import org.bson.types.ObjectId;

import ai.niki.model.ChatMessage;

public interface ChatMessageService extends AbstractDataService<ChatMessage, ObjectId> {
	void saveMessages(String message,String sender,String receiver);
	List<ChatMessage> getMessagesByUser(String sender);
	List<ChatMessage> getMessagesForUser(String receiver);
	List<ChatMessage> getMessagesBetweenSenderAndReceiver(String sender,String receiver);
}
