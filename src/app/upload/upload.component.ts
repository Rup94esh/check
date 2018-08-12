import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  filename = 'choose file';

  public uploader: FileUploader = new FileUploader({});

  uploadForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit() {

    this.uploadForm = this.formBuilder.group({
      document : [null, Validators.required]
      //// some other fields
    });
  }


  //////////// File Converted into base64/////////////////

  onFileSelected(event: EventEmitter<File[]>) {
    const file: File = event[0];
    console.log(file);

    this.uploadForm.patchValue({
      document: file
    });

    const formData = new FormData();
    formData.append('file', file);
    const r = new XMLHttpRequest();
    r.open('POST', '/user/upload');
    r.send(formData);

  }

//////// Submit Form/////////////

  OnUpload (submitForm: any ) {
    console.log(submitForm);
    const obs$ = this.userService.uploadData(submitForm);
    obs$.subscribe(data => {
      console.log(data);
    });
  }

}
