import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonList from "../components/pokedex/PokemonList";
import HeaderPokeball from "../components/layouts/HeaderPokeball";
import { paginateData } from "../utils/pagination";

const Pokedex = () => {
  //? Here are all our pokemons
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const trainerName = useSelector((store) => store.trainerName);

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const { itemsInCurrentPage, lastPage, pagesInCurrentBlock } = paginateData(
    pokemonsByName,
    currentPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase().trim());
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const handlePreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) setCurrentPage(newCurrentPage);
  };

  //? Trae todos los pokemons
  useEffect(() => {
    if (currentType === "") {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1292")
        .then(({ data }) => setPokemons(data.results))
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //? Trae todos los types disponibles para los pokemons
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));
  }, []);

  //?Trae todos los pokemons con base a un tipo
  useEffect(() => {
    if (currentType !== "") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${currentType}`)
        .then(({ data }) => {
          setPokemons(data.pokemon.map((pokemon) => pokemon.pokemon));
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  //? Reseteo de pagina actual al cambiar de tipo
  useEffect(() => {
    setCurrentPage(1);
  }, [currentType]);

  return (
    <main>
      <HeaderPokeball />
      <section className="max-w-[700px] py-10 px-2 mx-auto">
        <p className="text-xl text-slate-500  font-semibold">
          <span className="text-2xl text-red-500 font-bold">Welcome {trainerName}, </span>
          here you can find your favorite pokemon
        </p>
        <form className="flex place-content-between text-center gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-0">
            <input 
            className="shadow appearance-none w-80 py-2 px-3 text-gray-700 
            leading-tight focus:outline-none focus:shadow-outline"
            name="pokemonName" 
            type="text"
            placeholder="Search a Pokemon"
             />

            <button
            className="bg-red-500 hover:bg-red-700 text-white
            font-bold px-4 w-32  border-red-700"
            >Search</button>
          </div>

          <select          
          onChange={handleChangeType} className="capitalize w-96
          py-2 px-3 font-bold text-slate-600">
            <option value="">All pokemons</option>
            {types.map((type) => (
              <option value={type.name} key={type.url}>
                {type.name}
              </option>
            ))}
          </select>
        </form>
      </section>

      <ul className="flex justify-center gap-4 flex-wrap">
        {currentPage !== 1 && (
          <li>
            <button onClick={handlePreviusPage}>{"<"}</button>
          </li>
        )}
        {pagesInCurrentBlock.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`p-2 text-white font-bold rounded-md ${
                currentPage === page ? "bg-red-600" : "bg-red-400"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage !== lastPage && (
          <li>
            <button onClick={handleNextPage}>{">"}</button>
          </li>
        )}
      </ul>

      <PokemonList pokemons={itemsInCurrentPage} />
    </main>
  );
};
export default Pokedex;
