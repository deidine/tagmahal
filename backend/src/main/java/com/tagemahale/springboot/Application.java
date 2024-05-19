package com.tagemahale.springboot;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.tagemahale.springboot.config.AppProperties;
 
@SpringBootApplication
// @ComponentScan(basePackages = "com.formbuilder.springboot")
@EnableConfigurationProperties(AppProperties.class)
public class Application {
  
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	} 
	
	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	@Bean  
	public WebMvcConfigurer customConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
				configurer.defaultContentType(MediaType.APPLICATION_JSON);
			}
		};
	}
} 
 