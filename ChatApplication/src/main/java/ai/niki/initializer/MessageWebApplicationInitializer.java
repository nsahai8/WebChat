package ai.niki.initializer;

import javax.servlet.ServletContext;

import org.springframework.context.annotation.EnableSpringConfigured;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import ai.niki.config.HibernateConfiguration;
import ai.niki.config.WebMvcConfig;
@EnableSpringDataWebSupport
@EnableSpringConfigured
public class MessageWebApplicationInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] { HibernateConfiguration.class };
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] { WebMvcConfig.class };
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}

	@Override
	protected void registerDispatcherServlet(ServletContext servletContext) {
		super.registerDispatcherServlet(servletContext);

		servletContext.addListener(new HttpSessionEventPublisher());

	}
}
