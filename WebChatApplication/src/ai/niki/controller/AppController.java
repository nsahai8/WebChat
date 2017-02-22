package ai.niki.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ai.niki.model.ChatMessage;
import ai.niki.model.GroupChat;
import ai.niki.model.User;
import ai.niki.service.AppService;
import ai.niki.service.ChatMessageService;
import ai.niki.service.GroupChatService;

@Controller
public class AppController {
	
	@Autowired
	private AppService appService;
	
	@Autowired
	private ChatMessageService chatMessageService;
	
	@Autowired
	private GroupChatService groupChatService;
	
	@RequestMapping("/")
	public void welcomePage() {
		System.out.println("project started");
	}
	
	//to create new users
	@RequestMapping(value="/createUser",method=RequestMethod.GET)
	public ModelAndView createUser(@RequestParam(value="email")String email,@RequestParam(value="name")String name) {
		User user = new User();
		user.setEmailId(email);
		user.setName(name);
		appService.save(user);
		System.out.println("done");
		return new ModelAndView("created", "message","hi");
	}
	
	//to get All contacts
	@ResponseBody
	@RequestMapping(value="/getAllContacts",method=RequestMethod.POST)
	public List<User> getAllContacts(@RequestParam(value="sender")String sender) {
		List<User> allUsers = appService.getAllUsers();
		User curUser = null;
		for(User user :allUsers){
			if(user.getEmailId().equalsIgnoreCase(sender)){
				curUser = user;
			}
		}
		allUsers.remove(curUser);
		return allUsers;
	}
	
	//validate the user
	@ResponseBody
	@RequestMapping(value="/login",method=RequestMethod.GET)
	public boolean isValidUser(@RequestParam(value="email") String email) {
		boolean isValid = appService.isValidUser(email);
		return isValid;
	}
	
	//save conversation
	@ResponseBody
	@RequestMapping(value="/saveMessage",method=RequestMethod.GET)
	public void sendMessege(@RequestParam(value="message") String message,@RequestParam(value="sender") String sender,
			@RequestParam(value="receiver")String receiver) {
		chatMessageService.saveMessages(message, sender, receiver);
		
	}
    	
	@ResponseBody
	@RequestMapping(value="/getAllMessageforUser",method=RequestMethod.POST)
	public List<ChatMessage> getAllMessageforUser(@RequestParam(value="receiver") String receiver) {
		List<ChatMessage> messages = chatMessageService.getMessagesForUser(receiver);
		return messages;
	}
	
	
	@RequestMapping(value="/getAllMessageBetweenUsers",method=RequestMethod.POST)
	@ResponseBody
	public List<ChatMessage> getAllMessageBetweenUsers(@RequestParam(value="sender") String sender,
			@RequestParam(value="receiver") String receiver) {
		List<ChatMessage> messages = chatMessageService.getMessagesBetweenSenderAndReceiver(sender, receiver);
		return messages;
	}
	
	@RequestMapping(value="/getAllMessageByUser",method=RequestMethod.POST)
	@ResponseBody
	public List<ChatMessage> getAllMessageByUser(@RequestParam(value="sender") String sender) {
		List<ChatMessage> messages = chatMessageService.getMessagesByUser(sender);
		return messages;
	}
	
	@RequestMapping(value="/startGroupChat",method=RequestMethod.GET)
	public String startGroupChat() {
		GroupChat groupChat = new GroupChat();
		groupChat.setGroupCreated(new Date());
		groupChat.setGroupName("Group1");
		List<User> groupMembers = appService.getAllUsers();
		groupChat.setGroupMembers(groupMembers);
		groupChat.setStatus(ai.niki.model.GroupChat.MessageStatus.NotSeenByAll);
		groupChatService.save(groupChat);
		return "saved";
	}
	
	@RequestMapping(value="/getAllGroupNames",method=RequestMethod.GET)
	@ResponseBody
	public List<String> getAllGroupNames(@RequestParam(value="member")String member) {
		return groupChatService.getAllGroups(member);
	}
	
	@RequestMapping(value="/getAllGroupByName",method=RequestMethod.POST)
	@ResponseBody
	public GroupChat getAllGroupByName(@RequestParam(value="name") String groupName) {
		
		return groupChatService.getGroupByName(groupName);
	}
	
	@RequestMapping(value="/saveGroupMessage",method=RequestMethod.GET)
	@ResponseBody
	public void saveGroupMessage(@RequestParam(value="groupName") String groupName,
			@RequestParam(value="message")String message,@RequestParam(value="sender")String sender) {
		
		groupChatService.saveMessages(message, groupName, sender);
	}
	
	
}
