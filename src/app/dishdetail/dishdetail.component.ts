import { Component, OnInit, ViewChild,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Feedback, ContactType } from '../shared/feedback';
import {Comment} from '../shared/comment';
//import {DISHES} from '../shared/dishes';
import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
  
})
export class DishdetailComponent implements OnInit {
  
  @ViewChild('fform') CommentFormDirective;
  commentForm: FormGroup;
  comment: Comment;
  //contactType = ContactType;

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  dishErrMess:string;
  dishcopy: Dish;
  visibility = 'shown';
  
  constructor(private dishservice: DishService,
  private route: ActivatedRoute,
  private location: Location,
  private fb: FormBuilder,
  @Inject('BaseURL') private baseURL) { 
  this.createForm();
  }

 

  ngOnInit() {
     // this.id1 =  this.route.snapshot.params['id'];
    // // this.dish = this.dishservice.getDish(id);
    // //this.dishservice.getDish(id).then(dish => this.dish=dish);
    // this.dishservice.getDish(id).subscribe(dish => this.dish=dish);
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.dishErrMess = <any>errmess);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden';return this.dishservice.getDish(params['id']);}))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id);this.visibility = 'shown'; },errmess => this.dishErrMess = <any>errmess);
    
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }
  
  // <Form Logic>
  
  createForm() :void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      comment: ['', [Validators.required]],
      rating: ['']
    });

  this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
  this.onValueChanged(); 
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  
  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      
    },
    'comment': {
    'required':      'comment is required.'
      
    }
  };


  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
            .subscribe(dish => {
              this.dish = dish; this.dishcopy = dish;
            },
            errmess => { this.dish = null; this.dishcopy = null; this.dishErrMess = <any>errmess; });
    
    //this.pushToArray([this.commentForm.value.author,this.commentForm.value.rating,this.commentForm.value.comment], DISHES)
    console.log(this.comment);
    //this.dish.comments[this.id1].push
   // DISHES[this.id1].comments.push[this.commentForm.value.author,this.commentForm.value.rating,this.commentForm.value.comment]
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
      
    });
    this.CommentFormDirective.resetForm();
  
  }

 
}
