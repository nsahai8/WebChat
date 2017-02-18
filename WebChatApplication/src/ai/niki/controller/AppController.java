package ai.niki.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ai.niki.model.ChatMessage;
import ai.niki.model.User;
import ai.niki.service.AppService;
import ai.niki.service.ChatMessageService;

@Controller
public class AppController {
	
	@Autowired
	private AppService appService;
	
	@Autowired
	private ChatMessageService chatMessageService;
	
	@RequestMapping("/")
	public void welcomePage() {
		System.out.println("project started");
	}
	
	@RequestMapping(value="/createUser",method=RequestMethod.GET)
	public ModelAndView createUser(@RequestParam(value="email")String email,@RequestParam(value="name")String name) {
		User user = new User();
		user.setEmailId(email);
		user.setName(name);
		appService.save(user);
		System.out.println("done");
		return new ModelAndView("created", "message","hi");
	}
	
	@ResponseBody
	@RequestMapping(value="/getAllContacts",method=RequestMethod.POST)
	public List<User> getAllContacts() {
		List<User> allUsers = appService.getAllUsers();
//		for(User user :allUsers){
//			System.out.println(user.getEmailId());
//		}
		return allUsers;
	}
	
	@ResponseBody
	@RequestMapping(value="/login",method=RequestMethod.GET)
	public boolean isValidUser(@RequestParam(value="email") String email) {
		boolean isValid = appService.isValidUser(email);
		return isValid;
	}
	
	@ResponseBody
	@RequestMapping(value="/saveMessage",method=RequestMethod.GET)
	public void sendMessege(@RequestParam(value="message") String message,@RequestParam(value="sender") String sender,
			@RequestParam(value="receiver")String receiver) {
		chatMessageService.saveMessages(message, sender, receiver);
//		System.out.println("message save in db");
		
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
	
	
}
