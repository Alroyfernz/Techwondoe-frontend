import IMovie from "./IMovie"
type inputField = "Title" | "StreamingApp" | "Rating" | "Review";

export default interface IModal {
isEdit:boolean;
movieData:IMovie;
isOpen:boolean;
onClose:()=>void;
changeHandler:(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, field: inputField) => void;
handleUpload:()=>void;
handleEdit:()=>void
}