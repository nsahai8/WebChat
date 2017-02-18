package ai.niki.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ai.niki.domain.User;
import ai.niki.service.UserService;

@Controller("/start")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "/isValidUser", method = RequestMethod.GET)
    @ResponseBody
    public Integer isUserExisting(@RequestParam(value="email")String email){
		Boolean result = userService.isValidUser(email);
		return 0;
		
	}
	
	@RequestMapping(value = "/createUser", method = RequestMethod.GET)
    @ResponseBody
    public Boolean createUser(){
		User user = new User();
		user.setEmailId("abc@gmail.com");
		user.setName("abc");
		userService.save(user);
		return true;
		
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView helloWorld( ModelMap model ) {
	System.out.println("here");
	ModelAndView modelAndView = new ModelAndView("index");
	modelAndView.addObject("users", "hi" );
	return modelAndView;

	}

}
