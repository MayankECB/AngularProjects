import { Component, OnInit } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  constructor(private http: Http) {}

  productObj: object = {};
  confirmationString: string = "New PRoduct Added";
  isAdded: boolean = false;

  addNewProduct = function(product) {
    this.productObj = {
      name: product.name,
      color: product.color
    };
    this.http
      .post("http://localhost:5555/products/", this.productObj)
      .subscribe((res: Response) => {
        this.isAdded = true;
      });
  };

  ngOnInit() {}
}
