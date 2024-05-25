package com.tagemahale.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tagemahale.springboot.payload.ProductDto;
import com.tagemahale.springboot.payload.ApiResponse;
import com.tagemahale.springboot.service.ProductService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductControllers {

    @Autowired
    private ProductService productService;
    
    @Value("${file.upload-dir}")
    String UPLOAD_DIRECTORY;
    // public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";

    //Create Product
    @PostMapping(value = "/add" )
    public ResponseEntity<ProductDto> CreateProduct(@RequestParam MultiValueMap<String, String> formData, @RequestParam("img") MultipartFile file) throws IOException {
        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("productname"));
        productDto.setDescription(formData.getFirst("description"));
        productDto.setQuantite(Float.valueOf(formData.getFirst("quantite")));
        productDto.setSellePrice(Float.valueOf(formData.getFirst("sellePrice")));
        String purchasePriceUnit = formData.getFirst("purchasePriceUnit");
        String purchasePrice = formData.getFirst("purchasePrice");
        productDto.setPurchasePrice( Float.valueOf(purchasePrice.trim()));
        productDto.setPurchasePriceUnit( Float.valueOf(purchasePriceUnit.trim()));

        StringBuilder fileNames = new StringBuilder();
        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, file.getOriginalFilename());
        fileNames.append(file.getOriginalFilename());
        Files.write(fileNameAndPath, file.getBytes());
        productDto.setImg(fileNames.toString());
        ProductDto save = this.productService.CreateProduct(productDto);

        return new ResponseEntity<ProductDto>(save,HttpStatus.valueOf(200));
    }

    //Get by Id
    @GetMapping("/{productid}")
    public ResponseEntity<ProductDto> GetById(@PathVariable Integer productid){
        ProductDto product = this.productService.ReadProduct(productid);

        return new ResponseEntity<>(product,HttpStatus.valueOf(200));
    }


    //Get All Product
    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getAll(){
        List<ProductDto> products = this.productService.ReadAllProduct();

        return new ResponseEntity<>(products,HttpStatus.valueOf(200));
    }

// Delete Product
    @DeleteMapping(value = "/delete/{ProductId}", produces = "application/json")
    public ResponseEntity<ApiResponse> delete(@PathVariable Integer ProductId) {
        ProductDto product = this.productService.ReadProduct(ProductId);
        if (product.getImg() != null) {
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, product.getImg());
            try {
                Files.deleteIfExists(fileNameAndPath);
            } catch (IOException e) {
                return new ResponseEntity<>(new ApiResponse(false, "Failed to delete image"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        this.productService.DeleteProduct(ProductId);
        return new ResponseEntity<>(new ApiResponse(true, "Product deleted"), HttpStatus.OK);
    }


    @PutMapping("update/{ProductId}")
    public ResponseEntity<ProductDto> updateProduct(
        @RequestParam MultiValueMap<String, String> formData,
        @RequestParam(value = "img", required = false) MultipartFile file,
        @PathVariable Integer ProductId) throws IOException {
    
        ProductDto existingProduct = this.productService.ReadProduct(ProductId);
    
        if (existingProduct == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    
        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("productname"));
        productDto.setDescription(formData.getFirst("description"));
    
        String quantiteStr = formData.getFirst("quantite");
        String priceStr = formData.getFirst("sellePrice");
        String purchasePriceUnit = formData.getFirst("purchasePriceUnit");
        String purchasePrice = formData.getFirst("purchasePrice");
        if ( 
        purchasePriceUnit  == null || purchasePrice  == null) {
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }else{
        
        productDto.setPurchasePrice( existingProduct.getPurchasePrice());
        productDto.setPurchasePriceUnit( existingProduct.getPurchasePriceUnit());
    }

    float purchasePriceUnitFlot = Float.parseFloat(purchasePriceUnit);
    float purchasePriceFlot = Float.parseFloat(purchasePrice);


        if (quantiteStr != null && !quantiteStr.trim().isEmpty()) {
            try {
                productDto.setQuantite(Float.valueOf(quantiteStr.trim()));
            } catch (NumberFormatException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else { 
            productDto.setQuantite(existingProduct.getQuantite());
        }
    
        if (priceStr != null && !priceStr.trim().isEmpty()) {
            try {
                productDto.setSellePrice(Float.valueOf(priceStr.trim()));
                
            System.out.println("deidine2");

            } catch (NumberFormatException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

        } else {
            productDto.setSellePrice(existingProduct.getSellePrice());
               System.out.println("deidine");
        }
    
            
        productDto.setPurchasePrice( purchasePriceUnitFlot);
        productDto.setPurchasePriceUnit( purchasePriceFlot);
        productDto.setImg(existingProduct.getImg());
    
        if (file != null && !file.isEmpty()) {
            // Delete old image
            if (existingProduct.getImg() != null) {
                Path oldFilePath = Paths.get(UPLOAD_DIRECTORY, existingProduct.getImg());
                Files.deleteIfExists(oldFilePath);
            }
    
            // Save new image
            String fileName = file.getOriginalFilename();
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, fileName);
            Files.write(fileNameAndPath, file.getBytes());
            productDto.setImg(fileName);
        }
    
        ProductDto updatedProduct = this.productService.UpdateProduct(productDto, ProductId);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
    
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Resource resource = this.loadImage(filename);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
 public Resource loadImage(String filename) throws MalformedURLException {
        Path path = Paths.get(UPLOAD_DIRECTORY, filename);
        Resource resource = new UrlResource(path.toUri());
        if (resource.exists() || resource.isReadable()) {
            return resource;
        } else {
            throw new RuntimeException("Could not read the file!");
        }
    }

}
