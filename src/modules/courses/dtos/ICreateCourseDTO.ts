interface ICreateCourseDTO {
  name: string;
  numberOfVideos:number;
  createdBy: string;
  price:number;
  description:string;
  rating:number;
  avatar:string;
  userId:string;
  introVideo:string,

}

export default ICreateCourseDTO;
