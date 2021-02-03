package com.co.web.rest;

import com.co.JmasterApp;

import com.co.domain.Casino;
import com.co.repository.CasinoRepository;
import com.co.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.co.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CasinoResource REST controller.
 *
 * @see CasinoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JmasterApp.class)
public class CasinoResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final Integer DEFAULT_CANTIDAD_MAQUINAS = 1;
    private static final Integer UPDATED_CANTIDAD_MAQUINAS = 2;

    @Autowired
    private CasinoRepository casinoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCasinoMockMvc;

    private Casino casino;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CasinoResource casinoResource = new CasinoResource(casinoRepository);
        this.restCasinoMockMvc = MockMvcBuilders.standaloneSetup(casinoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Casino createEntity(EntityManager em) {
        Casino casino = new Casino()
            .nombre(DEFAULT_NOMBRE)
            .direccion(DEFAULT_DIRECCION)
            .cantidadMaquinas(DEFAULT_CANTIDAD_MAQUINAS);
        return casino;
    }

    @Before
    public void initTest() {
        casino = createEntity(em);
    }

    @Test
    @Transactional
    public void createCasino() throws Exception {
        int databaseSizeBeforeCreate = casinoRepository.findAll().size();

        // Create the Casino
        restCasinoMockMvc.perform(post("/api/casinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(casino)))
            .andExpect(status().isCreated());

        // Validate the Casino in the database
        List<Casino> casinoList = casinoRepository.findAll();
        assertThat(casinoList).hasSize(databaseSizeBeforeCreate + 1);
        Casino testCasino = casinoList.get(casinoList.size() - 1);
        assertThat(testCasino.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCasino.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testCasino.getCantidadMaquinas()).isEqualTo(DEFAULT_CANTIDAD_MAQUINAS);
    }

    @Test
    @Transactional
    public void createCasinoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = casinoRepository.findAll().size();

        // Create the Casino with an existing ID
        casino.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCasinoMockMvc.perform(post("/api/casinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(casino)))
            .andExpect(status().isBadRequest());

        // Validate the Casino in the database
        List<Casino> casinoList = casinoRepository.findAll();
        assertThat(casinoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCasinos() throws Exception {
        // Initialize the database
        casinoRepository.saveAndFlush(casino);

        // Get all the casinoList
        restCasinoMockMvc.perform(get("/api/casinos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(casino.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].cantidadMaquinas").value(hasItem(DEFAULT_CANTIDAD_MAQUINAS)));
    }

    @Test
    @Transactional
    public void getCasino() throws Exception {
        // Initialize the database
        casinoRepository.saveAndFlush(casino);

        // Get the casino
        restCasinoMockMvc.perform(get("/api/casinos/{id}", casino.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(casino.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.cantidadMaquinas").value(DEFAULT_CANTIDAD_MAQUINAS));
    }

    @Test
    @Transactional
    public void getNonExistingCasino() throws Exception {
        // Get the casino
        restCasinoMockMvc.perform(get("/api/casinos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCasino() throws Exception {
        // Initialize the database
        casinoRepository.saveAndFlush(casino);
        int databaseSizeBeforeUpdate = casinoRepository.findAll().size();

        // Update the casino
        Casino updatedCasino = casinoRepository.findOne(casino.getId());
        // Disconnect from session so that the updates on updatedCasino are not directly saved in db
        em.detach(updatedCasino);
        updatedCasino
            .nombre(UPDATED_NOMBRE)
            .direccion(UPDATED_DIRECCION)
            .cantidadMaquinas(UPDATED_CANTIDAD_MAQUINAS);

        restCasinoMockMvc.perform(put("/api/casinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCasino)))
            .andExpect(status().isOk());

        // Validate the Casino in the database
        List<Casino> casinoList = casinoRepository.findAll();
        assertThat(casinoList).hasSize(databaseSizeBeforeUpdate);
        Casino testCasino = casinoList.get(casinoList.size() - 1);
        assertThat(testCasino.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCasino.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testCasino.getCantidadMaquinas()).isEqualTo(UPDATED_CANTIDAD_MAQUINAS);
    }

    @Test
    @Transactional
    public void updateNonExistingCasino() throws Exception {
        int databaseSizeBeforeUpdate = casinoRepository.findAll().size();

        // Create the Casino

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCasinoMockMvc.perform(put("/api/casinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(casino)))
            .andExpect(status().isCreated());

        // Validate the Casino in the database
        List<Casino> casinoList = casinoRepository.findAll();
        assertThat(casinoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCasino() throws Exception {
        // Initialize the database
        casinoRepository.saveAndFlush(casino);
        int databaseSizeBeforeDelete = casinoRepository.findAll().size();

        // Get the casino
        restCasinoMockMvc.perform(delete("/api/casinos/{id}", casino.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Casino> casinoList = casinoRepository.findAll();
        assertThat(casinoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Casino.class);
        Casino casino1 = new Casino();
        casino1.setId(1L);
        Casino casino2 = new Casino();
        casino2.setId(casino1.getId());
        assertThat(casino1).isEqualTo(casino2);
        casino2.setId(2L);
        assertThat(casino1).isNotEqualTo(casino2);
        casino1.setId(null);
        assertThat(casino1).isNotEqualTo(casino2);
    }
}
