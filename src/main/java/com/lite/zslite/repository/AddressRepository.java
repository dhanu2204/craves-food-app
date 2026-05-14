package com.lite.zslite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lite.zslite.models.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    
    // Line 11: This method helps us find all addresses that belong to a specific user.
    // It uses the 'user' field in the Address model and looks for its 'id'.
    List<Address> findByUserId(int userId);
}
