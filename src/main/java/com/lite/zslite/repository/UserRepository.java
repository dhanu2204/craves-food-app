package com.lite.zslite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lite.zslite.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findById(int id);

    boolean existsByemail(String email);

    User findByEmail(String email);
}
