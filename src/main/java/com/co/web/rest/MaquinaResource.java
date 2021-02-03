package com.co.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.co.domain.Maquina;

import com.co.repository.MaquinaRepository;
import com.co.web.rest.errors.BadRequestAlertException;
import com.co.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Maquina.
 */
@RestController
@RequestMapping("/api")
public class MaquinaResource {

    private final Logger log = LoggerFactory.getLogger(MaquinaResource.class);

    private static final String ENTITY_NAME = "maquina";

    private final MaquinaRepository maquinaRepository;

    public MaquinaResource(MaquinaRepository maquinaRepository) {
        this.maquinaRepository = maquinaRepository;
    }

    /**
     * POST  /maquinas : Create a new maquina.
     *
     * @param maquina the maquina to create
     * @return the ResponseEntity with status 201 (Created) and with body the new maquina, or with status 400 (Bad Request) if the maquina has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/maquinas")
    @Timed
    public ResponseEntity<Maquina> createMaquina(@RequestBody Maquina maquina) throws URISyntaxException {
        log.debug("REST request to save Maquina : {}", maquina);
        if (maquina.getId() != null) {
            throw new BadRequestAlertException("A new maquina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Maquina result = maquinaRepository.save(maquina);
        return ResponseEntity.created(new URI("/api/maquinas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /maquinas : Updates an existing maquina.
     *
     * @param maquina the maquina to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated maquina,
     * or with status 400 (Bad Request) if the maquina is not valid,
     * or with status 500 (Internal Server Error) if the maquina couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/maquinas")
    @Timed
    public ResponseEntity<Maquina> updateMaquina(@RequestBody Maquina maquina) throws URISyntaxException {
        log.debug("REST request to update Maquina : {}", maquina);
        if (maquina.getId() == null) {
            return createMaquina(maquina);
        }
        Maquina result = maquinaRepository.save(maquina);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, maquina.getId().toString()))
            .body(result);
    }

    /**
     * GET  /maquinas : get all the maquinas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of maquinas in body
     */
    @GetMapping("/maquinas")
    @Timed
    public List<Maquina> getAllMaquinas() {
        log.debug("REST request to get all Maquinas");
        return maquinaRepository.findAll();
        }

    /**
     * GET  /maquinas/:id : get the "id" maquina.
     *
     * @param id the id of the maquina to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the maquina, or with status 404 (Not Found)
     */
    @GetMapping("/maquinas/{id}")
    @Timed
    public ResponseEntity<Maquina> getMaquina(@PathVariable Long id) {
        log.debug("REST request to get Maquina : {}", id);
        Maquina maquina = maquinaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(maquina));
    }

    /**
     * DELETE  /maquinas/:id : delete the "id" maquina.
     *
     * @param id the id of the maquina to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/maquinas/{id}")
    @Timed
    public ResponseEntity<Void> deleteMaquina(@PathVariable Long id) {
        log.debug("REST request to delete Maquina : {}", id);
        maquinaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
