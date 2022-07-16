import React, { useEffect, useState } from "react";
import { useDisclosure, Spinner } from "@chakra-ui/react";
import "./Home.css";
import { cred } from "../../Cred";
import ModalComp from "../../components/Modal/ModalComp";
import IMovie from "../../Interfaces/IMovie";
import { getHeader } from "../../Util/header";
import MovieComp from "../../components/Movie/MovieComp";

const initMovie = {
  Title: "",
  StreamingApp: "",
  Rating: 0,
  Review: "",
};
type inputField = "Title" | "StreamingApp" | "Rating" | "Review";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  var userId: string | null = localStorage.getItem("UserData");
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [movieData, setMovieData] = useState<IMovie>(initMovie);

  const headers = getHeader();
  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    field: inputField
  ) => {
    const state: any = { ...movieData };
    state[field] = e.target.value;
    setMovieData(state);
  };
  const handleEdit = async () => {
    const { _id, __v, createdAt, updatedAt, ...MovieInfo } = movieData;
    console.log(_id, MovieInfo);

    try {
      await fetch(`${cred.apiUrl}/movie/update/${_id}`, {
        method: "POST",
        body: JSON.stringify({ update: MovieInfo }),
        headers,
      });
      fetchUser();
      onClose();
      setMovieData(initMovie);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = async (): Promise<void> => {
    console.log(movieData);

    try {
      await fetch(`${cred.apiUrl}/movie/add/${userId}`, {
        method: "POST",
        body: JSON.stringify(movieData),
        headers,
      });
      fetchUser();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (movieId: string|undefined): Promise<void> => {
    try {
      await fetch(`${cred.apiUrl}/movie/remove/${movieId}/${userId}`, {
        method: "DELETE",
        headers,
      });
    } catch (error) {
      console.log(error);
    }
    fetchUser();
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await (
        await fetch(`${cred.apiUrl}/user/details/${userId}`, {
          headers,
        })
      ).json();
      console.log(res);
      setUserData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="HomeContainer">
      <ModalComp
        changeHandler={changeHandler}
        handleEdit={handleEdit}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setMovieData(initMovie);
        }}
        handleUpload={handleUpload}
        isEdit={isEdit}
        movieData={movieData}
      />
      <h1 className="HomeTitle"> Welcome User</h1>
      <div className="TopSection">
        <div className="SearchBox">
          <input
            type="text"
            className="SearchInput"
            placeholder="Search For Your Shows"
          />
        </div>
        <button className="AddShow" onClick={onOpen}>
          New +
        </button>
      </div>
      <div className="movieWrapper">
        {!isLoading ? (
        userData?.MovieList.length !== 0 ? (
            userData?.MovieList?.map((movie:IMovie, idx: number) => {
              return (
               <MovieComp movie={movie} onOpen={onOpen} setIsEdit={setIsEdit} setMovieData={setMovieData} handleDelete={handleDelete}/>
              );
            })
          ) : (
            <div>
              <h2 className="NullMovie">You dont have any movies...</h2>
            </div>
          )
        ) : (
          <Spinner size="xl" color="red.500" thickness="3px" />
        )}
      </div>
    </div>
  );
};

export default Home;
