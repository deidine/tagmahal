package com.tagemahale.springboot.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(AppProperties.class)
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private final Auth auth = new Auth();
 
    public static class Auth {
        private String tokenSecret;
        private String ipAdress;
        private long tokenExpirationMsec;

        public String getTokenSecret() {
            return tokenSecret;
        }
        public String getIp(){
            return this.ipAdress;
        }
        public void setId(String ip){
            ip=this.ipAdress;
        }
        public void setTokenSecret(String tokenSecret) {
            this.tokenSecret = tokenSecret;
        }

        public long getTokenExpirationMsec() {
            return tokenExpirationMsec;
        }

        public void setTokenExpirationMsec(long tokenExpirationMsec) {
            this.tokenExpirationMsec = tokenExpirationMsec;
        }
    }
    public Auth getAuth() {
        return auth;
    }
 
}
 