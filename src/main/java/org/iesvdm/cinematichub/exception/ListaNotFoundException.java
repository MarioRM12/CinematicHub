package org.iesvdm.cinematichub.exception;

public class ListaNotFoundException extends RuntimeException{

    public ListaNotFoundException(Long id) {
        super("Not found Lista with id: " + id);
    }

}
