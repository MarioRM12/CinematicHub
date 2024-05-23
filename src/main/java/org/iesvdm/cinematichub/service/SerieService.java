package org.iesvdm.cinematichub.service;

import org.iesvdm.cinematichub.repository.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SerieService {

    @Autowired
    private SerieRepository serieRepository;


}
