package org.iesvdm.cinematichub.controller;

import org.iesvdm.cinematichub.service.TMDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tmdb")
public class TMDBController {

    private final TMDBService tmdbService;

    @Autowired
    public TMDBController(TMDBService TMDBService) {
        this.tmdbService = TMDBService;
    }

    @GetMapping("/popular-movies")
    public String getPopularMovies() {
        return tmdbService.getPopularMovies();
    }

    @GetMapping("/upcoming-movies")
    public String getUpcomingMovies() {
        return tmdbService.getUcomingMovies();
    }

    @GetMapping("/Today-TVSeries")
    public String get() {
        return tmdbService.getTodayTVSeries();
    }

    @GetMapping("/movie/{id}")
    public String getMovieDetails(@PathVariable String id) {
        return tmdbService.getMovieDetails(id);
    }

    @GetMapping("/tv/{id}")
    public String getTVDetails(@PathVariable String id) {
        return tmdbService.getTVDetails(id);
    }



}