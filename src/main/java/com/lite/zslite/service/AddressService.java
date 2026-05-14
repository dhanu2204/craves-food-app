package com.lite.zslite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lite.zslite.models.Address;
import com.lite.zslite.repository.AddressRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    /**
     * Line 17: This method adds a new address to the database.
     * It takes an Address object and saves it using the repository.
     */
    public String addAddress(Address address) {
        addressRepository.save(address);
        return "Address added successfully";
    }

    /**
     * Line 26: This method updates an existing address.
     * It first checks if the address exists using its ID.
     */
    public String updateAddress(Address address, int id) {
        if (addressRepository.existsById(id)) {
            address.setId(id);
            addressRepository.save(address);
            return "Address updated successfully";
        }
        return "Address not found";
    }

    /**
     * Line 38: This method removes an address from the database.
     */
    public String deleteAddress(int id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return "Address deleted successfully";
        }
        return "Address not found";
    }

    /**
     * Line 48: This method fetches all addresses belonging to a specific user.
     */
    public List<Address> getAddressesByUser(int userId) {
        return addressRepository.findByUserId(userId);
    }
    
    /**
     * Line 55: This method fetches a single address by its ID.
     */
    public Address getAddress(int id) {
        return addressRepository.findById(id).orElse(null);
    }
}
