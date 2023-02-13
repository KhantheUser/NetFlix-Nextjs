import { useState, useEffect } from "react";
import { CloseOutlined, CaretRightOutlined } from "@ant-design/icons";
import ModalMui from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "atoms/modalAtom";
import { Element, Movie, Genre } from "@/model/movie";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReactPlayer from "react-player/lazy";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
export default function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState<boolean>(true);
  console.log(trailer);
  const handleClose = (): void => {
    setShowModal(false);
  };
  useEffect(() => {
    if (!movie) return;
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      console.log(data);
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }
    fetchMovie();
  }, [movie]);
  return (
    <ModalMui
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] "
          onClick={handleClose}
        >
          <CloseOutlined />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          />
          <div className="absolute flex bottom-10 w-full items-center justify-between px-10">
            <div className="flex -space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8  text-xl font-bold text-black transition hover:bg-[#e6e6e6">
                <PlayArrowIcon className=" text-black" fontSize="large" />
                Play
              </button>
              <button className="modalButton " style={{ marginLeft: "6px" }}>
                <ControlPointOutlinedIcon />
              </button>
              <button className="modalButton" style={{ marginLeft: "6px" }}>
                <ThumbUpAltOutlinedIcon />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffOutlinedIcon fontSize="large" />
              ) : (
                <VolumeUpOutlinedIcon fontSize="large" />
              )}
            </button>
          </div>
        </div>
        <div className="space-x-16 flex rounded-b-md px-10 py-8 bg-[#181818]">
          <div className="space-y-6 text-lg">
            <div className="flex  items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 md:flex-row font-light">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres : </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>
                <div>
                  <span className="text-[gray]">Original language : </span>
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes : </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </ModalMui>
  );
}
