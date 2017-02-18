package ai.niki.initializer;

import javax.servlet.ServletContext;

import org.springframework.web.multipart.support.MultipartFilter;
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;


public class MessageSecurityWebApplicationInitializer
extends AbstractSecurityWebApplicationInitializer {
@Override
protected void beforeSpringSecurityFilterChain(ServletContext servletContext) {
        MultipartFilter multipartFilter = new MultipartFilter();
        multipartFilter.setMultipartResolverBeanName("filterMultipartResolver");
        
}
}
