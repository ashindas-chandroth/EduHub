export interface Course {
    id: number;
    title: string;
    url:string;
    is_paid: boolean;
    price: string;
    visible_instructors:[];
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