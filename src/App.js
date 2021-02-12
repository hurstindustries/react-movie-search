import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Movie from './components/Movie';
import Loading from './components/Loading';
import CheckoutButton from './components/CheckoutButton';
import ConfirmModal from './components/ConfirmModal';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [modalBody, setModalBody] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!keyword) {
        setMovies([]);
        return;
      }

      setLoading(true);

      try {
        const response = await axios(
          `https://www.omdbapi.com/?apikey=e5a913ef&type=movie&s=${encodeURIComponent(keyword)}`
        );
        setMovies(response.data.Search);
      } catch (error) {
        console.log(error);
      } finally {
        // slow down the ui, search is too fast and looks glitchy
        setTimeout(() => {
          setLoading(false);
        }, 250);
      }
    };

    fetchData();
  }, [keyword]);

  const handleMovieSelect = (movie) => {
    const isAlreadySelected = selectedMovies.some((m) => m.imdbID === movie.imdbID);

    if (isAlreadySelected) {
      setSelectedMovies(selectedMovies.filter((m) => m.imdbID !== movie.imdbID));
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const handleCheckout = () => {
    const productDescriptions = selectedMovies.map((movie) => <p>{movie.Title}</p>);

    setModalBody(productDescriptions);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedMovies([]);
  };

  const mappedMovies =
    !loading && movies
      ? movies.map((movie) => {
          const isSelected = selectedMovies.some((m) => m.imdbID === movie.imdbID);
          return (
            <Movie
              movie={movie}
              key={movie.imdbID}
              selected={isSelected}
              onSelect={handleMovieSelect}
            />
          );
        })
      : [];

  const noResults = !loading && (!movies || !movies.length) && keyword && (
    <div className="text-gray-500 p-2 text-center block">No results</div>
  );

  return (
    <div className="App relative flex items-start flex-col pb-24">
      {selectedMovies.length > 0 && (
        <CheckoutButton count={selectedMovies.length} onCheckout={handleCheckout} />
      )}

      <h1 className="text-xl bg-blue-500 text-white p-3 w-full text-left mb-2">Movie Search</h1>

      <Search onSearchChange={setKeyword} />

      {!!modalOpen && <ConfirmModal body={modalBody} onClose={handleModalClose} />}

      {loading && <Loading />}
      {noResults}

      <div className="grid md:grid-cols-3 md:gap-4">{mappedMovies}</div>
    </div>
  );
}
