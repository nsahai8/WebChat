package ai.niki.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ai.niki.model.GroupChat;

@Repository(value="groupChatRepository")
public interface GroupChatRepository extends MongoRepository<GroupChat, ObjectId> {
	GroupChat findByGroupName(String groupName);
}
