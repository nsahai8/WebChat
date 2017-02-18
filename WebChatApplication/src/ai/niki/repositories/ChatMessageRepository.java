package ai.niki.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ai.niki.model.ChatMessage;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, ObjectId> {
	List<ChatMessage> findBySender(String sender);
	List<ChatMessage> findByReceiver(String receiver);
	List<ChatMessage> findBySenderAndReceiver(String sender,String receiver);
}
