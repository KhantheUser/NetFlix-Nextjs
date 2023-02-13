import { modalState, movieState } from "@/atoms/modalAtom";
import { URL_MOIVE } from "@/constants";
import { Movie } from "@/model/movie";
import { PlayCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
interface Props {
  netflixOriginals: Movie[];
}

export default function Banner({ netflixOriginals }: Props) {
  const baseUrl = URL_MOIVE;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2  py-16 md:space-y-4 lg:h-[100vh] justify-center  lg:pb-12">
      <div className="absolute top-0 -z-10 left-0 w-full h-[95vh]">
        <Image
          alt="image"
          layout="fill"
          objectFit="cover"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl ">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <PlayCircleOutlined size={25} className=" text-black " />
          Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <InfoCircleOutlined /> More Info
        </button>
      </div>
    </div>
  );
}
