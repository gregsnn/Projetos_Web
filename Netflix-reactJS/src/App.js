import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/Featured"
import Header from "./components/Header";


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      // pegando o FEATURED
      let originals = list.filter(i=>i.slug === "originals")
      let randomChoice = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChoice]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv")
      
      setFeaturedData(chosenInfo)

    }

    loadAll()
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 500) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener("scroll", scrollListener)

    return () => {
      window.removeEventListener("scroll", scrollListener)
    }
  },[])

  return (
    <div className="home-page">

      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData}/>}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <p className="netflix">All Rights Reserved for <a href="https://www.netflix.com/br-en/">Netflix</a></p>
        <p className="tmdb">Data acquired by <a href="https://www.themoviedb.org/">The Movie Database</a> <sup>(TMDB)</sup></p>
      </footer>
    </div>
  )
}