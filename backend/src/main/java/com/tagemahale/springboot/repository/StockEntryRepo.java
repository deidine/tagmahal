package com.tagemahale.springboot.repository;

 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tagemahale.springboot.model.StockEntry;

public interface StockEntryRepo extends JpaRepository<StockEntry,Integer> {
    List<StockEntry> findByValidate(boolean validate);

}
