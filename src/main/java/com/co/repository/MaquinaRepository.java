package com.co.repository;

import com.co.domain.Maquina;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Maquina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaquinaRepository extends JpaRepository<Maquina, Long> {

}
