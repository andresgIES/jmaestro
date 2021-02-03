package com.co.web.rest;

import com.co.JmasterApp;

import com.co.domain.Maquina;
import com.co.repository.MaquinaRepository;
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
 * Test class for the MaquinaResource REST controller.
 *
 * @see MaquinaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JmasterApp.class)
public class MaquinaResourceIntTest {

    private static final String DEFAULT_MODELO = "AAAAAAAAAA";
    private static final String UPDATED_MODELO = "BBBBBBBBBB";

    private static final Integer DEFAULT_CANTIDAD_JUEGOS = 1;
    private static final Integer UPDATED_CANTIDAD_JUEGOS = 2;

    @Autowired
    private MaquinaRepository maquinaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMaquinaMockMvc;

    private Maquina maquina;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaquinaResource maquinaResource = new MaquinaResource(maquinaRepository);
        this.restMaquinaMockMvc = MockMvcBuilders.standaloneSetup(maquinaResource)
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
    public static Maquina createEntity(EntityManager em) {
        Maquina maquina = new Maquina()
            .modelo(DEFAULT_MODELO)
            .cantidadJuegos(DEFAULT_CANTIDAD_JUEGOS);
        return maquina;
    }

    @Before
    public void initTest() {
        maquina = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaquina() throws Exception {
        int databaseSizeBeforeCreate = maquinaRepository.findAll().size();

        // Create the Maquina
        restMaquinaMockMvc.perform(post("/api/maquinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maquina)))
            .andExpect(status().isCreated());

        // Validate the Maquina in the database
        List<Maquina> maquinaList = maquinaRepository.findAll();
        assertThat(maquinaList).hasSize(databaseSizeBeforeCreate + 1);
        Maquina testMaquina = maquinaList.get(maquinaList.size() - 1);
        assertThat(testMaquina.getModelo()).isEqualTo(DEFAULT_MODELO);
        assertThat(testMaquina.getCantidadJuegos()).isEqualTo(DEFAULT_CANTIDAD_JUEGOS);
    }

    @Test
    @Transactional
    public void createMaquinaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = maquinaRepository.findAll().size();

        // Create the Maquina with an existing ID
        maquina.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaquinaMockMvc.perform(post("/api/maquinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maquina)))
            .andExpect(status().isBadRequest());

        // Validate the Maquina in the database
        List<Maquina> maquinaList = maquinaRepository.findAll();
        assertThat(maquinaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMaquinas() throws Exception {
        // Initialize the database
        maquinaRepository.saveAndFlush(maquina);

        // Get all the maquinaList
        restMaquinaMockMvc.perform(get("/api/maquinas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(maquina.getId().intValue())))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO.toString())))
            .andExpect(jsonPath("$.[*].cantidadJuegos").value(hasItem(DEFAULT_CANTIDAD_JUEGOS)));
    }

    @Test
    @Transactional
    public void getMaquina() throws Exception {
        // Initialize the database
        maquinaRepository.saveAndFlush(maquina);

        // Get the maquina
        restMaquinaMockMvc.perform(get("/api/maquinas/{id}", maquina.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(maquina.getId().intValue()))
            .andExpect(jsonPath("$.modelo").value(DEFAULT_MODELO.toString()))
            .andExpect(jsonPath("$.cantidadJuegos").value(DEFAULT_CANTIDAD_JUEGOS));
    }

    @Test
    @Transactional
    public void getNonExistingMaquina() throws Exception {
        // Get the maquina
        restMaquinaMockMvc.perform(get("/api/maquinas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaquina() throws Exception {
        // Initialize the database
        maquinaRepository.saveAndFlush(maquina);
        int databaseSizeBeforeUpdate = maquinaRepository.findAll().size();

        // Update the maquina
        Maquina updatedMaquina = maquinaRepository.findOne(maquina.getId());
        // Disconnect from session so that the updates on updatedMaquina are not directly saved in db
        em.detach(updatedMaquina);
        updatedMaquina
            .modelo(UPDATED_MODELO)
            .cantidadJuegos(UPDATED_CANTIDAD_JUEGOS);

        restMaquinaMockMvc.perform(put("/api/maquinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMaquina)))
            .andExpect(status().isOk());

        // Validate the Maquina in the database
        List<Maquina> maquinaList = maquinaRepository.findAll();
        assertThat(maquinaList).hasSize(databaseSizeBeforeUpdate);
        Maquina testMaquina = maquinaList.get(maquinaList.size() - 1);
        assertThat(testMaquina.getModelo()).isEqualTo(UPDATED_MODELO);
        assertThat(testMaquina.getCantidadJuegos()).isEqualTo(UPDATED_CANTIDAD_JUEGOS);
    }

    @Test
    @Transactional
    public void updateNonExistingMaquina() throws Exception {
        int databaseSizeBeforeUpdate = maquinaRepository.findAll().size();

        // Create the Maquina

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMaquinaMockMvc.perform(put("/api/maquinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(maquina)))
            .andExpect(status().isCreated());

        // Validate the Maquina in the database
        List<Maquina> maquinaList = maquinaRepository.findAll();
        assertThat(maquinaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMaquina() throws Exception {
        // Initialize the database
        maquinaRepository.saveAndFlush(maquina);
        int databaseSizeBeforeDelete = maquinaRepository.findAll().size();

        // Get the maquina
        restMaquinaMockMvc.perform(delete("/api/maquinas/{id}", maquina.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Maquina> maquinaList = maquinaRepository.findAll();
        assertThat(maquinaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Maquina.class);
        Maquina maquina1 = new Maquina();
        maquina1.setId(1L);
        Maquina maquina2 = new Maquina();
        maquina2.setId(maquina1.getId());
        assertThat(maquina1).isEqualTo(maquina2);
        maquina2.setId(2L);
        assertThat(maquina1).isNotEqualTo(maquina2);
        maquina1.setId(null);
        assertThat(maquina1).isNotEqualTo(maquina2);
    }
}
