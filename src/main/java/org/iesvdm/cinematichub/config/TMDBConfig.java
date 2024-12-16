package org.iesvdm.cinematichub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TMDBConfig {

    @Value("${tmdb.api.url}")
    private String apiUrl;

    @Value("${tmdb.api.token}")
    private String apiToken;

    public String getApiUrl() {
        return apiUrl;
    }

    public String getApiToken() {
        return apiToken;
    }
}