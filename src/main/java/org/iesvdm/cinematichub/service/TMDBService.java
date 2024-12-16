package org.iesvdm.cinematichub.service;

import org.iesvdm.cinematichub.config.TMDBConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@Service
public class TMDBService {

    private final TMDBConfig tmdbConfig;
    private final RestTemplate restTemplate;

    @Autowired
    public TMDBService(TMDBConfig TMDBConfig) {
        this.tmdbConfig = TMDBConfig;
        this.restTemplate = new RestTemplate();
    }

    // Método para obtener películas populares usando la API de TMDB
    public String getPopularMovies() {
        String url = tmdbConfig.getApiUrl() + "/movie/popular?language=es-ES&page=1\")";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tmdbConfig.getApiToken());
        headers.set("Accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }

    // Método para obtener películas que  usando la API de TMDB
    public String getUcomingMovies() {
        String url = tmdbConfig.getApiUrl() + "/movie/upcoming?language=es-ES&page=1&region=es";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tmdbConfig.getApiToken());
        headers.set("Accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }

    public String getTodayTVSeries() {
        String url = tmdbConfig.getApiUrl() + "/tv/airing_today?language=es-ES&page=1&timezone=GMT%20%2B1";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tmdbConfig.getApiToken());
        headers.set("Accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }

    public String getMovieDetails(String id) {
        String url = tmdbConfig.getApiUrl() + "/movie/" + id + "?language=es-ES";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tmdbConfig.getApiToken());
        headers.set("Accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }

    public String getTVDetails(String id) {
        String url = tmdbConfig.getApiUrl() + "/tv/" + id + "?language=es-ES";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tmdbConfig.getApiToken());
        headers.set("Accept", "application/json");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }
}