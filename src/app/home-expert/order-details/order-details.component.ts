import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../core/service/http.service";
import { HttpParams } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { CURRENCYITEMS } from "../../common/currencyList";
import { MatDialog } from "@angular/material/dialog";
import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { AgGridAngular } from "ag-grid-angular";
import { MyDialogComponent } from "src/app/components/my-dialog/my-dialog.component";
import { forkJoin } from "rxjs";
import { Observable } from "rxjs";
import * as moment from "moment";
import { HttpHeaders } from "@angular/common/http";
import { OrderBidRejectedComponent } from 'src/app/components/order-bid-rejected/order-bid-rejected.component';

@Component({
  selector: "order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsComponent implements OnInit {
  progressOrders: any = [];
  progressform = new FormGroup({
    work_percent: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required]),
  });

  columnDefs = [];
  rowData = [];
  gridApi;
  color: ThemePalette = "primary";
  mode: ProgressSpinnerMode = "determinate";
  value = 10;
  gotochat() {
    this.r.navigateByUrl("chats");
  }

  order_id: any;
  currencyList = CURRENCYITEMS;
  form = new FormGroup({
    title: new FormControl("", [Validators.required]),
    work_percent: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
    attachments: new FormControl(""),
    skills_required: new FormControl(""),
    skills_add: new FormControl("", [Validators.required]),
    file: new FormControl("", [Validators.required]),
  });

  bidsform = new FormGroup({
    bid_note: new FormControl("", [Validators.required]),
    expected_price_currency: new FormControl("", [Validators.required]),
    expected_price: new FormControl("", [Validators.required]),
    agree_to_terms: new FormControl(false, [Validators.requiredTrue]),
  });

  fileForm = new FormGroup({
    file: new FormControl("", [Validators.required]),
  });
  filteredOptions: Observable<any[]>;
  skills: any = [];
  files: any = [];
  orderStatus: string;
  filePath: string;
  myFiles: string[] = [];
  agree_to_terms = false;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private r: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.order_id = params["orderid"];
    });

    const payload = new HttpParams().set("order_id", this.order_id);
    this.httpService
      .posts("/api/v1/get_progress_info/", payload, null)
      .subscribe((data) => {
        if (data && data.success) {
          let totalPercent = 0;
          data.progress.forEach((element) => {
            element.percent = totalPercent + element.progress;
            totalPercent = element.percent;
            this.progressOrders.push(element);
          });
          this.progressform = new FormGroup({
            work_percent: new FormControl(this.progressOrders[0].progress),
            content: new FormControl(this.progressOrders[0].info),
            user: new FormControl(this.progressOrders[0].updated_by_username),
          });
        }
      });

    this.httpService.posts("/api/v1/get_order_info/", payload, null).subscribe(
      (data) => {
        if (data && data.success) {
          this.orderStatus = data.accepted_by_self;
          this.skills = data.orders_info.skills_required.split(",");
          this.filePath = data.orders_info.attachments_path;
          this.form = new FormGroup({
            title: new FormControl(data.orders_info.title, [
              Validators.required,
            ]),
            content: new FormControl(data.orders_info.content, [
              Validators.required,
            ]),
            username: new FormControl(data.orders_info.username, [
              Validators.required,
            ]),
            status: new FormControl(data.orders_info.status, [
              Validators.required,
            ]),
            skills_add: new FormControl(this.skills, [Validators.required]),
          });
          data.orders_info.attachments.forEach((attachment) => {
            attachment.reference_file_name =
              data.orders_info.attachments_path +
              attachment.reference_file_name;
          });
          this.files = data.orders_info.attachments;
        }
      },
      (error) => {
        if (error) {
        }
      }
    );
  }
  acceptOrder() {
    const payload = new HttpParams()
      .set("order_id", this.order_id)
      .set("bid_note", this.bidsform.value.bid_note)
      .set("expected_price", this.bidsform.value.expected_price)
      .set(
        "expected_price_currency",
        this.bidsform.value.expected_price_currency
      );

    this.httpService.posts("/api/v1/accept_order/", payload, null).subscribe(
      (data) => {
        if (data && data.success) {
          this.dialog
            .open(MyDialogComponent, {})
            .afterClosed()
            .subscribe(() => {
              this.router.navigate(["/home-expert/orders"]);
            });
        } else if (data && data.error === 'ORDER_ALREADY_ACCEPTED') {
          this.dialog
            .open(OrderBidRejectedComponent, {})
            .afterClosed()
            .subscribe(() => {
              this.bidsform.reset();
            });
        }
      },
      (error) => {
        if (error) {
          this.bidsform.reset();
        }
      }
    );
  }

  removeFile(file) {
    this.myFiles.splice(this.myFiles.indexOf(file), 1);
  }
  onSelectionChange(e) {
    this.progressform = new FormGroup({
      work_percent: new FormControl(
        this.progressOrders[e.selectedIndex].progress
      ),
      content: new FormControl(this.progressOrders[e.selectedIndex].info),
      user: new FormControl(this.progressOrders[0].updated_by_username),
    });
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      if (this.myFiles.indexOf(event.target.files[i]) < 0)
        this.myFiles.push(event.target.files[i]);
    }
    console.log(this.myFiles);
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        file: file,
      });
    }
  }
  upload() {
    let attachmentId = [];
    this.form.patchValue({
      skills_required: this.form.value.skills_add.toString(),
    });
    this.form.removeControl("file");
    this.form.removeControl("skills_add");
    let headers = new HttpHeaders();
    let calls = [];
    for (var i = 0; i < this.myFiles.length; i++) {
      const formData = new FormData();
      formData.append("fileToUpload", this.myFiles[i]);
      calls.push(
        this.httpService.posts("/api/v1/add_attachment/", formData, headers)
      );
    }
    forkJoin(...calls).subscribe((data) => {
      data.forEach((element) => {
        attachmentId.push(element.attachment_id);
      });
      const payload = new HttpParams()
        .set("order_id", this.order_id)
        .set("updated_progress", this.form.value.work_percent)
        .set("info", this.form.value.content)
        .set("attachments", attachmentId.toString());
      this.httpService
        .posts("/api/v1/update_progress/", payload, null)
        .subscribe((data) => {
          if (data && data.success) {
            this.router.navigate(["/home-expert/order-detail"]);
          }
        });
    });
  }
}
