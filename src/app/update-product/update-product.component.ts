import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/toPromise";

interface Product {
  id: string;
  color: string;
  name: string;
}

@Component({
  selector: "app-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.css"]
})
export class UpdateProductComponent implements OnInit {
  id: number;
  data: Product;
  products: Array<Product>;
  productObj: object = {};
  exist: boolean = false;

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  updateProduct(product) {
    this.productObj = {
      name: product.name,
      color: product.color
    };
    const url = `${"http://localhost:5555/products"}/${this.id}`;
    console.log(url);
    this.http
      .put(url, JSON.stringify(this.productObj), {
        headers: this.headers
      })
      .toPromise()
      .then(() => {
        console.log(this.router.url);
        this.router.navigate(["/"]);
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params["id"];
    });
    this.http
      .get("http://localhost:5555/products")
      .subscribe((res: Response) => {
        this.products = JSON.parse(JSON.stringify(res));
        console.log(this.products);
        for (var i = 0; i < this.products.length; i++) {
          if (parseInt(this.products[i].id) === this.id) {
            this.exist = true;
            this.data = this.products[i];
            break;
          } else {
            this.exist = false;
          }
        }
      });
  }
}
