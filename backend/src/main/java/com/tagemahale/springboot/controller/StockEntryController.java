package com.tagemahale.springboot.controller;

import com.tagemahale.springboot.model.Product;
import com.tagemahale.springboot.model.StockEntry;
import com.tagemahale.springboot.repository.ProductRepo;
import com.tagemahale.springboot.repository.StockEntryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stock-entries")
public class StockEntryController {

    @Autowired
    private StockEntryRepo stockEntryRepository;
@Autowired ProductRepo productRepo;
    // Create a new StockEntry
    @PostMapping
    public ResponseEntity<StockEntry> createStockEntry(@RequestParam MultiValueMap<String, String> formData) {
     System.out.println("deidine"+formData.getFirst("sellePrice"));
     try {
        String productIdStr = formData.getFirst("productId");
        String entrer = formData.getFirst("entrer");
         String sortie = formData.getFirst("sortie");
        String sellePriceStr = formData.getFirst("sellePrice");
        String purchasePriceUnitStr = formData.getFirst("purchasePriceUnit");
        String purchasePriceStr = formData.getFirst("purchasePrice");
    
        if (productIdStr == null || entrer==null || sortie == null || sellePriceStr == null || 
            purchasePriceUnitStr == null || purchasePriceStr == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        int productId = Integer.parseInt(productIdStr);
        float entrerInt = Float.parseFloat(entrer);
        float sortieInt = Float.parseFloat(sortie);

        // float quantite = Float.parseFloat(quantiteStr);
        float sellePrice = Float.parseFloat(sellePriceStr);
        float purchasePriceUnit = Float.parseFloat(purchasePriceUnitStr);
        float purchasePrice = Float.parseFloat(purchasePriceStr);

        // Retrieve the existing product
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product ID"));

        // Update the product's details
     float quantite=  product.getQuantite();
 
     

        // Create and save the new StockEntry
        StockEntry stockEntry = new StockEntry();
        stockEntry.setProduct(product);
        stockEntry.setDate(new Date()); // Or set another appropriate date
        stockEntry.setStockAvailable((int) quantite);
        stockEntry.setStockOut((int) sortieInt); // Assuming initial stock out is 0
        stockEntry.setStockIn((int) entrerInt); // Assuming initial stock out is 0
        stockEntry.setDescription("Stock entry for product update");
        stockEntry.setSalePrice(sellePrice);
        stockEntry.setValidate(false);
        stockEntry.setPurchasePrice(purchasePrice);

        StockEntry created = stockEntryRepository.save(stockEntry);

        return new ResponseEntity<>(created, HttpStatus.CREATED);
    } catch (NumberFormatException e) {
        // Handle parsing errors
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
        // Handle other errors
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }
 
 
//  validate chnges 
@PostMapping("/valid-stock-entries")
public ResponseEntity<String> validaeStockEntry(@RequestParam MultiValueMap<String, String> formData) {
 System.out.println("deidine"+formData.getFirst("sellePrice"));
 try {
    String productIdStr = formData.getFirst("productId");
    String entryIdStr = formData.getFirst("entryId");
    String entrer = formData.getFirst("stockIn");
     String sortie = formData.getFirst("stockOut"); 
    if (productIdStr == null || entrer==null || sortie == null ) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
     

    int productId = Integer.parseInt(productIdStr);
    int entryId = Integer.parseInt(entryIdStr);
    float entrerInt = Float.parseFloat(entrer);
    float sortieInt = Float.parseFloat(sortie);
 

    // Retrieve the existing product
    Product product = productRepo.findById(productId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid product ID"));

    // Update the product's details
 float quantite=  product.getQuantite();
quantite+=entrerInt;
quantite-=sortieInt; 
    product.setQuantite(quantite);
    // Save the updated product
    productRepo.save(product);
    Optional<StockEntry> stockEntry =  this.stockEntryRepository.findById(entryId);
    stockEntry.get().setValidate(true);
 this.stockEntryRepository.save(stockEntry.get());
 
    return new ResponseEntity<>("ok validate", HttpStatus.CREATED);
} catch (NumberFormatException e) {
    // Handle parsing errors
    return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
} catch (Exception e) {
    // Handle other errors
    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
}
}

 
 
 
 
 
 
 
 
 
    // Get all StockEntries
    @GetMapping
    public ResponseEntity<List<StockEntry>> getAllStockEntries() {
        List<StockEntry> stockEntries = stockEntryRepository.findAll();
        return new ResponseEntity<>(stockEntries, HttpStatus.OK);
    }
   // Get all StockEntries
   @GetMapping("/stockvalide")
   public ResponseEntity<List<StockEntry>> getAllValidatedStockEntries() {
       List<StockEntry> stockEntries = stockEntryRepository.findByValidate(true);
       return new ResponseEntity<>(stockEntries, HttpStatus.OK);
    }
    // Get all StockEntries
    @GetMapping("/stocknovalide")
    public ResponseEntity<List<StockEntry>> getAllNoValidatedStockEntries() {
        List<StockEntry> stockEntries = stockEntryRepository.findByValidate(false);
        System.out.println(stockEntries);
        System.out.println("stockEntries");
       return new ResponseEntity<>(stockEntries, HttpStatus.OK);
   }
    // Get a single StockEntry by ID
    @GetMapping("/{id}")
    public ResponseEntity<StockEntry> getStockEntryById(@PathVariable("id") int id) {
        Optional<StockEntry> stockEntryOptional = stockEntryRepository.findById(id);
        return stockEntryOptional.map(stockEntry -> new ResponseEntity<>(stockEntry, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a StockEntry
    @PutMapping("/{id}")
    public ResponseEntity<StockEntry> updateStockEntry(@PathVariable("id") int id, @Valid @RequestBody StockEntry stockEntryDetails) {
        Optional<StockEntry> stockEntryOptional = stockEntryRepository.findById(id);
        if (stockEntryOptional.isPresent()) {
            StockEntry stockEntry = stockEntryOptional.get();
            stockEntry.setDate(stockEntryDetails.getDate());
            stockEntry.setDescription(stockEntryDetails.getDescription());
            stockEntry.setPurchasePrice(stockEntryDetails.getPurchasePrice());
            stockEntry.setSalePrice(stockEntryDetails.getSalePrice());
            stockEntry.setProduct(stockEntryDetails.getProduct());
            stockEntry.setStockOut(stockEntryDetails.getStockOut());
            stockEntry.setStockAvailable(stockEntryDetails.getStockAvailable());
            StockEntry updatedStockEntry = stockEntryRepository.save(stockEntry);
            return new ResponseEntity<>(updatedStockEntry, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a StockEntry
    @DeleteMapping("/novalidet-stock-entries/{id}")
    public ResponseEntity<HttpStatus> deleteStockEntry(@PathVariable("id") int id) {
        try {
            stockEntryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
