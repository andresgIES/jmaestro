package com.co.repository;

import com.co.domain.Casino;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Casino entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CasinoRepository extends JpaRepository<Casino, Long> {

}
