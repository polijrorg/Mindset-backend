interface ICreateCourseDTO {
  name: string;
  numberOfVideos:number;
  createdBy: string;
  price:number;
  description:string;
  avatar:string;
  userId:string;
  introVideo:string;
  rating:number;

}

export default ICreateCourseDTO;
