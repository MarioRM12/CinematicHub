package org.iesvdm.cinematichub.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PeliculaNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handlePeliculaNotFoundException(PeliculaNotFoundException ex) {
        return ex.getMessage();
    }
}