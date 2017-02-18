package ai.niki.config;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoTypeMapper;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ServerAddress;

@EnableMongoRepositories(basePackages = "ai.niki.repository")
@EnableWebMvc
@ComponentScan
@Configuration
@PropertySource(value = { "classpath:nosql.properties" })
@ImportResource({ "classpath:mongo-config.xml" })
public class MongoConfig {
	static{
		System.out.println("MongoConfig");
	}
	@Value("#{environment['mongo_host']}")
	private String hosts;

	@Value("#{environment['mongo_port']}")
	private Integer port;

	@Value("#{environment['mongo_database']}")
	private String database;

	@Bean
	public MongoClient mongoClient() throws UnknownHostException {
		List<String> hostList = Arrays.asList(hosts.split(","));
		List<ServerAddress> serverAddressList = new ArrayList<ServerAddress>();
		for (String host : hostList) {
			serverAddressList.add(new ServerAddress(host, port));
		}
		MongoClientOptions mongoClientOptions = MongoClientOptions.builder().build();
		return new MongoClient(serverAddressList, mongoClientOptions);
	}

	@Bean
	public MongoDbFactory mongoDbFactory() throws IOException {
		return new SimpleMongoDbFactory(mongoClient(), database);
	}

	@Bean
	public MongoTemplate mongoTemplate() throws IOException {
		MongoTypeMapper mongoTypeMapper = new DefaultMongoTypeMapper(null);
		MongoDbFactory mongoDbFactory = mongoDbFactory();
		DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDbFactory);
		MappingMongoConverter mappingMongoConverter = new MappingMongoConverter(dbRefResolver,
				new MongoMappingContext());
		mappingMongoConverter.setTypeMapper(mongoTypeMapper);
		MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory, mappingMongoConverter);
		return mongoTemplate;
	}

}
