export default interface IMovie {
    __v?: number;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string|undefined;
    Title: string;
    StreamingApp: string;
    Rating: number;
    Review: string;
  }