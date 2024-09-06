import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { HtttpServiceService } from 'src/app/services/htttp-service.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  
  isFeedbackForm: boolean = true;
  selectedFeedbackType: string = 'APPLICATION';
  masterLocation: any [] = [];
  feedbackForm: FormGroup = this.fb.group({});

  // image1: string | null = '/assets/icons/crown-ella.svg';
  image1: string | null = null;
  image2: string | null = null;
  image3: string | null = null;



  constructor(private fb: FormBuilder, private location: Location, private ls: LoaderService,) { }


  ngOnInit() {
    this.isFeedbackForm = true;
    this.createForm();
    this.gettingLocations();
  }


  goBack() {
    this.location.back();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      feedback_info_related_to: ['APPLICATION', Validators.required],  // 'APPLICATION','ORDER'
      master_restaurant_uuid: ['', Validators.required],  // You will get from Location List API for selected location
      feedback_info_suggestion: ['', [Validators.required, Validators.maxLength(500)]],  // Here will be value of text area
      user_information_uuid: "3d2923529e9b649bc665c3022873f374",  // Don't change this value
      feedback_info_attachment_1: [''],  // Base64 for First Image
      feedback_info_attachment_2: [''],  // Base64 for Second Image
      // feedback_info_attachment_3: [''],  // Base64 for Third Image
    });
  }


  onFeedbackTypeChange(event: any) {
    this.selectedFeedbackType = event.detail.value;
    this.feedbackForm.patchValue({
      feedback_info_related_to: this.selectedFeedbackType
    });
  }


  gettingLocations(){
    this.ls.showLoader();
    HtttpServiceService.getLocations('d41d8cd98f00b204e9800998ecf8427e')
    .then( (data) => {
      this.ls.hideLoader();
      console.log('Locations:', data);
      if(data.statusCode === 200){
        this.masterLocation = data.aaData;
      }else{
      }
    })
    .catch( (error) => {
      this.ls.hideLoader();
      console.error('Error:', error)
    });
  }



  async captureImage(imageField: 'feedback_info_attachment_1' | 'feedback_info_attachment_2' | 'feedback_info_attachment_3') {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl
      });

      const base64Image = image.dataUrl;
      // console.log(base64Image);
      this.feedbackForm.get(imageField)?.setValue(base64Image);
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  }

  removeImage(imageField: 'feedback_info_attachment_1' | 'feedback_info_attachment_2' | 'feedback_info_attachment_3') {
    this.feedbackForm.get(imageField)?.setValue(null);
  }


  async onSubmit_FeedbackForm() {
    console.log(this.feedbackForm.valid);
    console.log(this.feedbackForm.value);

    if(this.feedbackForm.valid){
      this.ls.showLoader();
      HtttpServiceService.postFormData('/feedbackinfo/create', this.feedbackForm.value)
      .then( (data: any) => {
        this.ls.hideLoader();
        console.log(data);
        if(data.statusCode === 200){
          this.ls.presentToast(`Success: ${data.message}`);
          this.isFeedbackForm = false;
        }else{
          this.ls.presentToast(data.message);
        }
      })
      .catch((error :any) => {
        this.ls.hideLoader();
        console.error('Error:', error);
      });
    }else{
      this.ls.presentToast('Invalid: Please fill in all fields correctly!');
    }
  }


}
