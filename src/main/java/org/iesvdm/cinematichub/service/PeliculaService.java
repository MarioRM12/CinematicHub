package org.iesvdm.cinematichub.service;

import org.iesvdm.cinematichub.repository.PeliculaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PeliculaService {

    @Autowired
    private PeliculaRepository peliculaRepository;


}
