import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import {AbstractField} from '../../abstract-field.component';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from "rxjs";
import { DataProvider, EntityTitle } from "@solenopsys/uimatrix-utils";
import { ProviderService } from "../../provider.service";

@Component({
  selector: 'ui-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.css'],
})
export class FileFieldComponent
  extends AbstractField<EntityTitle>
  implements OnInit, OnDestroy {
  @Input()
  override value!: any;

  selectShow = false;

  @Output()
  override valueChange = new EventEmitter<EntityTitle>();

  dp: DataProvider;

  fileToUpload: any;

  constructor(private httpClient: HttpClient,
              @Inject("ps")
              private ps: ProviderService) {
    super();
    this.dp = ps.getProvider( 'file', 'file.name');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  uploadFileToActivity() {
    const endpoint = '/files';
    const formData: FormData = new FormData();
    const fileName = btoa(encodeURIComponent(this.fileToUpload.name));
    formData.append('fileKey', this.fileToUpload, fileName);
    firstValueFrom(this.httpClient
      .post(endpoint, formData))
      .then((resp: any) => {
        this.value = {uid: resp.uid, title: resp.name};
        this.valueChange.emit(this.value);
        this.fileToUpload = undefined;
      });
  }

  handleFileInput(event: any) {
    const files: FileList = event.files;
    this.fileToUpload = files.item(0);
  }
}
