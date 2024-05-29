package org.iesvdm.cinematichub.exception;

public class SerieNotFoundException extends RuntimeException{

    public SerieNotFoundException(Long id) {
        super("Not found Serie with id: " + id);
    }

}
