package com.lite.zslite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lite.zslite.models.Address;
import com.lite.zslite.service.AddressService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    /**
     * Line 30: Endpoint to add a new address.
     * Accessible via POST /api/addresses
     */
    @PostMapping
    public String addAddress(@RequestBody Address address) {
        return addressService.addAddress(address);
    }

    /**
     * Line 39: Endpoint to update an address by its ID.
     * Accessible via PUT /api/addresses/{id}
     */
    @PutMapping("/{id}")
    public String updateAddress(@RequestBody Address address, @PathVariable int id) {
        return addressService.updateAddress(address, id);
    }

    /**
     * Line 48: Endpoint to delete an address.
     * Accessible via DELETE /api/addresses/{id}
     */
    @DeleteMapping("/{id}")
    public String deleteAddress(@PathVariable int id) {
        return addressService.deleteAddress(id);
    }

    /**
     * Line 57: Endpoint to get all addresses for a specific user.
     * Accessible via GET /api/addresses/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public List<Address> getAddressesByUser(@PathVariable int userId) {
        return addressService.getAddressesByUser(userId);
    }

    /**
     * Line 66: Endpoint to get a single address by ID.
     * Accessible via GET /api/addresses/{id}
     */
    @GetMapping("/{id}")
    public Address getAddress(@PathVariable int id) {
        return addressService.getAddress(id);
    }
}
