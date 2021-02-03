package com.co.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.co.domain.Casino;

import com.co.repository.CasinoRepository;
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
 * REST controller for managing Casino.
 */
@RestController
@RequestMapping("/api")
public class CasinoResource {

    private final Logger log = LoggerFactory.getLogger(CasinoResource.class);

    private static final String ENTITY_NAME = "casino";

    private final CasinoRepository casinoRepository;

    public CasinoResource(CasinoRepository casinoRepository) {
        this.casinoRepository = casinoRepository;
    }

    /**
     * POST  /casinos : Create a new casino.
     *
     * @param casino the casino to create
     * @return the ResponseEntity with status 201 (Created) and with body the new casino, or with status 400 (Bad Request) if the casino has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/casinos")
    @Timed
    public ResponseEntity<Casino> createCasino(@RequestBody Casino casino) throws URISyntaxException {
        log.debug("REST request to save Casino : {}", casino);
        if (casino.getId() != null) {
            throw new BadRequestAlertException("A new casino cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Casino result = casinoRepository.save(casino);
        return ResponseEntity.created(new URI("/api/casinos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /casinos : Updates an existing casino.
     *
     * @param casino the casino to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated casino,
     * or with status 400 (Bad Request) if the casino is not valid,
     * or with status 500 (Internal Server Error) if the casino couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/casinos")
    @Timed
    public ResponseEntity<Casino> updateCasino(@RequestBody Casino casino) throws URISyntaxException {
        log.debug("REST request to update Casino : {}", casino);
        if (casino.getId() == null) {
            return createCasino(casino);
        }
        Casino result = casinoRepository.save(casino);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, casino.getId().toString()))
            .body(result);
    }

    /**
     * GET  /casinos : get all the casinos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of casinos in body
     */
    @GetMapping("/casinos")
    @Timed
    public List<Casino> getAllCasinos() {
        log.debug("REST request to get all Casinos");
        return casinoRepository.findAll();
        }

    /**
     * GET  /casinos/:id : get the "id" casino.
     *
     * @param id the id of the casino to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the casino, or with status 404 (Not Found)
     */
    @GetMapping("/casinos/{id}")
    @Timed
    public ResponseEntity<Casino> getCasino(@PathVariable Long id) {
        log.debug("REST request to get Casino : {}", id);
        Casino casino = casinoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(casino));
    }

    /**
     * DELETE  /casinos/:id : delete the "id" casino.
     *
     * @param id the id of the casino to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/casinos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCasino(@PathVariable Long id) {
        log.debug("REST request to delete Casino : {}", id);
        casinoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
