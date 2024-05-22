package com.tagemahale.springboot.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ProductDto {
    private int Productid;
    private String ProductName;
    private String Description;
    private Float Price;
    private Float Weight;
    private byte[] Img;
}

// ID	DATE	TITRE	P.UNIT	QTY	PAYEMENT	POIDS	TOTAL	CATEGORY	
// ID	TITLE	QUANTITE	QTY	P.TOTAL	POID	TOTAL	CATEGORY	
// ID	TITRE	DATE	P.UNIT	QTY	PAYEMENT	POIDS	TOTAL	CATEGORY	VALIDE
