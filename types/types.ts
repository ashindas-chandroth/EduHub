export interface Course {
    id: number;
    title: string;
    url:string;
    is_paid: boolean;
    price: string;
    visible_instructors:[Instructor];
    image_125_H:string;
    is_practice_test_course:boolean;
    published_title:string;
    tracking_id:string;
    locale:{
        title:string;
        english_title:string;
        simple_english_title:string;
    }
    result:any;
    subtitle: string;
    image_480x270: string;
    num_reviews: number;
    image_240x135:string;
  
  }
  interface Instructor{
    display_name:string
  }
  export interface CurriculumItem{
    _class:string;
    id:number;
    title:string;
    description?:string;
    content_summary?:string;
    is_free:boolean;
    sort_order:number;

  }
  export interface User{
    _class:string;
    title:string;
    name:string;
    display_name:string;

  }
  export interface ReviewItem{
    _class:string;
    id:number;
    content:string;
    rating:number;
    created:string;
    modified?:string;
    user_modified:string;
    user?:User;
  }